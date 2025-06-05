"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

const proposalContent = [
  {
    title: "Our Beginning",
    content:
      "From the moment I met you, I knew my life had changed forever. Your smile lit up my world, and your laugh became my favorite sound.",
    image: "/images/2.png",
  },
  {
    title: "Every Day With You",
    content:
      "Each day spent with you has been a gift. Through all our adventures, quiet moments, and shared dreams, you've made me a better person.",
    image: "/images/3.png",
  },
  {
    title: "Our Future Together",
    content:
      "I want to wake up next to you every morning, share every sunset, and build a lifetime of memories together. You are my everything.",
    image: "/images/4.png",
  },
  {
    title: "The Question",
    content:
      "Will you marry me? Will you be my partner, my best friend, and my love for the rest of our lives? I promise to love you unconditionally, forever and always.",
    image: "/images/5.png",
    isProposal: true,
  },
]

interface ProposalPagesProps {
  onResponse: () => void
}

export default function ProposalPages({ onResponse }: ProposalPagesProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    // 记录开始触摸时间，用于判断是否为快速滑动
    setTouchStartTime(Date.now())
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    // 阻止默认滚动行为
    e.preventDefault()
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    // 如果正在过渡中，忽略事件
    if (transitioning) return
    
    const distance = touchStart - touchEnd
    const swipeTime = Date.now() - touchStartTime
    
    // 根据滑动时间调整滑动距离阀值
    // 快速滑动时降低阀值
    const adjustedSwipeDistance = swipeTime < 300 ? minSwipeDistance * 0.6 : minSwipeDistance
    
    const isUpSwipe = distance > adjustedSwipeDistance
    const isDownSwipe = distance < -adjustedSwipeDistance
    
    if (isUpSwipe && currentPage < proposalContent.length - 1) {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentPage(currentPage + 1)
        setTimeout(() => setTransitioning(false), 50)
      }, 50)
    }
    if (isDownSwipe && currentPage > 0) {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentPage(currentPage - 1)
        setTimeout(() => setTransitioning(false), 50)
      }, 50)
    }
  }

  const handleWheel = (e: WheelEvent) => {
    // 阻止默认滚动行为
    e.preventDefault()
    
    // 如果正在过渡中，忽略事件
    if (transitioning) return
    
    if (e.deltaY > 0 && currentPage < proposalContent.length - 1) {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentPage(currentPage + 1)
        setTimeout(() => setTransitioning(false), 300)
      }, 10)
    } else if (e.deltaY < 0 && currentPage > 0) {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentPage(currentPage - 1)
        setTimeout(() => setTransitioning(false), 300)
      }, 10)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [currentPage])

  const currentContent = proposalContent[currentPage]

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative swipe-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'none', overflowY: 'hidden' }}
    >
      {/* Page indicator */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        {proposalContent.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-8 rounded-full transition-all duration-300 ${
              index === currentPage ? "bg-pink-400" : "bg-pink-200"
            }`}
          />
        ))}
      </div>

      {/* Navigation hints */}
      {currentPage > 0 && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-pink-400 animate-bounce">
          <ChevronUp className="w-6 h-6" />
        </div>
      )}

      {currentPage < proposalContent.length - 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-pink-400 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      )}

      {/* Content */}
      <div 
        className={`max-w-2xl mx-auto text-center space-y-8 transition-all duration-500 ease-out ${transitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        {/* Image */}
        <div className="relative">
          <div className="w-80 h-60 mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={currentContent.image || "/placeholder.svg"}
              alt={currentContent.title}
              width={320}
              height={240}
              className="object-cover w-full h-full"
            />
          </div>
          {currentContent.isProposal && (
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <span className="text-2xl">💍</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold ${
            currentContent.isProposal ? "text-pink-600" : "text-gray-800"
          } mb-6`}
        >
          {currentContent.title}
        </h2>

        {/* Content */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto">{currentContent.content}</p>

        {/* Special proposal styling */}
        {currentContent.isProposal && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-center space-x-4">
              <div className="w-8 h-8 bg-pink-300 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-purple-300 rounded-full animate-pulse delay-200"></div>
              <div className="w-8 h-8 bg-indigo-300 rounded-full animate-pulse delay-400"></div>
            </div>
            <p className="text-pink-500 font-semibold text-xl">I love you more than words can say ♡</p>

            {/* Response buttons */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={onResponse}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                Yes, I do! <span className="text-xl">💍</span>
              </button>
              <button
                onClick={onResponse}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-full shadow-md transform transition-all duration-200 hover:scale-105"
              >
                All right...
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Page counter */}
      <div className="absolute bottom-6 right-6 text-pink-400 text-sm">
        {currentPage + 1} / {proposalContent.length}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
