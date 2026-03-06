import { v4 as uuid } from "uuid"
import type {
  NumbersEngineState,
  Operator,
  OperationRow
} from "./types"

const MAX_ROWS = 5

export function createNumbersEngine(initial: number[], target: number): NumbersEngineState {
  return {
    baseNumbers: initial.map(n => ({
      id: uuid(),
      value: n,
      used: false
    })),
    resultNumbers: [],
    rows: [createEmptyRow()],
    activeRow: 0,
    activeSlot: "a",
    target,
    finished: false
  }
}

function createEmptyRow(): OperationRow {
  return {
    aId: null,
    operator: null,
    bId: null,
    resultId: null
  }
}

export function selectNumber(
  state: NumbersEngineState,
  id: string
): NumbersEngineState {

  const base = state.baseNumbers.find(n => n.id === id)
  const result = state.resultNumbers.find(r => r.id === id)

  const isUsed = base?.used || result?.used
  if (isUsed) return state

  const row = state.rows[state.activeRow]
  if (!row) return state

  // Marcar como usado
  let newState = markUsedImmutable(state, id, true)

  const newRows = [...newState.rows]

  if (newState.activeSlot === "a") {
    newRows[newState.activeRow] = {
      ...row,
      aId: id
    }

    return {
      ...newState,
      rows: newRows,
      activeSlot: "operator"
    }
  }

  if (newState.activeSlot === "b") {
    newRows[newState.activeRow] = {
      ...row,
      bId: id
    }

    return computeRow({
      ...newState,
      rows: newRows
    })
  }

  return state
}

export function selectOperator(
  state: NumbersEngineState,
  op: Operator
): NumbersEngineState {

  if (state.activeSlot !== "operator") return state

  const newRows = [...state.rows]

  newRows[state.activeRow] = {
    ...newRows[state.activeRow],
    operator: op
  }

  return {
    ...state,
    rows: newRows,
    activeSlot: "b"
  }
}

function computeRow(state: NumbersEngineState): NumbersEngineState {

  const rowIndex = state.activeRow
  const row = state.rows[rowIndex]

  if (!row.aId || !row.bId || !row.operator) return state

  const a = findValue(state, row.aId)
  const b = findValue(state, row.bId)

  if (a == null || b == null) return state

  const result = compute(a, b, row.operator)
  if (result == null) return state

  const resultId = uuid()

  const newRows = [...state.rows]

  newRows[rowIndex] = {
    ...row,
    resultId
  }

  const newResultNumbers = [
    ...state.resultNumbers,
    {
      id: resultId,
      value: result,
      used: false,
      row: rowIndex
    }
  ]

  if (newRows.length < MAX_ROWS) {
    newRows.push(createEmptyRow())
  }

  if (result === state.target) {
    return {
      ...state,
      rows: newRows,
      resultNumbers: newResultNumbers,
      finished: true
    }
  }

  return {
    ...state,
    rows: newRows,
    resultNumbers: newResultNumbers,
    activeRow: rowIndex + 1,
    activeSlot: "a"
  }
}

export function deleteLast(state: NumbersEngineState): NumbersEngineState {

  let rowIndex = state.activeRow
  let newState = state
  const newRows = [...state.rows]

  while (rowIndex >= 0) {

    const row = newRows[rowIndex]
    if (!row) break

    // borrar B
    if (row.bId) {

      newState = markUsedImmutable(newState, row.bId, false)
      newState = removeRowResult(newState, rowIndex)

      newRows[rowIndex] = {
        ...row,
        bId: null
      }

      newRows[rowIndex] = {
        ...row,
        bId: null,
        resultId: null
      }

      return {
        ...newState,
        rows: newRows,
        activeRow: rowIndex,
        activeSlot: "b"
      }
    }

    // borrar operador
    if (row.operator) {

      newState = removeRowResult(newState, rowIndex)

      newRows[rowIndex] = {
        ...row,
        operator: null
      }

      newRows[rowIndex] = {
        ...row,
        operator: null,
        resultId: null
      }

      return {
        ...newState,
        rows: newRows,
        activeRow: rowIndex,
        activeSlot: "operator"
      }
    }

    // borrar A
    if (row.aId) {

      newState = markUsedImmutable(newState, row.aId, false)
      newState = removeRowResult(newState, rowIndex)

      newRows[rowIndex] = {
        ...row,
        aId: null
      }

      newRows[rowIndex] = {
        ...row,
        aId: null,
        resultId: null
      }

      return {
        ...newState,
        rows: newRows,
        activeRow: rowIndex,
        activeSlot: "a"
      }
    }

    // si la fila está vacía, subir a la anterior
    if (!row.aId && !row.operator && !row.bId && rowIndex > 0) {
      newRows.splice(rowIndex, 1)
      rowIndex--
    }
  }

  return state
}

function compute(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case "+": return a + b
    case "-": return a - b > 0 ? a - b : null
    case "*": return a * b
    case "/": return b !== 0 && a % b === 0 ? a / b : null
    default: return null
  }
}

function findValue(state: NumbersEngineState, id: string): number | null {
  const base = state.baseNumbers.find(n => n.id === id)
  if (base) return base.value

  const result = state.resultNumbers.find(r => r.id === id)
  if (result) return result.value

  return null
}

function markUsedImmutable(
  state: NumbersEngineState,
  id: string,
  used: boolean
): NumbersEngineState {
  return {
    ...state,
    baseNumbers: state.baseNumbers.map(n =>
      n.id === id ? { ...n, used } : n
    ),
    resultNumbers: state.resultNumbers.map(r =>
      r.id === id ? { ...r, used } : r
    )
  }
}

function removeRowResult(
  state: NumbersEngineState,
  rowIndex: number
): NumbersEngineState {

  return {
    ...state,
    resultNumbers: state.resultNumbers.filter(
      r => r.row !== rowIndex
    )
  }
}