'use client'

import useMicrophoneContext from './microphone/useMicrophoneContext'

export default function Home() {
  const { analyser } = useMicrophoneContext()
  return <main className='bg-black'>hi!</main>
}

