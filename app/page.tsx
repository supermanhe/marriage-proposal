"use client"

import { useState } from "react"
import Homepage from "@/components/homepage"
import ProposalPages from "@/components/proposal-pages"
import ForeverLovePage from "@/components/forever-love-page"
import MusicPlayer from "@/components/music-player"

export default function ProposalWebsite() {
  const [currentView, setCurrentView] = useState<"homepage" | "proposal" | "forever">("homepage")
  const [isAnimating, setIsAnimating] = useState(false)

  const handleOpenEnvelope = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentView("proposal")
      setIsAnimating(false)
    }, 1500) // Animation duration
  }

  const handleProposalResponse = () => {
    setCurrentView("forever")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-35 animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-pink-300 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {currentView === "homepage" && <Homepage onOpenEnvelope={handleOpenEnvelope} isAnimating={isAnimating} />}
      {currentView === "proposal" && <ProposalPages onResponse={handleProposalResponse} />}
      {currentView === "forever" && <ForeverLovePage />}

      <MusicPlayer />
    </div>
  )
}
