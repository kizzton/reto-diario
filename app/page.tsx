"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"
import { shareDailyResult } from "@/lib/shareResult"
import { use } from "react"

export default function Home({ searchParams }: { searchParams: Promise<{ date?: string }> }) {

  const params = use(searchParams)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const date = params?.date ? new Date(params.date) : new Date()

    setSelectedDate(date)

    const daily = loadDailyState(date)
    setState(daily)

  }, [params])

  if (!selectedDate || !state) return null

  const dateStr = formatLocalDate(selectedDate)
  const total = state.wordScore + state.numbersScore

  const todayStr = formatLocalDate(new Date())
  const selectedStr = formatLocalDate(selectedDate)

  if (selectedStr > todayStr) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>🔒 Este reto aún no está disponible</p>
      </main>
    )
  }

  const wordEmoji =
    state.wordResult === "max" ? "🟩" :
    state.wordResult === "valid" ? "🟨" :
    state.wordResult === "invalid" ? "🟥" :
    "⬜"

  const numbersEmoji =
    state.numbersScore === 10 ? "🟩" :
    state.numbersScore >= 1 ? "🟨" :
    state.numbersScore > 0 ? "🟥" :
    "⬜"

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10">

      {/* 📅 FECHA */}
      <p className="text-gray-500">
        {selectedDate.toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </p>

      <div className="grid gap-6 w-[320px]">

        {/* 🧠 PALABRA */}
        <Link
          href={`/palabra?date=${dateStr}`}
          className={`p-6 rounded-xl border text-center ${
            state.wordPlayed ? "opacity-60" : "hover:bg-gray-50"
          }`}
        >
          <h2 className="text-xl font-semibold">
            La palabra del día {state.wordPlayed ? "✅" : ""}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Consigue la palabra más larga posible
          </p>
        </Link>

        {/* 🔢 CÁLCULO */}
        <Link
          href={`/calculo?date=${dateStr}`}
          className={`p-6 rounded-xl border text-center ${
            state.numbersPlayed ? "opacity-60" : "hover:bg-gray-50"
          }`}
        >
          <h2 className="text-xl font-semibold">
            El cálculo del día {state.numbersPlayed ? "✅" : ""}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Llega al número objetivo
          </p>
        </Link>

      </div>

      {/* 📊 RESULTADO */}
      {state.wordPlayed && state.numbersPlayed && (
        <div className="max-w-md mx-auto p-6 text-center">

          <p className="text-lg">
            🔤 Palabra {wordEmoji} {state.wordScore}pts
          </p>

          <p className="text-lg">
            🔢 Cálculo {numbersEmoji} {state.numbersScore}pts
          </p>

          <h2 className="text-xl font-bold mt-4">
            Total: {total}
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {total >= 18 && "🔥 Brutal"}
            {total >= 14 && total < 18 && "💪 Muy bien"}
            {total < 14 && "😅 Se puede mejorar"}
          </p>

        </div>
      )}

      {state.wordPlayed && state.numbersPlayed && (
        <div className="flex flex-col gap-3 mt-4">

          <button
            onClick={() => shareDailyResult(selectedDate)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold text-lg"
          >
            Compartir resultado
          </button>

        </div>
      )}

    </main>
  )
}