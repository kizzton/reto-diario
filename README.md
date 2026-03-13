# EL RETO DEL DÍA

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Status](https://img.shields.io/badge/status-beta-orange)
![License](https://img.shields.io/badge/license-personal-lightgrey)

Juego diario online de lógica y cálculo.

Cada día los jugadores deben resolver **dos retos diferentes**:

🔤 **La Palabra del Día**\
➗ **El Cálculo del Día**

El objetivo es conseguir la **máxima puntuación posible** resolviendo
ambos desafíos.

🌐 https://elretodeldia.es

------------------------------------------------------------------------

# 🎮 Cómo funciona

Cada día se genera un reto único compuesto por dos juegos.

## 🔤 La Palabra del Día

Un juego tipo Wordle en el que debes adivinar una palabra.

Características:

-   número limitado de intentos
-   feedback visual por letras
-   puntuación basada en eficiencia

------------------------------------------------------------------------

## ➗ El Cálculo del Día

Un reto de cálculo mental.

El jugador recibe:

-   varios números base
-   un número objetivo

Debe combinar los números usando:

-   
-   × ÷

Para acercarse lo máximo posible al número objetivo antes de que termine
el tiempo.

Reglas:

-   se pueden reutilizar los resultados de operaciones anteriores
-   cada número solo puede usarse una vez
-   hay límite de tiempo

Ejemplo:

3 + 7 = 10\
10 × 5 = 50

------------------------------------------------------------------------

# 🏆 Sistema de puntuación

La puntuación depende de lo cerca que esté el resultado del número
objetivo.

  Diferencia   Puntos
  ------------ --------
  exacto       10
  1            9
  2            8
  3            7
  4            6
  5            5
  6            4
  7            3
  8            2
  9            1
  ≥10          0

------------------------------------------------------------------------

# 📤 Compartir resultados

Después de completar los retos diarios se puede compartir el resultado.

Ejemplo:

EL RETO DEL DÍA

🔤 Palabra: 8\
➗ Cálculo: 7

Total: 15

------------------------------------------------------------------------

# 🧠 Filosofía del juego

El objetivo es crear un juego diario que sea:

-   rápido de jugar
-   desafiante
-   compartible
-   fácil de entender
-   divertido

Inspirado en juegos diarios como:

-   Wordle
-   Nerdle
-   Framed

------------------------------------------------------------------------

# 🧩 Arquitectura del proyecto

El proyecto está construido con:

-   Next.js
-   React
-   TypeScript
-   LocalStorage para persistencia del estado diario

------------------------------------------------------------------------

# 📂 Estructura del proyecto

app/ palabra/ calculo/ resultado/

components/ LettersGame.tsx NumbersGame.tsx GameIntroModal.tsx Tile.tsx

lib/ game/ getDailyGame.ts numbers/ engine.ts types.ts dailyState.ts
shareResult.ts

------------------------------------------------------------------------

# 💾 Persistencia

El estado del jugador se guarda en:

localStorage

Esto permite:

-   continuar partidas
-   guardar resultados diarios
-   evitar repetir retos

------------------------------------------------------------------------

# 📊 Analytics

El proyecto incluye seguimiento básico de uso.

Eventos previstos:

-   start_word
-   finish_word
-   start_numbers
-   finish_numbers
-   share_result

------------------------------------------------------------------------

# 🚀 Roadmap

## Beta actual

Funcionalidades actuales:

-   juego de palabra
-   juego de cálculo
-   resultado diario
-   compartir resultado
-   persistencia local

------------------------------------------------------------------------

## Próximas mejoras

### Gameplay

-   diccionario ampliado (incluyendo palabras en femenino)
-   tutorial animado para el juego de cálculo
-   mejora de la dificultad de los retos

### Experiencia de usuario

-   página de inicio mejorada
-   estadísticas del jugador
-   sistema de racha diaria
-   página de resultados más completa

### Viralidad

-   compartir resultados estilo Wordle
-   enlaces al reto del día
-   visualización gráfica del resultado

### Futuro

-   ranking semanal
-   archivo de retos anteriores
-   nuevos tipos de retos

------------------------------------------------------------------------

# 🛠 Desarrollo

Clonar el proyecto:

git clone https://github.com/kizzton/reto-diario

Instalar dependencias:

npm install

Ejecutar entorno local:

npm run dev

Abrir:

http://localhost:3000

------------------------------------------------------------------------

# 👤 Autor

Proyecto creado por:

Miguel

GitHub: https://github.com/kizzton
