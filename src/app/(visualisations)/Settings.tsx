import { useState } from 'react'
import useMicrophoneContext from '../microphone/useMicrophoneContext'

export default function Settings() {
  const { setGain } = useMicrophoneContext()
  const [gainValue, setGainValue] = useState<number>(50)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gainNumber = e.target.valueAsNumber
    setGainValue(e.target.valueAsNumber)
    if (gainNumber > 50) {
      setGain(1 + (gainNumber - 50) / 5)
    } else if (gainNumber < 50) {
      setGain(gainNumber / 50)
    } else {
      setGain(1)
    }
  }
  return (
    <div>
      <h1>Settings</h1>
      <h2>microphone sensitivity</h2>
      <input type='range' min='0' max='100' step='1' value={gainValue} onChange={handleChange} />
    </div>
  )
}
