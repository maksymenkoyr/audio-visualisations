'use client'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// import MicrophonePermissionRequested from '../components/modals/MicrophonePermissionRequested'
// import MicrophonePermissionDenied from '../components/modals/MicrophonePermissionDenied'

type microphoneState = {
  analyser: AnalyserNode | null
  setGain?: Dispatch<SetStateAction<number>>
}

type microphoneContext = {
  analyser: AnalyserNode
  setGain: Dispatch<SetStateAction<number>>
}

export const MicrophoneContext = createContext<microphoneContext | null>(null)

export function MicrophoneProvider({ children }: { children: React.ReactNode }) {
  const [gain, setGain] = useState<number>(1)
  const [microphoneState, setMicrophoneState] = useState<microphoneState>({
    analyser: null,
    setGain,
  })
  console.log(gain)
  // let analyser: AnalyserNode2
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(stream => {
        const audioCtx = new AudioContext()
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 2048
        const audioSrc = audioCtx.createMediaStreamSource(stream)
        const gainNode = audioCtx.createGain()
        gainNode.connect(analyser)
        audioSrc.connect(gainNode)
        gainNode.gain.value = gain
        setMicrophoneState({ analyser, setGain })
      })
      .catch(err => {
        console.log(err)
      })
  }, [gain])
  return (
    <MicrophoneContext.Provider value={microphoneState as microphoneContext}>
      {microphoneState.analyser === null && <div>loading...</div>}
      {/* {microphoneState.permission.isPending
        ? createPortal(<MicrophonePermissionRequested />, document.body)
        : microphoneState.permission.isGranted ||
          createPortal(<MicrophonePermissionDenied />, document.body)} */}
      {microphoneState.analyser === null || children}
    </MicrophoneContext.Provider>
  )
}
