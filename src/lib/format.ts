export function formatKzt(amount: number) {
  return `${new Intl.NumberFormat('ru-KZ').format(amount)} ₸`
}

export function formatLongDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length !== 11) return phone
  return `+${digits[0]} ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`
}
