"use client"

import { useEffect, useState } from "react"
import { getDailyGame } from "@/lib/game/getDailyGame"
import NumbersGame from "@/components/NumbersGame"
import GameIntroModal from "@/components/GameIntroModal"
import { loadDailyState } from "@/lib/dailyState"

const game = getDailyGame()

export default function CalculoPage() {

  const [started, setStarted] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState<boolean | null>(null)

  useEffect(() => {
    const daily = loadDailyState()
    setAlreadyPlayed(daily.numbersPlayed)
  }, [])

  if (alreadyPlayed === null) {
    return null
  }

  if (alreadyPlayed) {
    return (
      <NumbersGame
        game={game.numbers}
        alreadyPlayed={true}
      />
    )
  }

  return (
    <main className="flex justify-center pt-10">

      {!started && (
        <GameIntroModal
          title="El cálculo del día"
          rules="Usa los números disponibles para alcanzar el objetivo en 40 segundos."
          onStart={() => setStarted(true)}
        />
      )}

      {started && (
        <NumbersGame 
          game={game.numbers}
          alreadyPlayed={alreadyPlayed}
        />
      )}

    </main>
  )
}