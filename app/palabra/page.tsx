"use client"

import { useEffect, useState } from "react"
import { getDailyGame } from "@/lib/game/getDailyGame"
import LettersGame from "@/components/LettersGame"
import GameIntroModal from "@/components/GameIntroModal"
import { loadDailyState } from "@/lib/dailyState"
import { formatLocalDate } from "@/lib/utils/date"
import { use } from "react"
import Header from "@/components/Header"

export default function PalabraPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {

  const params = use(searchParams)
  const dateParam = params?.date

  const selectedDate = dateParam ? new Date(dateParam) : new Date()
  const dateStr = formatLocalDate(selectedDate)

  const game = getDailyGame(selectedDate)

  const [started, setStarted] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState<boolean | null>(null)

  useEffect(() => {
    const daily = loadDailyState(selectedDate)
    setAlreadyPlayed(daily.wordPlayed)
  }, [selectedDate])

  if (alreadyPlayed === null) {
    return null
  }

  if (alreadyPlayed) {
    return (
      <LettersGame
        letters={game.letters}
        bestWord={game.bestWord}
        alreadyPlayed={true}
        date={selectedDate}
      />
    )
  }

  const today = formatLocalDate(new Date())
  const current = selectedDate ? formatLocalDate(selectedDate) : today
  const isFuture = current > today

  if (isFuture) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>🔒 Este reto aún no está disponible</p>
      </main>
    )
  }

  return (
    <main className="flex justify-center pt-10">
      <Header date={dateStr} />
      {!started && (
        <GameIntroModal
          title="La palabra del día"
          rules="Consigue la palabra más larga posible con las letras dadas en 60 segundos."
          onStart={() => setStarted(true)}
        />
      )}

      {started && (
        <LettersGame
          letters={game.letters}
          bestWord={game.bestWord}
          date={selectedDate}
        />
      )}

    </main>
  )
}