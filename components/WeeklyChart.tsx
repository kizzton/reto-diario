"use client"

import { useEffect, useState } from "react"
import { getLast7DaysStats } from "@/lib/stats"

export default function WeeklyChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(getLast7DaysStats())
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-center font-semibold mb-4">
        Últimos 7 días
      </h3>

      <div className="flex items-end justify-between h-40 gap-2">
        {data.map((day, i) => {
          const total = day.wordScore + day.numbersScore

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              
              <div className="w-full flex flex-col justify-end h-32">

                <div
                  style={{
                    height: `${(day.numbersScore / 20) * 100}%`,
                  }}
                  className="bg-blue-400 w-full"
                />

                <div
                  style={{
                    height: `${(day.wordScore / 20) * 100}%`,
                  }}
                  className="bg-green-400 w-full"
                />

              </div>

              <span className="text-xs mt-2">
                {new Date(day.date).toLocaleDateString("es-ES", {
                  weekday: "short",
                })}
              </span>

              <span className="text-xs text-gray-400">
                {total}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-400 inline-block" />
          Palabra
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-400 inline-block" />
          Cálculo
        </span>
      </div>
    </div>
  )
}