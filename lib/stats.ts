import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"

export type DayStats = {
  date: string
  wordScore: number
  numbersScore: number
}

export function getLast7DaysStats(): DayStats[] {
  const days: DayStats[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)

    const state = loadDailyState(d)

    days.push({
      date: formatLocalDate(d),
      wordScore: state?.wordScore || 0,
      numbersScore: state?.numbersScore || 0,
    })
  }

  return days
}