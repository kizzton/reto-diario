"use client"

import { useEffect, useState } from "react"

type Props = {
  title: string
  rules: string
  onStart: () => void
}

export default function GameIntroModal({ title, rules, onStart }: Props) {

  const [step, setStep] = useState(0)

  useEffect(() => {

    const sequence = [0, 1, 2, 3, 4]

    sequence.forEach((_, i) => {
      setTimeout(() => {
        setStep(i)
      }, i * 900)
    })

  }, [])

  function renderDemo() {

    return (
      <div className="mt-3 text-center font-mono text-lg space-y-2">

        <div>
          {step >= 1 && "25"}
          {step >= 2 && " + "}
          {step >= 2 && "50"}
          {step >= 3 && " = "}
          {step >= 3 && <span className="text-blue-600 font-bold">75</span>}
        </div>

        <div>
          {step >= 4 && (
            <>
              <span className="text-blue-600 font-bold">75</span> × 3 = 225
            </>
          )}
        </div>

      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[340px] space-y-4">

        <h2 className="text-xl font-bold text-center">
          {title}
        </h2>

        <p className="text-sm text-gray-600 text-center">
          {rules}
        </p>

        {/* animación solo para el cálculo */}
        {title.includes("cálculo") && (
          <>
            <p className="text-xs text-gray-500 text-center">
              💡 Puedes usar los resultados obtenidos en nuevas operaciones.
            </p>

            {renderDemo()}
          </>
        )}

        <button
          onClick={onStart}
          className="w-full py-2 rounded-lg bg-blue-500 text-white"
        >
          Comenzar
        </button>

      </div>

    </div>
  )
}