export type Operator = "+" | "-" | "*" | "/"

export type BaseNumber = {
  id: string
  value: number
  used: boolean
}

export type ResultNumber = {
  id: string
  value: number
  used: boolean
  row: number
}

export type OperationRow = {
  aId: string | null
  operator: Operator | null
  bId: string | null
  resultId: string | null
}

export type NumbersEngineState = {
  baseNumbers: BaseNumber[]
  resultNumbers: ResultNumber[]
  rows: OperationRow[]
  activeRow: number
  activeSlot: "a" | "operator" | "b"
  target: number
  finished: boolean
}

export interface NumbersGame {
  numbers: number[]
  target: number
  solution: SolutionStep[]
}

export interface SolutionStep {
  a: number
  b: number
  operator: Operator
  result: number
}