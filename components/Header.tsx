"use client"

import { useRouter } from "next/navigation"
import { formatLocalDate } from "@/lib/utils/date"
import { Home, Calendar } from "lucide-react"

export default function Header({ date }: { date?: string }) {
  const router = useRouter()

  const selectedDate = date ? new Date(date) : new Date()

  const dateStr = formatLocalDate(selectedDate)

  return (
    <header className="fixed top-0 left-0 right-0 #ededed z-50">

      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">

        {/* 🏠 HOME */}
        <button
          onClick={() => router.push(`/?date=${dateStr}`)}
          className="text-xl"
        >
            <Home size={20} />
        </button>

        {/* 🧠 TITLE */}
        <div className="text-sm font-semibold tracking-wide">
          EL RETO DEL DÍA
        </div>

        {/* 📅 ARCHIVO */}
        <button
          onClick={() => router.push("/archivo")}
          className="text-xl"
        >
          <Calendar size={20} />
        </button>

      </div>

    </header>
  )
}