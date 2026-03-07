export interface DailyGameState {
  date: string
  wordPlayed: boolean
  numbersPlayed: boolean
  wordScore: number
  numbersScore: number

  numbersResult?: number
  numbersEngine?: any
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function createState(): DailyGameState {
  return {
    date: today(),
    wordPlayed: false,
    numbersPlayed: false,
    wordScore: 0,
    numbersScore: 0
  }
}

export function loadDailyState(): DailyGameState {

  if (typeof window === "undefined") {
    return createState()
  }

  const saved = localStorage.getItem("retoState")

  if (!saved) {
    const newState = createState()
    localStorage.setItem("retoState", JSON.stringify(newState))
    return newState
  }

  const parsed = JSON.parse(saved)

  if (parsed.date !== today()) {
    const newState = createState()
    localStorage.setItem("retoState", JSON.stringify(newState))
    return newState
  }

  return parsed
}

export function saveDailyState(state: DailyGameState) {

  if (typeof window === "undefined") return

  localStorage.setItem("retoState", JSON.stringify(state))
}