"use client"

import { useEffect, useState } from "react"
import { getDailyGame } from "@/lib/game/getDailyGame"
import NumbersGame from "@/components/NumbersGame"
import GameIntroModal from "@/components/GameIntroModal"
import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"
import { use } from "react"
import Header from "@/components/Header"

export default function CalculoPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {

  const params = use(searchParams)
  const dateParam = params?.date

  const selectedDate = dateParam ? new Date(dateParam) : new Date()

  const game = getDailyGame(selectedDate)

  const [started, setStarted] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState<boolean | null>(null)

  useEffect(() => {
    const daily = loadDailyState(selectedDate)
    setAlreadyPlayed(daily.numbersPlayed)
  }, [selectedDate])

  const today = formatLocalDate(new Date())
  const current = selectedDate ? formatLocalDate(selectedDate) : today
  const isFuture = current > today

  const dateStr = formatLocalDate(selectedDate)
  
    return (
      <>
        <Header date={dateStr} />
  
        {alreadyPlayed ? (
          <NumbersGame
            game={game.numbers}
            alreadyPlayed={true}
            date={selectedDate}
          />
        ) : isFuture ? (
          <main className="flex items-center justify-center min-h-screen">
            <p>🔒 Este reto aún no está disponible</p>
          </main>
        ) : (
          <main className="flex justify-center pt-10">
            {!started && (
              <GameIntroModal
                title="El cálculo del día"
                rules="Usa los números disponibles para alcanzar el objetivo en 60 segundos."
                onStart={() => setStarted(true)}
              />
            )}
  
            {started && (
              <NumbersGame 
                game={game.numbers}
                date={selectedDate}
              />
            )}
          </main>
        )}
      </>
    )
}