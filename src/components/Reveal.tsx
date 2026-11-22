import { useEffect, useRef, type ReactNode } from 'react'
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('on'); observer.unobserve(node) }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="rv" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    let frame = 0
    let start: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const animate = (time: number) => {
        start ??= time
        const progress = Math.min((time - start) / 1500, 1)
        node.textContent = `${Math.round(to * (1 - Math.pow(1 - progress, 3)))}${suffix}`
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    })
    observer.observe(node)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [to, suffix])
  return <b ref={ref}>{`0${suffix}`}</b>
}
