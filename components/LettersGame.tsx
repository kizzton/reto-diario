"use client"

import { useEffect, useState } from "react"
import dictionary from "@/lib/data/dictionary.json"
import { loadDailyState, saveDailyState } from "@/lib/dailyState"
import { shareDailyResult } from "@/lib/shareResult"
import "@/styles/game.css"
import Link from "next/link"

interface Props {
  letters: string[]
  bestWord: string
  alreadyPlayed?: boolean
}

export default function LettersGame({ letters, bestWord, alreadyPlayed }: Props) {
  const MAX_LENGTH = letters.length

  const [input, setInput] = useState<string[]>(() => {
    if (alreadyPlayed) {
      const daily = loadDailyState()

      if (daily.wordInput) {
        const savedLetters = daily.wordInput.split("")
        return [...savedLetters, ...Array(MAX_LENGTH - savedLetters.length).fill("")]
      }
    }

    return Array(MAX_LENGTH).fill("")
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(alreadyPlayed ? 0 : 40)
  const [finished, setFinished] = useState(alreadyPlayed ?? false)
  const [result, setResult] = useState<"max" | "valid" | "invalid" | null>(() => {
    if (alreadyPlayed) {
      const daily = loadDailyState()
      return daily.wordResult ?? null
    }
    return null
  })

  const [dailyState, setDailyState] = useState(() => loadDailyState())
  useEffect(() => {
    const daily = loadDailyState()
    setDailyState(daily)
  }, [])

  // ---------------- VALIDACIÓN ----------------
  function isValidWord(word: string) {
    return dictionary.includes(word.toUpperCase())
  }

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (finished) return

    if (timeLeft === 0) {
      finishGame()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, finished])

function finishGame() {

  if (finished) return

  setFinished(true)

  const word = input.join("").trim()

  let score = 0
  let gameResult: "max" | "valid" | "invalid"

  if (!isValidWord(word)) {
    gameResult = "invalid"
    score = 0
  } 
  else if (word.length === bestWord.length) {
    gameResult = "max"
    score = 10
  } 
  else {
    gameResult = "valid"
    score = word.length
  }

  setResult(gameResult)

  const previous = loadDailyState()

  const updated = {
    ...previous,
    wordPlayed: true,
    wordScore: score,
    wordInput: word,
    wordResult: gameResult
  }

  saveDailyState(updated)
  setDailyState(updated)
}

useEffect(() => {
  if (!alreadyPlayed) return

  const daily = loadDailyState()

  if (daily.wordInput) {
    const savedLetters = daily.wordInput.split("")
    const rebuilt = [
      ...savedLetters,
      ...Array(MAX_LENGTH - savedLetters.length).fill("")
    ]

    setInput(rebuilt)
  }
}, [alreadyPlayed])

  // ---------------- COLORES ----------------
  function getBoxColor() {
    if (!finished) return "#f3f4f6"

    if (result === "max") return "#4CAF50"
    if (result === "valid") return "#E0A83E"
    if (result === "invalid") return "#D9534F"

    return "#f3f4f6"
  }

  // ---------------- USO DE LETRAS ----------------
  function countOccurrences(arr: string[], letter: string) {
    return arr.filter(l => l === letter).length
  }

  // ---------------- TECLADO ----------------
  function handleLetterClick(letter: string, index: number) {
    if (finished) return

    const used =
      countOccurrences(input, letter) >=
      countOccurrences(letters, letter)

    if (used) return

    const newInput = [...input]
    newInput[selectedIndex] = letter
    setInput(newInput)

    const nextIndex = Math.min(selectedIndex + 1, MAX_LENGTH - 1)
    setSelectedIndex(nextIndex)
  }

  function handleDelete() {
    if (finished) return

    const newInput = [...input]
    newInput[selectedIndex] = ""
    setInput(newInput)

    setSelectedIndex(Math.max(0, selectedIndex - 1))
  }

  const currentWord = input.join("").trim()

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1 style={{ marginBottom: 4 }}><a href="https://elretodeldia.es">EL RETO DEL DÍA</a></h1>
      <h3 style={{ color: "#777", marginTop: 0 }}>LA PALABRA</h3>

      {/* Cajas */}
      <div className="row" style={{ gap: 2 }}>
        {input.map((letter, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            style={{
              width: 40,
              height: 50,
              borderRadius: 8,
              border:
                selectedIndex === index && !finished
                  ? "3px solid #3b82f6"
                  : "2px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
              backgroundColor: getBoxColor(),
              color: finished ? "white" : "black",
              cursor: finished ? "default" : "pointer",
            }}
          >
            {letter}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, color: "#666" }}>
        {timeLeft}:00
      </div>

      {/* Mensaje resultado */}
      {finished && (
        <div style={{ marginTop: 30 }}>
          {result === "max" && (
            <>
              <h2>¡IMPRESIONANTE!</h2>
              <p>
                Has conseguido hacer la palabra más larga posible.
              </p>
            </>
          )}

          {result === "valid" && (
            <>
              <h2>¡CASI PERFECTO!</h2>
              <p>
                Aún se podían usar más letras, como en{" "}
                <strong>{bestWord}</strong>.
              </p>
            </>
          )}

          {result === "invalid" && (
            <>
              <h2>Palabra no válida</h2>
              <p>Inténtalo de nuevo mañana 😉</p>
            </>
          )}
          <p style={{ marginTop: 10, fontWeight: "bold" }}>
            Puntos: {dailyState.wordScore}
          </p>
        </div>
      )}

      {finished && (
  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>

    {!dailyState.numbersPlayed && (
      <Link href="/calculo">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Jugar cálculo
        </button>
      </Link>
    )}

    {dailyState.numbersPlayed && (
          <Link href="/resultado">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Ver resultado diario
            </button>
          </Link>
        )}

      </div>
    )}

      {/* Teclado */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {letters.map((letter, index) => {
            const timesUsed = input.filter(l => l === letter).length
            const timesAppearedBefore = letters
                .slice(0, index)
                .filter(l => l === letter).length

            const isUsed = timesAppearedBefore < timesUsed

            return (
                <button
                key={index}
                onClick={() => handleLetterClick(letter, index)}
                disabled={isUsed || finished}
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: 8,
                    border: "none",
                    fontWeight: "bold",
                    fontSize: 18,
                    backgroundColor: isUsed ? "#bbb" : "#d1d5db",
                    cursor: "pointer",
                }}
                >
                {letter}
                </button>
            )
        })}

        <button
          onClick={handleDelete}
          disabled={finished}
          style={{
            width: 55,
            height: 55,
            borderRadius: 8,
            border: "none",
            backgroundColor: "#9ca3af",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⌫
        </button>
      </div>
    </div>
  )
}