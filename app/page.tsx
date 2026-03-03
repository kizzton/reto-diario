import { getDailyLettersGame } from "@/lib/game/getDailyGame"
import LettersGame from "@/components/LettersGame"

export default function Home() {
  const game = getDailyLettersGame()

  return (
    <main style={{ padding: 40 }}>
      <LettersGame
        letters={game.letters}
        bestWord={game.bestWord}
      />
    </main>
  )
}