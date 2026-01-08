export function reveal(
  node: HTMLElement,
  options: {
    delay?: number;
    y?: number;
    duration?: number;
    easing?: string;
  } = {}
) {
  const {
    delay = 0,
    y = 60,
    duration = 1000,
    easing = "cubic-bezier(0.22, 1, 0.36, 1)",
  } = options;

  node.style.opacity = "0";
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `
    opacity ${duration}ms ${easing} ${delay}ms,
    transform ${duration}ms ${easing} ${delay}ms
  `;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.style.opacity = "1";
        node.style.transform = "translateY(0)";
        observer.unobserve(node);
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
