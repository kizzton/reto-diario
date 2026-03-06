type Props = {
  title: string
  rules: string
  onStart: () => void
}

export default function GameIntroModal({ title, rules, onStart }: Props) {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[340px] space-y-4">

        <h2 className="text-xl font-bold text-center">
          {title}
        </h2>

        <p className="text-sm text-gray-600 text-center">
          {rules}
        </p>

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