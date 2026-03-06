export function scoreWord(
  word: string,
  bestWord: string,
  isValid: boolean
): number {

  if (!isValid) return 0

  if (word.length === bestWord.length) {
    return 10
  }

  return word.length
}

export function scoreNumbers(
  result: number,
  target: number
): number {

  const diff = Math.abs(result - target)

  if (diff === 0) return 10
  if (diff <= 5) return 7
  if (diff <= 10) return 5

  return 0
}

export function totalScore(wordScore: number, numberScore: number) {
  return wordScore + numberScore
}