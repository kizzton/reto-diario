export interface DailyGameState {
  date: string
  wordPlayed: boolean
  numbersPlayed: boolean
  wordScore: number
  numbersScore: number
}

function getToday(): string {
  return new Date().toISOString().split("T")[0]
}

function createNewState(): DailyGameState {
  const state: DailyGameState = {
    date: getToday(),
    wordPlayed: false,
    numbersPlayed: false,
    wordScore: 0,
    numbersScore: 0
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("retoState", JSON.stringify(state))
  }

  return state
}

export function loadDailyState(): DailyGameState {

  if (typeof window === "undefined") {
    return {
      date: getToday(),
      wordPlayed: false,
      numbersPlayed: false,
      wordScore: 0,
      numbersScore: 0
    }
  }

  const saved = localStorage.getItem("retoState")

  if (!saved) {
    return createNewState()
  }

  const parsed: DailyGameState = JSON.parse(saved)

  if (parsed.date !== getToday()) {
    return createNewState()
  }

  return parsed
}

export function saveDailyState(state: DailyGameState) {
  if (typeof window !== "undefined") {
    localStorage.setItem("retoState", JSON.stringify(state))
  }
}