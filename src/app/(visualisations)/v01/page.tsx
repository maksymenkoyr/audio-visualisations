'use client'
import { Canvas } from '@/app/canvas/Canvas'
import useMicrophoneContext from '@/app/microphone/useMicrophoneContext'
import { Anybody } from 'next/font/google'

const Page = () => {
  const { analyser } = useMicrophoneContext()
  const render = (ctx: CanvasRenderingContext2D) => {
    return (timestamp: number) => {
      ctx.clearRect(
        -window.innerWidth / 2,
        -window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight,
      )
      const data = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteTimeDomainData(data)
      let maxNumber = 0
      ctx.lineWidth = (data[0] / 120) ** 5
      if (data[0] > maxNumber) {
        maxNumber = data[0]
      }
      ctx.fillStyle = '#000000'
      ctx.strokeStyle = '#eae9ea'
      let angle = (Math.PI * 2) / data.length
      data.forEach((value: number, i: number) => {
        ctx.beginPath()
        ctx.arc(0, 0, (value * 0.25) ** 1.5, angle * i, angle * ++i)
        ctx.stroke()
      })
      window.requestAnimationFrame(render(ctx))
    }
  }
  return (
    <div>
      <Canvas render={render} />
    </div>
  )
}

export default Page
