'use client'
import { useContext } from "react";
import { MicrophoneContext } from "./MicrophoneProvider";

const useMicrophoneContext = () => {
  const context = useContext(MicrophoneContext);
  if (!context) {
    throw new Error(
      'useMicrophoneContext must be used within a MicrophoneProvider'
    );
  }
  return context;
}

export default useMicrophoneContext;