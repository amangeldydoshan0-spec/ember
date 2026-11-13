import type { ReservationPayload } from './validation.ts'

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

const looksPlaceholder =
  url.includes('YOUR_PROJECT') || key.includes('your_anon') || key.length < 20

export const supabaseConfigured = Boolean(url && key && !looksPlaceholder)

export async function saveReservation(payload: ReservationPayload) {
  if (!supabaseConfigured) {
    return {
      ok: false as const,
      message:
        'Online reservations are not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then submit again — or call the dining room.',
    }
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, key)
  const { error } = await supabase.from('reservations').insert(payload)

  if (!error) return { ok: true as const }

  const code = error.code ?? ''
  const text = `${error.message} ${error.details ?? ''}`.toLowerCase()

  if (code === '42P01' || text.includes('relation') || text.includes('schema cache')) {
    return {
      ok: false as const,
      message:
        'The reservations table is missing. Run supabase/schema.sql in the Supabase SQL editor, then try again.',
    }
  }

  if (code === '42501' || text.includes('row-level security') || text.includes('permission')) {
    return {
      ok: false as const,
      message:
        'Supabase refused the booking. Confirm the insert policy from supabase/schema.sql is applied.',
    }
  }

  if (text.includes('failed to fetch') || text.includes('network')) {
    return {
      ok: false as const,
      message: 'We could not reach Supabase. Check the connection and try again.',
    }
  }

  return {
    ok: false as const,
    message: 'We could not save this reservation. Please call the dining room and we will take it by phone.',
  }
}
