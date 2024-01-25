'use client'
import { createContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// import MicrophonePermissionRequested from '../components/modals/MicrophonePermissionRequested'
// import MicrophonePermissionDenied from '../components/modals/MicrophonePermissionDenied'

type microphoneState = {
  analyser: AnalyserNode | null
}

type microphoneContext = {
  analyser: AnalyserNode
}

export const MicrophoneContext = createContext<microphoneContext | null>(null)

export function MicrophoneProvider({ children }: { children: React.ReactNode }) {
  
  const [microphoneState, setMicrophoneState] = useState<microphoneState>({ analyser: null })
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
        gainNode.gain.value = 10
        console.log(gainNode.gain)
        setMicrophoneState({
          analyser: analyser,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
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
