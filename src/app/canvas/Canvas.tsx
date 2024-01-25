import { useEffect, useRef } from 'react'
interface CanvasProps {
  render: (ctx: CanvasRenderingContext2D) => (timestamp: number) => void 
  width?: number
  height?: number
  cartesian?: boolean // if true, the canvas will be centered at 0,0
}
export const Canvas = ({ render, width, height, cartesian = true }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = width || window.innerWidth
    canvas.height = height || window.innerHeight
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#000000'
    ctx.strokeStyle = '#eae9ea'
    if (cartesian) ctx.translate(canvas.width / 2, canvas.height / 2)
    window.requestAnimationFrame(render(ctx))
  }, [width, height, render, cartesian])

  return <canvas ref={canvasRef} />
}
