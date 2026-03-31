"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"
import Header from "@/components/Header"

function getAllDatesOfMonth(year: number, month: number) {
  const dates: Date[] = []
  const date = new Date(year, month, 1)

  while (date.getMonth() === month) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

export default function ArchivoPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const router = useRouter()

  const [months, setMonths] = useState<(Date | null)[][]>([])

  useEffect(() => {
  const today = new Date()
  const months: (Date | null)[][] = []

  for (let m = 2; m >= 0; m--) {
    const date = new Date(today.getFullYear(), today.getMonth() - m, 1)

    const year = date.getFullYear()
    const month = date.getMonth()

    const monthDates = getAllDatesOfMonth(year, month)

    const firstDay = new Date(year, month, 1).getDay()
    const offset = (firstDay + 6) % 7

    const padded = [
      ...Array(offset).fill(null),
      ...monthDates
    ]

    months.push(padded)
  }

  setMonths(months)
}, [])

  function getDayStatus(date: Date) {
    const state = loadDailyState(date)

    if (state.wordPlayed && state.numbersPlayed) {
      return "complete"
    }

    if (state.wordPlayed || state.numbersPlayed) {
      return "partial"
    }

    return "empty"
  }

  function getColor(status: string) {
    if (status === "complete") return "#4CAF50"
    if (status === "partial") return "#E0A83E"
    return "#1f2937"
  }

  function handleClick(date: Date) {
    const today = new Date()
    if (date > today) return
    
    const dateStr = formatLocalDate(date)
    router.push(`/?date=${dateStr}`)
  }

  const params = use(searchParams)
  const dateParam = params?.date

  const selectedDate = dateParam ? new Date(dateParam) : new Date()
  const dateStr = formatLocalDate(selectedDate)

    return (
    <main className="flex flex-col items-center min-h-screen gap-1 py-20">
      <Header date={dateStr} />

      {months.map((dates, mIndex) => {
        const firstValidDate = dates.find(d => d !== null)

        return (
          <div key={mIndex} className="mb-8">

            {/* Título */}
            <h2 className="text-lg font-semibold uppercase mb-2 text-center">
              {firstValidDate?.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric"
              })}
            </h2>

            {/* Días semana */}
            <div className="grid grid-cols-7 text-xs text-gray-400 mb-2 max-w-[400px] mx-auto">
              {["L", "M", "X", "J", "V", "S", "D"].map(d => (
                <div key={d} className="text-center">{d}</div>
              ))}
            </div>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 10,
                maxWidth: 400,
                margin: "0 auto"
              }}
            >
              {dates.map((date, index) => {
                if (!date) return <div key={index}></div>

                const status = getDayStatus(date)
                const isFuture = date > new Date()

                return (
                  <div
                    key={index}
                    onClick={() => !isFuture && handleClick(date)}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: isFuture ? "#111" : getColor(status),
                      cursor: isFuture ? "not-allowed" : "pointer",
                      color: "white",
                      fontWeight: "bold",
                      opacity: isFuture ? 0.5 : 1,
                      textAlign: "center"
                    }}
                  >
                    {isFuture ? "🔒" : date.getDate()}
                  </div>
                )
              })}
            </div>

          </div>
        )
      })}
    </main>
  )
}