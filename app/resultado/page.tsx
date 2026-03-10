"use client"

import { loadDailyState } from "@/lib/dailyState"
import { shareDailyResult } from "@/lib/shareResult"

export default function ResultadoPage() {

  const daily = loadDailyState()

  const total = daily.wordScore + daily.numbersScore

  return (
    <div className="max-w-md mx-auto p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">
        Reto diario
      </h1>

      <p className="text-lg">
        🔤 Palabra: {daily.wordScore}
      </p>

      <p className="text-lg">
        🧮 Cálculo: {daily.numbersScore}
      </p>

      <h2 className="text-xl font-bold mt-4">
        Total: {total}
      </h2>

      <button
        onClick={shareDailyResult}
        className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
        Compartir resultado
        </button>

    </div>
  )
}