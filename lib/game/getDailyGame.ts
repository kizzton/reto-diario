import { getDailySeedLetters } from "../dailySeed"
import { getDailySeedNumbers } from "../dailySeed"
import { generateLettersGame } from "../letters/generator"
import { generateNumbersGame } from "../numbers/generator"
import { findBestWord } from "../letters/solver"
import dictionary from "@/lib/data/dictionary.json"

export function getDailyGame() {
  const seedLetters = getDailySeedLetters()
  const seedNumbers = getDailySeedNumbers()

  const lettersGameData = generateLettersGame(Number(seedLetters))
  const bestWord = findBestWord(
    lettersGameData.letters,
    dictionary
  )
  const numbersGame = generateNumbersGame(seedNumbers)

  return {
    letters: lettersGameData.letters,
    bestWord,
    numbers: numbersGame
  }
}