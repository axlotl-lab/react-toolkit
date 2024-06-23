import React from "react";

type RepeaterProps = {
  children: React.ReactNode
  count: number
}

export const Repeater = ({ count, children }: RepeaterProps) => {
  return Array.from({ length: count }).map(_ => { return children })
}