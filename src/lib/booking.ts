import { restaurant, type ServiceWindow } from '../data/restaurant.ts'

const WEEKDAY: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export const BOOKING_HORIZON_DAYS = 90
export const LEAD_MINUTES = 60

export function astanaNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Almaty',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
  }).formatToParts(now)

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  const hour = get('hour') === '24' ? '00' : get('hour')

  return {
    iso: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: Number(hour) * 60 + Number(get('minute')),
    weekday: WEEKDAY[get('weekday')] ?? 0,
  }
}

export function weekdayOf(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function serviceFor(weekday: number): ServiceWindow | undefined {
  return restaurant.services.find((service) => service.days.includes(weekday))
}

function toMinutes(time: string) {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function fromMinutes(total: number) {
  const hour = Math.floor(total / 60)
  const minute = total % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

export function seatingsFor(iso: string, now = new Date()) {
  if (!isIsoDate(iso)) return []

  const clock = astanaNow(now)
  if (iso < clock.iso || iso > addDays(clock.iso, BOOKING_HORIZON_DAYS)) return []

  const service = serviceFor(weekdayOf(iso))
  if (!service || service.closed || !service.open || !service.close) return []

  let end = toMinutes(service.close)
  if (end === 0) end = 24 * 60
  const last = end - 30
  const start = toMinutes(service.open)
  const slots: string[] = []

  for (let minute = start; minute <= last; minute += 30) {
    if (iso === clock.iso && minute < clock.minutes + LEAD_MINUTES) continue
    slots.push(fromMinutes(minute))
  }

  return slots
}

export function explainDate(iso: string, now = new Date()) {
  if (!isIsoDate(iso)) return 'Choose a valid date.'

  const today = astanaNow(now).iso
  if (iso < today) return 'Choose a date from today onward.'
  if (iso > addDays(today, BOOKING_HORIZON_DAYS)) {
    return 'We take reservations up to 90 days ahead.'
  }

  const service = serviceFor(weekdayOf(iso))
  if (!service || service.closed) return 'The dining room is closed on Mondays.'
  if (seatingsFor(iso, now).length === 0) {
    return 'No seatings remain today. Choose another evening.'
  }

  return null
}
