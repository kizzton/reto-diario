# 🧠 Reto Diario

Juego diario minimalista inspirado en retos de letras tipo Wordle, donde el usuario debe formar la mejor palabra posible con un conjunto limitado de letras.

Diseñado para ser:
- Simple
- Rápido
- Compartible
- Mobile-first

---

## 🚀 Estado actual del proyecto

Versión funcional desplegable con:

- ✅ Sistema de selección de letras mediante teclado propio (sin teclado del móvil)
- ✅ Gestión correcta de letras repetidas (por índice, no por carácter)
- ✅ Atenuación visual al usar letras
- ✅ Botón de borrar (`handleDelete`)
- ✅ Validación contra diccionario local
- ✅ Normalización de palabra (trim + lowercase)
- ✅ Bloqueo tras finalizar partida
- ✅ Diseño oscuro minimalista
- ✅ Preparado para despliegue en Vercel

---

## 🏗️ Stack Tecnológico

- **Next.js 16 (App Router)**
- React (Client Components)
- TypeScript
- CSS global simple (sin framework externo)
- Deploy en Vercel

---

## 📁 Estructura del proyecto

```
app/
  page.tsx
  globals.css

components/
  LettersGame.tsx

lib/
  dictionary.ts
  game/
    getDailyGame.ts
```

---

## 🧩 Lógica clave implementada

### 1️⃣ Gestión correcta de letras repetidas

En lugar de guardar letras seleccionadas, se guardan **índices** de las letras usadas:

```ts
const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
```

Esto permite que dos letras iguales (ej: dos "E") funcionen correctamente sin deshabilitar ambas al usar solo una.

---

### 2️⃣ Atenuación de letras usadas

```ts
const isUsed = selectedIndexes.includes(index)
```

Aplicado visualmente con:

```ts
opacity: isUsed ? 0.4 : 1
pointerEvents: isUsed ? "none" : "auto"
```

---

### 3️⃣ Borrar última letra

```ts
const handleDelete = () => {
  if (finished) return
  setSelectedIndexes(prev => prev.slice(0, -1))
}
```

---

### 4️⃣ Validación contra diccionario

Normalización para evitar errores por formato:

```ts
const normalized = currentWord.trim().toLowerCase()
const isValid = dictionary.includes(normalized)
```

⚠️ Todo el diccionario debe estar en el mismo formato (por ejemplo, todo en mayúsculas).

---

### 5️⃣ Estilo global

En `globals.css`:

```css
body {
  margin: 0;
  background: #0b0b0b;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 🧪 Cómo ejecutar en local

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Probar build de producción:

```bash
npm run build
```

---

## 🌍 Deploy

El proyecto está preparado para desplegarse en:

### Vercel

1. Subir repo a GitHub
2. Conectar en https://vercel.com
3. Deploy automático detectando Next.js

---

## 🎯 Próximos pasos posibles

- Persistencia diaria real (semilla por fecha)
- Sistema de puntuación
- Ranking
- Animaciones más pulidas
- Feedback visual tipo Wordle (flip animation)
- Modo cálculo (números)
- Compartir resultado en formato visual (cuadros de colores)
- Dominio propio

---

## 🧠 Filosofía del proyecto

Publicar antes de perfeccionar.  
Validar con usuarios reales.  
Iterar rápido.

Primero jugable.  
Luego bonito.  
Después escalable.

---

## 👨‍💻 Autor

Miguel – Proyecto experimental de reto diario gamificado.