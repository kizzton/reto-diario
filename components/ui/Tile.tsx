import React from "react"
import "../../styles/game.css"

type Props = {
  children: React.ReactNode
  onClick?: () => void
  variant?: "available" | "used" | "result" | "result-used" | "operator"
  active?: boolean
}

export default function Tile({
  children,
  onClick,
  variant = "available",
  active = false
}: Props) {

  const classNames = [
    "tile",
    variant === "available" && "tile-available",
    variant === "used" && "tile-used",
    variant === "result" && "tile-result",
    variant === "result-used" && "tile-result-used",
    variant === "operator" && "operator",
    active && "tile-active"
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )
}