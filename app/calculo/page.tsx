"use client"

import { getDailyGame } from "@/lib/game/getDailyGame"
import { useState } from "react"
import NumbersGame from "@/components/NumbersGame"
import GameIntroModal from "@/components/GameIntroModal"
import { createNumbersEngine, selectNumber, selectOperator } from "@/lib/numbers/engine"
import { loadDailyState } from "@/lib/dailyState"

const daily = loadDailyState()

const wordDone = daily.wordPlayed
const numbersDone = daily.numbersPlayed

const game = getDailyGame()

export default function CalculoPage() {

  const [started, setStarted] = useState(false)

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
        <NumbersGame game={game.numbers} />
      )}

    </main>
  )
}