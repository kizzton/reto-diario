import { loadDailyState } from "./dailyState"

export function shareDailyResult() {

  const daily = loadDailyState()

  const total = daily.wordScore + daily.numbersScore

  const message = `🧠 El Reto del Día

🔤 La Palabra: ${daily.wordScore}
🔢 El Cálculo: ${daily.numbersScore}

🏆 Total: ${total}/20

¿Puedes superarlo?`

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  )
}