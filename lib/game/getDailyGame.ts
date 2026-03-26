import { getDailySeedLetters } from "../dailySeed"
import { getDailySeedNumbers } from "../dailySeed"
import { generateLettersGame } from "../letters/generator"
import { generateNumbersGame } from "../numbers/generator"
import { findBestWord } from "../letters/solver"
import dictionary from "@/lib/data/dictionary.json"

export function getDailyGame(date: Date = new Date()) {

  const seedLetters = getDailySeedLetters(date)
  const seedNumbers = getDailySeedNumbers(date)

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