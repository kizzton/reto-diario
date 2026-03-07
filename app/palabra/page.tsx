"use client"

import { useEffect, useState } from "react"
import { getDailyGame } from "@/lib/game/getDailyGame"
import LettersGame from "@/components/LettersGame"
import GameIntroModal from "@/components/GameIntroModal"
import { loadDailyState } from "@/lib/dailyState"

const game = getDailyGame()

export default function PalabraPage() {

  const [started, setStarted] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState<boolean | null>(null)

  useEffect(() => {
    const daily = loadDailyState()
    setAlreadyPlayed(daily.wordPlayed)
  }, [])

  if (alreadyPlayed === null) {
    return null
  }

  if (alreadyPlayed) {
    return (
      <LettersGame
        letters={game.letters}
        bestWord={game.bestWord}
        alreadyPlayed={true}
      />
    )
  }

  return (
    <main className="flex justify-center pt-10">

      {!started && (
        <GameIntroModal
          title="La palabra del día"
          rules="Consigue la palabra más larga posible con las letras dadas en 40 segundos."
          onStart={() => setStarted(true)}
        />
      )}

      {started && (
        <LettersGame
          letters={game.letters}
          bestWord={game.bestWord}
        />
      )}

    </main>
  )
}