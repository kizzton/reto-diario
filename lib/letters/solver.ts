function canBuildWord(word: string, letters: string[]): boolean {
  const available = [...letters]

  for (const char of word) {
    const index = available.indexOf(char)
    if (index === -1) return false
    available.splice(index, 1)
  }

  return true
}

export function findBestWord(
  letters: string[],
  dictionary: string[]
): string {
  let bestWord = ""

  for (const word of dictionary) {
    if (word.length <= bestWord.length) continue
    if (canBuildWord(word, letters)) {
      bestWord = word
    }
  }

  return bestWord
}