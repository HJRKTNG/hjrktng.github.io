import { useEffect, useState } from 'react'

export function useTypewriter(texts: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(i => i + 1), speed)
      return () => clearTimeout(t)
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex(i => i - 1), speed / 2)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex === 0) {
      setDeleting(false)
      setTextIndex(i => (i + 1) % texts.length)
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause])

  useEffect(() => {
    setDisplayed(texts[textIndex].slice(0, charIndex))
  }, [charIndex, textIndex, texts])

  return displayed
}
