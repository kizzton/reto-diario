import { createSeededRandom } from "../dailySeed"
import type { Operator, NumbersGame, SolutionStep } from "./types"

const LARGE_NUMBERS = [25, 50, 75, 100]

function randomInt(random: () => number, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min
}

function pickSmall(random: () => number) {
  return randomInt(random, 1, 10)
}

function pickLarge(random: () => number) {
  return LARGE_NUMBERS[randomInt(random, 0, LARGE_NUMBERS.length - 1)]
}

function generateNumbersSet(random: () => number): number[] {
  const numbers: number[] = []

  for (let i = 0; i < 4; i++) {
    numbers.push(pickSmall(random))
  }

  for (let i = 0; i < 2; i++) {
    numbers.push(pickLarge(random))
  }

  return numbers
}

function applyOperation(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a > b ? a - b : null
    case "*":
      return a * b
    case "/":
      return b !== 0 && a % b === 0 ? a / b : null
    default:
      return null
  }
}

function buildTarget(
  random: () => number,
  numbers: number[]
): { target: number; solution: SolutionStep[] } | null {
  let pool = [...numbers]
  const solution: SolutionStep[] = []

  while (pool.length > 1) {
    const i = randomInt(random, 0, pool.length - 1)
    let j = randomInt(random, 0, pool.length - 1)
    if (i === j) continue

    const a = pool[i]
    const b = pool[j]

    const operators: Operator[] = ["+", "-", "*", "/"]
    const op = operators[randomInt(random, 0, operators.length - 1)]

    const result = applyOperation(a, b, op)

    if (result !== null && result > 0 && result <= 999) {
      solution.push({
        a,
        b,
        operator: op,
        result
      })

      pool = pool.filter((_, idx) => idx !== i && idx !== j)
      pool.push(result)
    }
  }

  if (pool[0] <= 999) {
    return {
      target: pool[0],
      solution
    }
  }

  return null
}

export function generateNumbersGame(seed: string): NumbersGame {
  const random = createSeededRandom(seed)

  while (true) {
    const numbers = generateNumbersSet(random)
    const built = buildTarget(random, numbers)

    if (built && built.target > 0 && built.target <= 999) {
      return {
        numbers,
        target: built.target,
        solution: built.solution
      }
    }
  }
}