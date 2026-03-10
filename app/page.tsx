import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10">

      <h1 style={{ marginBottom: 4 }}><a href="https://elretodeldia.es">EL RETO DEL DÍA</a></h1>

      <div className="grid gap-6 w-[320px]">

        <Link
          href="/palabra"
          className="p-6 rounded-xl border text-center hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">
            La palabra del día
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Consigue la palabra más larga posible
          </p>
        </Link>

        <Link
          href="/calculo"
          className="p-6 rounded-xl border text-center hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">
            El cálculo del día
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Llega al número objetivo
          </p>
        </Link>

      </div>

    </main>
  )
}