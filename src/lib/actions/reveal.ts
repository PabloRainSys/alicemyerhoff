type RevealOptions = {
  delay?: number
  threshold?: number
  y?: number
}

export function reveal(
  node: HTMLElement,
  {
    delay = 0,
    threshold = 0.15,
    y = 20
  }: RevealOptions = {}
) {
  // estado inicial (oculto)
  node.style.opacity = '0'
  node.style.transform = `translateY(${y}px)`
  node.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // entra en viewport → aparece
        node.style.opacity = '1'
        node.style.transform = 'translateY(0)'
      } else {
        // sale del viewport → vuelve al estado inicial
        node.style.opacity = '0'
        node.style.transform = `translateY(${y}px)`
      }
    },
    { threshold }
  )

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    }
  }
}
