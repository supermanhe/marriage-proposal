"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
        // 隐藏提示和遮罩
        setShowTooltip(false)
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    // Set the volume when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.5
    }
    
    // 不再自动隐藏提示
  }, [])

  return (
    <>
      {/* 黑色半透明遮罩 */}
      {showTooltip && !isPlaying && (
        <div className="fixed inset-0 bg-black/60 z-50" style={{ pointerEvents: "all" }}></div>
      )}
      
      <div className="fixed top-6 left-6 z-[60]">
        {/* Hidden audio element with open-source romantic music */}
        <audio ref={audioRef} loop preload="metadata">
          <source src="/music/proposal-song.mp3" type="audio/mpeg" />
          {/* 如果浏览器不支持MP3格式，可以提供备用格式 */}
          {/* <source src="/music/proposal-song.ogg" type="audio/ogg" /> */}
        </audio>

        <div className="relative">
          {showTooltip && !isPlaying && (
            <div className="absolute top-0 left-full ml-3 bg-white/90 backdrop-blur-sm text-pink-500 px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap z-10 animate-pulse">
              点击播放背景音乐
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-white/90 rotate-45"></div>
            </div>
          )}
          <Button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-pink-400 hover:bg-pink-500 text-white p-0 shadow-lg relative z-[70]"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>
        </div>
      </div>
    </>
  )
}
