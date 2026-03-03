const LETTER_DISTRIBUTION: Record<string, number> = {
  A: 2,
  E: 2,
  O: 2,
  I: 2,
  U: 2,

  R: 2,
  S: 2,
  N: 2,
  L: 2,
  T: 2,
  D: 2,
  C: 2,
  M: 2,
  P: 2,
  B: 2,
  G: 2,
  V: 1,
  H: 2,
  F: 1,
  Y: 1,

  Q: 1,
  J: 1,
  Ñ: 1,
  X: 1,
  Z: 1,
  K: 1,
  W: 1,
}
const LETTER_POOL = Object.entries(LETTER_DISTRIBUTION).flatMap(
  ([letter, count]) => Array(count).fill(letter)
)

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const VOWELS = ["A", "E", "I", "O", "U"]

export function generateLetters(seed: number): string[] {
  const letters: string[] = []
  let currentSeed = seed

  const numberOfVowels = 3 + Math.floor(seededRandom(currentSeed++) * 3) 
  // entre 3 y 5

  while (letters.length < 9) {
    const index = Math.floor(
      seededRandom(currentSeed++) * LETTER_POOL.length
    )

    const letter = LETTER_POOL[index]

    const vowelCount = letters.filter(l => VOWELS.includes(l)).length

    if (VOWELS.includes(letter)) {
      if (vowelCount < numberOfVowels) {
        letters.push(letter)
      }
    } else {
      if (letters.length - vowelCount < 9 - numberOfVowels) {
        letters.push(letter)
      }
    }
  }

  return shuffleWithSeed(letters, currentSeed)
}

function shuffleWithSeed(array: string[], seed: number) {
  const result = [...array]
  let currentSeed = seed

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(currentSeed++) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}