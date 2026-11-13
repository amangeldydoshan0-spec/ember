import { explainDate, seatingsFor } from './booking.ts'

export type ReservationInput = {
  name: string
  phone: string
  date: string
  time: string
  guests: string
}

export type FieldErrors = Partial<Record<keyof ReservationInput, string>>

export type ReservationPayload = {
  name: string
  phone: string
  reservation_date: string
  reservation_time: string
  guests: number
}

export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits.length === 10) digits = `7${digits}`
  if (!/^7\d{10}$/.test(digits)) return null
  return `+${digits}`
}

export function validateReservation(input: ReservationInput, now = new Date()) {
  const errors: FieldErrors = {}
  const name = input.name.trim().replace(/\s+/g, ' ')

  if (!name) {
    errors.name = 'Tell us the name for the booking.'
  } else if (name.length < 2 || name.length > 80 || !/^[\p{L}][\p{L}\s.'’-]*$/u.test(name)) {
    errors.name = 'Use the guest’s name, letters only.'
  }

  const phone = normalizePhone(input.phone)
  if (!phone) errors.phone = 'Enter a Kazakhstan phone number, such as +7 701 000 00 00.'

  const dateMessage = input.date ? explainDate(input.date, now) : 'Choose a date.'
  if (dateMessage) errors.date = dateMessage

  const slots = input.date ? seatingsFor(input.date, now) : []
  if (!input.time) errors.time = 'Choose a seating time.'
  else if (!errors.date && !slots.includes(input.time)) {
    errors.time = 'That seating is no longer available.'
  }

  const guests = Number(input.guests)
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
    errors.guests = 'Choose between 1 and 12 guests. For a larger party, please call us.'
  }

  if (Object.keys(errors).length > 0 || !phone) return { errors }

  const value: ReservationPayload = {
    name,
    phone,
    reservation_date: input.date,
    reservation_time: input.time,
    guests,
  }

  return { errors, value }
}
