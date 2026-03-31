import { formatLocalDate } from "@/lib/utils/date"

const STORAGE_KEY = "daily_streak"

type StreakData = {
  lastPlayedDate: string
  streak: number
  bestStreak: number
}

function getToday() {
  return formatLocalDate(new Date())
}

function getYesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return formatLocalDate(d)
}

export function loadStreak(): StreakData {
  if (typeof window === "undefined") {
    return { lastPlayedDate: "", streak: 0, bestStreak: 0 }
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { lastPlayedDate: "", streak: 0, bestStreak: 0 }
  }

  return JSON.parse(raw)
}

export function updateStreak(): StreakData {
  const today = getToday()
  const yesterday = getYesterday()

  const current = loadStreak()

  // Ya jugó hoy → no cambiar nada
  if (current.lastPlayedDate === today) {
    return current
  }

  let newStreak = 1

  // Si jugó ayer → suma
  if (current.lastPlayedDate === yesterday) {
    newStreak = current.streak + 1
  }

  const updated: StreakData = {
    lastPlayedDate: today,
    streak: newStreak,
    bestStreak: Math.max(current.bestStreak, newStreak),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return updated
}