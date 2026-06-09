"use client"

import { useEffect } from "react"

interface TitleSetterProps {
  title: string
}

export function TitleSetter({ title }: TitleSetterProps) {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}
