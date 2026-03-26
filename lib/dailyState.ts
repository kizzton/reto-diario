import { formatLocalDate } from "@/lib/utils/date"

export interface DailyGameState {
  date: string

  wordPlayed: boolean
  wordScore: number
  wordInput?: string
  wordResult?: "max" | "valid" | "invalid"

  numbersPlayed: boolean
  numbersScore: number
  numbersResult?: number
  numbersEngine?: any
}

function getDateString(date?: Date): string {
  return formatLocalDate(date ?? new Date())
}

function createState(date: string): DailyGameState {
  return {
    date,
    wordPlayed: false,
    numbersPlayed: false,
    wordScore: 0,
    numbersScore: 0
  }
}

function getKey(date: string) {
  return `retoState-${date}`
}

export function loadDailyState(date?: Date): DailyGameState {
  if (typeof window === "undefined") {
    return createState(getDateString(date))
  }

  const dateStr = getDateString(date)
  const key = getKey(dateStr)

  const saved = localStorage.getItem(key)

  if (!saved) {
    const newState = createState(dateStr)
    localStorage.setItem(key, JSON.stringify(newState))
    return newState
  }

  return JSON.parse(saved)
}

export function saveDailyState(state: DailyGameState) {
  if (typeof window === "undefined") return

  const key = getKey(state.date)
  localStorage.setItem(key, JSON.stringify(state))
}