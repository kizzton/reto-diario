import { loadDailyState } from "./dailyState"

export function shareDailyResult(date: Date) {

  const daily = loadDailyState(date)

  const formattedDate = date.toLocaleDateString("es-ES")

  const wordEmoji =
    daily.wordResult === "max" ? "🟩" :
    daily.wordResult === "valid" ? "🟨" :
    "🟥"

  const numbersEmoji =
    daily.numbersScore === 10 ? "🟩" :
    daily.numbersScore >= 1 ? "🟨" :
    "🟥"

  const total = daily.wordScore + daily.numbersScore

  const text =
  `🧠 El Reto del Día — ${formattedDate}

  🔤 Palabra: ${wordEmoji} ${daily.wordScore}pts
  🔢 Cálculo: ${numbersEmoji} ${daily.numbersScore}pts

  🏆 ${total} puntos

  ¿Puedes superarme?
  https://elretodeldia.es`

  navigator.clipboard.writeText(text)

  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank"
  )
}