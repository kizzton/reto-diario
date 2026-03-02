export function getDailySeed(date?: Date): number {
  const today = date ?? new Date()
  const dateString = today.toISOString().split("T")[0]

  let hash = 0
  for (let i = 0; i < dateString.length; i++) {
    hash = dateString.charCodeAt(i) + ((hash << 5) - hash)
  }

  return Math.abs(hash)
}