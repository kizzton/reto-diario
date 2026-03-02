import { getDailySeed } from "../dailySeed"
import { generateLetters } from "../letters/generator"
import { findBestWord } from "../letters/solver"
import dictionary from "@/lib/data/dictionary.json"

export function getDailyLettersGame() {
  const seed = getDailySeed()
  const letters = generateLetters(seed)
  const bestWord = findBestWord(letters, dictionary)

  return {
    letters,
    bestWord,
  }
}