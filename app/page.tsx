"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"
import { shareDailyResult } from "@/lib/shareResult"
import { use } from "react"
import Header from "@/components/Header"
import { loadStreak, updateStreak } from "@/lib/streak"
import WeeklyChart from "@/components/WeeklyChart"
import { DayStats } from "@/lib/stats"

export default function Home({ searchParams }: { searchParams: Promise<{ date?: string }> }) {

  const params = use(searchParams)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [state, setState] = useState<any>(null)

  const [streak, setStreak] = useState<number>(0)
  const [bestStreak, setBestStreak] = useState<number>(0)

  const [streakUpdatedToday, setStreakUpdatedToday] = useState(false)

  const [data, setData] = useState<DayStats[]>([])

  useEffect(() => {
    const date = params?.date ? new Date(params.date) : new Date()

    setSelectedDate(date)

    const daily = loadDailyState(date)
    setState(daily)

  }, [params])

  useEffect(() => {
    const data = loadStreak()
    setStreak(data.streak)
    setBestStreak(data.bestStreak)
  }, [])

const wordPlayed = state?.wordPlayed
const numbersPlayed = state?.numbersPlayed

useEffect(() => {
  const todayStr = formatLocalDate(new Date())
  const selectedStr = selectedDate
    ? formatLocalDate(selectedDate)
    : null

  if (
    state &&
    wordPlayed &&
    numbersPlayed &&
    !streakUpdatedToday &&
    selectedStr === todayStr // 👈 CLAVE
  ) {
    const updated = updateStreak()

    setStreak(updated.streak)
    setBestStreak(updated.bestStreak)
    setStreakUpdatedToday(true)
  }
}, [wordPlayed, numbersPlayed, selectedDate])

function getStreakMessage(streak: number) {
  if (streak === 1) return "🔥 Has jugado solo 1 día seguido"
  if (streak < 5) return "💪 ¡Sigue así! Ya llevas jugando " + streak + " días seguidos"
  if (streak < 10) return "🔥 ¡En racha! Llevas jugando " + streak + " días seguidos"
  return "🚀 ¡Imparable! Llevas jugando " + streak + " días seguidos"
}

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
    "🟥"

  const numbersEmoji =
    state.numbersScore === 10 ? "🟩" :
    state.numbersScore >= 1 ? "🟨" :
    "🟥"

  return (
    <main className="flex flex-col items-center min-h-screen gap-10 py-20">
      <Header date={dateStr} />

      {/* 📅 FECHA */}
      <p className="text-gray-500">
        {selectedDate.toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </p>

      {/* 🔥 RACHA */}
      {selectedStr === todayStr && (
      <div className="text-center">
         <p className="text-lg font-semibold">
          {getStreakMessage(streak)}
        </p> 
        {streak > 0 && (
          <p className="text-sm text-gray-500">
            🏆 Mejor racha: {bestStreak}
          </p>
        )}
      </div>
      )}
      {selectedStr === todayStr &&
        !(state.wordPlayed && state.numbersPlayed) &&
        streak > 0 && (
          <p className="text-sm text-orange-500 mt-2">
            ⏳ Juega hoy para mantener tu racha
          </p>
      )}

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

      {/* 🔁 COMPARTIR */}
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

      {/* 📊 ESTADÍSTICAS */}
      {state.wordPlayed && state.numbersPlayed && (
        <>
        <div className="max-w-md mx-auto p-6 text-center">
          <WeeklyChart />
        </div>
        </>
      )}

    </main>
  )
}