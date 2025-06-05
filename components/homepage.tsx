"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HomepageProps {
  onOpenEnvelope: () => void
  isAnimating: boolean
}

export default function Homepage({ onOpenEnvelope, isAnimating }: HomepageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Profile Picture */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
          <Image src="/images/1.png" alt="Our Anniversary" width={128} height={128} className="object-cover" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">💕</span>
        </div>
      </div>

      {/* Personalized Message */}
      <div className="text-center mb-12 max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">My Dearest Min</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          I have something very special to share with you. This moment has been in my heart for so long...
        </p>
      </div>

      {/* Envelope - centered */}
      <div className="relative mb-8 flex justify-center w-full">
        <div className={`envelope-container ${isAnimating ? "opening" : ""}`}>
          {/* Envelope Back */}
          <div className="envelope-back">
            <div className="w-80 h-56 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-xl border-2 border-pink-300"></div>
          </div>

          {/* Envelope Front */}
          <div className="envelope-front">
            <div className="w-80 h-56 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-xl border-2 border-pink-200 relative overflow-hidden">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-pink-300 to-pink-200 clip-triangle"></div>

              {/* Heart seal */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">💖</span>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-pink-700 font-script text-lg">For You ♡</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Button */}
      <div className="text-center">
        <p className="text-pink-600 mb-4 text-sm animate-bounce">Click the open button!! (つ◕v◕)つ♡</p>
        <Button
          onClick={onOpenEnvelope}
          disabled={isAnimating}
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50"
        >
          {isAnimating ? "Opening..." : "Open"}
        </Button>
      </div>

      <style jsx>{`
        .envelope-container {
          position: relative;
          perspective: 1000px;
        }
        
        .envelope-front, .envelope-back {
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 1.5s ease-in-out;
        }
        
        .envelope-back {
          z-index: 1;
        }
        
        .envelope-front {
          z-index: 2;
          transform-origin: top center;
        }
        
        .opening .envelope-front {
          transform: rotateX(-180deg);
        }
        
        .clip-triangle {
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }
        
        .font-script {
          font-family: 'Brush Script MT', cursive;
        }
      `}</style>
    </div>
  )
}
