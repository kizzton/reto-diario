export function getDateString(date?: Date): string {
  const today = date ?? new Date()
  return today.toISOString().split("T")[0]
}

// 🔤 Seed para letras (mejorado)
export function getDailySeedLetters(date?: Date): string {
  const dateString = getDateString(date)
  return hashString(`letters-${dateString}`)
}

// ➗ Seed para números (también mejorado)
export function getDailySeedNumbers(date?: Date): string {
  const dateString = getDateString(date)
  return hashString(`numbers-${dateString}`)
}

// 🔑 Hash simple pero suficiente
function hashString(str: string): string {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash).toString()
}

export function createSeededRandom(seed: string) {
  let h = 2166136261 >>> 0

  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }

  return function () {
    h += h << 13
    h ^= h >>> 7
    h += h << 3
    h ^= h >>> 17
    h += h << 5
    return (h >>> 0) / 4294967296
  }
}