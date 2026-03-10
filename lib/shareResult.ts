import { loadDailyState } from "./dailyState"

export function shareDailyResult() {

  const daily = loadDailyState()

  const date = new Date().toLocaleDateString("es-ES")

  const wordEmoji =
    daily.wordResult === "max" ? "🟩" :
    daily.wordResult === "valid" ? "🟨" :
    "🟥"

  const numbersEmoji =
    daily.numbersScore === 10 ? "🟩" :
    daily.numbersScore >= 6 ? "🟨" :
    "🟥"

  const total = daily.wordScore + daily.numbersScore

  const text =
`🧠 El Reto del Día — ${date}

🔤 Palabra: ${wordEmoji} ${daily.wordScore} pts
🔢 Cálculo: ${numbersEmoji} ${daily.numbersScore} pts

Total: ${total} puntos

¿Puedes superarme?
https://elretodeldia.es`

  navigator.clipboard.writeText(text)

  alert("Resultado copiado para compartir 🚀")

  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank"
  )
}