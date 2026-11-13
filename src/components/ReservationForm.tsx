import { useMemo, useState, type FormEvent } from 'react'
import { restaurant } from '../data/restaurant.ts'
import { addDays, astanaNow, explainDate, seatingsFor } from '../lib/booking.ts'
import { formatLongDate, formatPhone } from '../lib/format.ts'
import { saveReservation } from '../lib/supabase.ts'
import { validateReservation, type ReservationInput, type ReservationPayload } from '../lib/validation.ts'
import { Button } from './Button.tsx'

const empty: ReservationInput = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
}

const inputClass =
  'mt-2 w-full border border-beige/15 bg-ink px-4 py-3 text-beige outline-none transition [color-scheme:dark] placeholder:text-mist/70 focus:border-copper'

export function ReservationForm() {
  const [values, setValues] = useState<ReservationInput>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationInput, string>>>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<ReservationPayload | null>(null)

  const today = astanaNow().iso
  const slots = useMemo(() => (values.date ? seatingsFor(values.date) : []), [values.date])
  const dateHint = values.date ? explainDate(values.date) : null

  function update(field: keyof ReservationInput, value: string) {
    setValues((current) => {
      const next = { ...current, [field]: value }
      if (field === 'date') {
        const nextSlots = seatingsFor(value)
        if (!nextSlots.includes(next.time)) next.time = ''
      }
      return next
    })
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError('')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = validateReservation(values)
    setErrors(result.errors)
    setFormError('')
    if (!result.value) return

    setSubmitting(true)
    const saved = await saveReservation(result.value)
    setSubmitting(false)

    if (!saved.ok) {
      setFormError(saved.message)
      return
    }

    setConfirmed(result.value)
  }

  if (confirmed) {
    return (
      <div role="status" className="border border-copper/40 bg-charcoal px-6 py-10 md:px-10">
        <p className="eyebrow">Confirmed</p>
        <h2 className="mt-3 font-serif text-4xl text-beige md:text-5xl">The table is yours.</h2>
        <p className="mt-4 max-w-lg text-sand">
          Your reservation is saved. Please arrive within fifteen minutes of your seating. To change it, call the
          dining room.
        </p>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="eyebrow">Name</dt>
            <dd className="mt-2 text-beige">{confirmed.name}</dd>
          </div>
          <div>
            <dt className="eyebrow">Phone</dt>
            <dd className="mt-2 text-beige">{formatPhone(confirmed.phone)}</dd>
          </div>
          <div>
            <dt className="eyebrow">Date</dt>
            <dd className="mt-2 text-beige">{formatLongDate(confirmed.reservation_date)}</dd>
          </div>
          <div>
            <dt className="eyebrow">Time</dt>
            <dd className="mt-2 text-beige">{confirmed.reservation_time}</dd>
          </div>
          <div>
            <dt className="eyebrow">Guests</dt>
            <dd className="mt-2 text-beige">{confirmed.guests}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              setConfirmed(null)
              setValues(empty)
            }}
          >
            Make another reservation
          </Button>
          <Button to="/" variant="ghost">
            Back home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-beige/10 bg-charcoal px-6 py-8 md:px-10">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="eyebrow">Name</span>
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name"
          />
          {errors.name ? <span className="mt-2 block text-sm text-ember">{errors.name}</span> : null}
        </label>

        <label className="block">
          <span className="eyebrow">Phone</span>
          <input
            className={inputClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+7 701 000 00 00"
          />
          {errors.phone ? <span className="mt-2 block text-sm text-ember">{errors.phone}</span> : null}
        </label>

        <label className="block">
          <span className="eyebrow">Guests</span>
          <select
            className={inputClass}
            name="guests"
            value={values.guests}
            onChange={(event) => update('guests', event.target.value)}
            aria-invalid={Boolean(errors.guests)}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
          {errors.guests ? <span className="mt-2 block text-sm text-ember">{errors.guests}</span> : null}
        </label>

        <label className="block">
          <span className="eyebrow">Date</span>
          <input
            className={inputClass}
            name="date"
            type="date"
            min={today}
            max={addDays(today, 90)}
            value={values.date}
            onChange={(event) => update('date', event.target.value)}
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date || dateHint ? (
            <span className="mt-2 block text-sm text-ember">{errors.date ?? dateHint}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="eyebrow">Time</span>
          <select
            className={inputClass}
            name="time"
            value={values.time}
            onChange={(event) => update('time', event.target.value)}
            aria-invalid={Boolean(errors.time)}
            disabled={!values.date || slots.length === 0}
          >
            <option value="">{values.date && slots.length === 0 ? 'No seatings' : 'Select a time'}</option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time ? <span className="mt-2 block text-sm text-ember">{errors.time}</span> : null}
        </label>
      </div>

      {formError ? (
        <p role="alert" className="mt-6 border border-ember/40 bg-ink px-4 py-3 text-sm text-sand">
          {formError}{' '}
          <a href={restaurant.phoneHref} className="text-ember underline">
            {restaurant.phone}
          </a>
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Reserving…' : 'Confirm reservation'}
        </Button>
        <p className="text-sm text-mist">Dinner only. Closed Mondays. Times follow Astana.</p>
      </div>
    </form>
  )
}
