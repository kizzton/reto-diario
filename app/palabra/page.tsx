"use client"

import { useState } from "react"
import { getDailyGame } from "@/lib/game/getDailyGame"
import LettersGame from "@/components/LettersGame"
import GameIntroModal from "@/components/GameIntroModal"

import { loadDailyState } from "@/lib/dailyState"

const daily = loadDailyState()

const wordDone = daily.wordPlayed
const numbersDone = daily.numbersPlayed

const game = getDailyGame()

export default function PalabraPage() {

  const [started, setStarted] = useState(false)

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