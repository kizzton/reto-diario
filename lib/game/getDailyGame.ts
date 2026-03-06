import { getDailySeedLetters } from "../dailySeed"
import { getDailySeedNumbers } from "../dailySeed"
import { generateLettersGame } from "../letters/generator"
import { generateNumbersGame } from "../numbers/generator"
import { findBestWord } from "../letters/solver"
import dictionary from "@/lib/data/dictionary.json"

export function getDailyGame() {
  const seedLetters = getDailySeedLetters()
  const seedNumbers = getDailySeedNumbers()

  const lettersGame = generateLettersGame(seedLetters)
  const numbersGame = generateNumbersGame(seedNumbers)
  const bestWord = findBestWord(lettersGame, dictionary)

  return {
    letters: lettersGame,
    bestWord,
    numbers: numbersGame
  }
}