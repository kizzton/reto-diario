"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"

function getAllDatesOfMonth(year: number, month: number) {
  const dates: Date[] = []
  const date = new Date(year, month, 1)

  while (date.getMonth() === month) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}



export default function ArchivoPage() {
  const router = useRouter()

  const [dates, setDates] = useState<Date[]>([])

  useEffect(() => {
    const today = new Date()
    const monthDates = getAllDatesOfMonth(
      today.getFullYear(),
      today.getMonth()
    )
    setDates(monthDates)
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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10">
      <div style={{ padding: 20, textAlign: "center" }}>

        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 10,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {dates.map((date, index) => {
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
                  opacity: isFuture ? 0.5 : 1
                }}
              >
                {isFuture ? "🔒" : date.getDate()}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}