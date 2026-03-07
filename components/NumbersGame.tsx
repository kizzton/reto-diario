"use client"

import { useEffect, useState } from "react"
import Tile from "@/components/ui/Tile"
import {
  createNumbersEngine,
  selectNumber,
  selectOperator,
  deleteLast
} from "@/lib/numbers/engine"
import type { NumbersGame, NumbersEngineState, Operator } from "@/lib/numbers/types"
import "@/styles/game.css"
import { loadDailyState, saveDailyState } from "@/lib/dailyState"
import { shareDailyResult } from "@/lib/shareResult"

type Props = {
  game: NumbersGame
  alreadyPlayed?: boolean
}

export default function NumbersGame({ game, alreadyPlayed }: Props) {
    const [engine, setEngine] = useState(() => {

      const daily = loadDailyState()

      if (alreadyPlayed && daily.numbersEngine) {
        return daily.numbersEngine
      }

      return createNumbersEngine(game.numbers, game.target)
    })

  const [timeLeft, setTimeLeft] = useState(40)
  const [finished, setFinished] = useState(alreadyPlayed ?? false)

  const daily = loadDailyState()

  const lastResult =
    engine.resultNumbers.length
      ? engine.resultNumbers[engine.resultNumbers.length - 1].value
      : finished
      ? daily.numbersResult ?? null
      : null

  const score = computeScore(engine.target, lastResult)

  const [showSolution, setShowSolution] = useState(false)

  // ⏱ Temporizador
  useEffect(() => {
    if (finished) return

    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [finished])

  const handleNumberClick = (id: string) => {
    if (finished) return
      setEngine((prev: NumbersEngineState) => ({ ...selectNumber(prev, id) }))
  }

  useEffect(() => {
    if (engine.finished) {

      setFinished(true)

      const daily = loadDailyState()

      daily.numbersPlayed = true
      daily.numbersScore = score
      if (lastResult !== null) {
        daily.numbersResult = lastResult
      }

      daily.numbersEngine = engine

      saveDailyState(daily)
    }
  }, [engine.finished])

  const handleOperatorClick = (op: Operator) => {
    if (finished) return
      setEngine((prev: NumbersEngineState) => ({ ...selectOperator(prev, op) }))
  }

  const handleDelete = () => {
    if (finished) return
      setEngine((prev: NumbersEngineState) => ({ ...deleteLast(prev) }))
  }

  const getValue = (id: string | null) => {
    if (!id) return ""
    const base = engine.baseNumbers.find((n: any) => n.id === id)
    if (base) return base.value
    const result = engine.resultNumbers.find((r: any) => r.id === id)
    if (result) return result.value
    return ""
  }

  function computeScore(target: number, result: number | null) {

    if (result === null) return 0

    const diff = Math.abs(target - result)

    if (diff === 0) return 10
    if (diff === 1) return 7
    if (diff === 2) return 5
    if (diff <= 5) return 3

    return 0
  }

  return (
    <div className="game-container">
      <h2 style={{ textAlign: "center" }}>EL CÁLCULO</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>
          Objetivo: {game.target}
        </div>
        {lastResult && !finished && (
          <div className="text-sm text-gray-500 mt-2">
            Diferencia actual: {Math.abs(engine.target - lastResult)}
          </div>
        )}
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            color: timeLeft <= 10 ? "#dc2626" : "#111"
          }}
        >
          {timeLeft}s
        </div>
      </div>

      {/* FILAS DE OPERACIÓN */}
      {engine.rows.map((row: any, index: number) => (
        <div className="row" key={index}>
          <Tile
            variant={
              row.aId
                ? isUsed(row.aId) ? "used" : "available"
                : "available"
            }
            active={engine.activeRow === index && engine.activeSlot === "a"}
            onClick={
              row.aId
                ? () => handleNumberClick(row.aId!)
                : undefined
            }
          >
            {getValue(row.aId)}
          </Tile>

          <Tile
            variant="operator"
            active={
              engine.activeRow === index &&
              engine.activeSlot === "operator"
            }
          >
            {row.operator ?? ""}
          </Tile>

          <Tile
            variant={
              row.bId
                ? isUsed(row.bId) ? "used" : "available"
                : "available"
            }
            active={engine.activeRow === index && engine.activeSlot === "b"}
            onClick={
              row.bId
                ? () => handleNumberClick(row.bId!)
                : undefined
            }
          >
            {getValue(row.bId)}
          </Tile>

          <div>=</div>

          <Tile
            variant={
              row.resultId
                ? isUsed(row.resultId)
                  ? "result-used"
                  : "result"
                : "available"
            }
            onClick={
              row.resultId
                ? () => handleNumberClick(row.resultId!)
                : undefined
            }
          >
            {getValue(row.resultId)}
          </Tile>
        </div>
      ))}

      {finished && (() => {
        const daily = loadDailyState()
        if (daily.wordPlayed && daily.numbersPlayed) {
          return (
            <button onClick={shareDailyResult} className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white">
              COMPARTIR RESULTADO
            </button>
          )
        }
        return null
      })()}

      {finished && (
        <div className="mt-6 text-center space-y-2">

          <div className="text-lg">
            Tu resultado: {lastResult ?? "—"}
          </div>

          <div className="text-sm text-gray-500">
            Diferencia: {lastResult ? Math.abs(engine.target - lastResult) : "—"}
          </div>

          <div className="text-xl font-bold">
            Puntos: {score}
          </div>

          <button
            onClick={() => setShowSolution(true)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Ver solución
          </button>

        </div>
      )}

      {showSolution && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[320px] space-y-4">

            <h2 className="text-lg font-semibold text-center">
              Solución
            </h2>

            <div className="space-y-2 text-center">

              {game.solution.map((step, i) => (
                <div key={i}>
                  {step.a} {step.operator} {step.b} = {step.result}
                </div>
              ))}

            </div>

            <button
              onClick={() => setShowSolution(false)}
              className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cerrar
            </button>

          </div>

        </div>
      )}

      {/* NÚMEROS BASE */}
      <div className="row" style={{ marginTop: 30 }}>
        {engine.baseNumbers.map((n: any) => (
          <Tile
            key={n.id}
            variant={n.used ? "used" : "available"}
            onClick={() => !n.used && handleNumberClick(n.id)}
          >
            {n.value}
          </Tile>
        ))}
      </div>

      {/* OPERADORES + BORRAR */}
      <div className="row" style={{ marginTop: 20 }}>
        {["+", "-", "*", "/"].map(op => (
          <Tile
            key={op}
            variant="operator"
            onClick={() => handleOperatorClick(op as Operator)}
          >
            {op}
          </Tile>
        ))}

        <button
          className="button button-danger"
          onClick={handleDelete}
        >
          ⌫
        </button>
      </div>
    </div>
  )

  function isUsed(id: string) {
    const base = engine.baseNumbers.find((n: any) => n.id === id)
    if (base) return base.used
    const result = engine.resultNumbers.find((r: any) => r.id === id)
    if (result) return result.used
    return false
  }
}