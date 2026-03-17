import dictionary from "@/lib/data/dictionary.json"

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function pickWord(seed: number): string {
  let currentSeed = seed

  while (true) {
    const index = Math.floor(seededRandom(currentSeed++) * dictionary.length)
    const word = dictionary[index]

    // Evitamos palabras muy cortas (importante)
    if (word.length >= 5 && word.length <= 9) {
      return word
    }
  }
}

const LETTER_POOL = [
  ..."AAAAAAEEEIIIIOOO",
  ..."BCDFGHJKLMNÑPRST",
  ..."UVXYZ"
]

function generateLettersFromWord(word: string, seed: number): string[] {
  let currentSeed = seed

  const letters = word.split("")

  while (letters.length < 9) {
    const extra =
      LETTER_POOL[
        Math.floor(seededRandom(currentSeed++) * LETTER_POOL.length)
      ]
    letters.push(extra)
  }

  return shuffle(letters, currentSeed)
}

function shuffle(array: string[], seed: number) {
  const result = [...array]
  let currentSeed = seed

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(currentSeed++) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

export function generateLettersGame(seed: number) {
  const word = pickWord(seed)
  const letters = generateLettersFromWord(word, seed)

  return {
    letters,
    solution: word
  }
}