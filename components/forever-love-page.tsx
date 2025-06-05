"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"

type DynamicHeart = {
  id: number;
  x: number | string; // 可以是数字或百分比字符串
  y: number | string;
  size: number;
  type: string;
  rotation: number;
  duration: number;
}

export default function ForeverLovePage() {
  const [hearts, setHearts] = useState<DynamicHeart[]>([])
  const [nextId, setNextId] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 不同类型的爱心表情
  const heartTypes = ['💖', '💕', '💗', '❤️', '💓', '💘']
  
  // 自动生成默认漂浮爱心
  const [autoHearts, setAutoHearts] = useState<DynamicHeart[]>([])
  const [autoHeartId, setAutoHeartId] = useState(1000) // 给自动生成的爱心一个不同的ID范围

  // 确保默认爱心动画自动开始并定期添加新的默认爱心
  useEffect(() => {
    // 初始化默认爱心
    const initialHearts = document.querySelectorAll('.floating-heart')
    initialHearts.forEach((heart) => {
      const element = heart as HTMLElement
      element.style.animation = 'none'
      setTimeout(() => {
        element.style.animation = 'float-up 12s infinite linear'
      }, 10)
    })
    
    // 定时生成新的默认爱心
    const addDefaultHeart = () => {
      const randomLeft = Math.random() * 90 + 5 // 5%-95%的水平位置
      const randomType = heartTypes[Math.floor(Math.random() * heartTypes.length)]
      const randomSize = Math.floor(Math.random() * 10) + 25 // 25-35px
      
      const newHeart: DynamicHeart = {
        id: autoHeartId,
        x: randomLeft + '%',
        y: 100, // 从底部开始
        size: randomSize,
        type: randomType,
        rotation: Math.random() * 180 - 90,
        duration: Math.random() * 3 + 8 // 8-11秒
      }
      
      setAutoHearts(prevHearts => [...prevHearts, newHeart])
      setAutoHeartId(prevId => prevId + 1)
      
      // 10秒后移除
      setTimeout(() => {
        setAutoHearts(prevHearts => prevHearts.filter(h => h.id !== newHeart.id))
      }, 11000)
    }
    
    // 初始生成一些爱心
    setTimeout(() => {
      addDefaultHeart()
    }, 500)
    
    // 每3-5秒生成一个新爱心
    const interval = setInterval(() => {
      addDefaultHeart()
    }, Math.random() * 2000 + 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  // 点击生成爱心效果
  const createHeart = (e: React.MouseEvent | React.TouchEvent) => {
    // 计算点击位置（相对于容器）
    const container = containerRef.current
    if (!container) return
    
    // 获取鼠标或触摸事件的坐标
    let clientX, clientY
    
    if ('touches' in e) {
      // 触摸事件
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // 鼠标事件
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    // 随机生成1-3个爱心
    const count = Math.floor(Math.random() * 3) + 1
    
    const newHearts: DynamicHeart[] = []
    
    for (let i = 0; i < count; i++) {
      // 为每个爱心设置随机属性
      const heart: DynamicHeart = {
        id: nextId + i,
        x: x + (Math.random() * 40 - 20), // 在点击位置周围随机偏移
        y: y + (Math.random() * 40 - 20),
        size: Math.floor(Math.random() * 20) + 20, // 20-40px
        type: heartTypes[Math.floor(Math.random() * heartTypes.length)],
        rotation: Math.random() * 180 - 90, // -90到90度旋转
        duration: Math.random() * 2 + 3 // 3-5秒动画时长
      }
      
      newHearts.push(heart)
    }
    
    setNextId(nextId + count)
    setHearts([...hearts, ...newHearts])
    
    // 动画结束后移除爱心
    setTimeout(() => {
      setHearts(currentHearts => 
        currentHearts.filter(h => !newHearts.some(newHeart => newHeart.id === h.id))
      )
    }, 5000) // 5秒后移除
  }
  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      onClick={createHeart}
      onTouchStart={createHeart}>
      {/* Full screen background image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/6.png" alt="Forever Love" fill className="object-cover" priority />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 p-6">
        {/* Main title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl animate-fade-in-up">Happy Anniversary!</h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg animate-fade-in-up delay-500 max-w-2xl mx-auto">
          Our journey together has just begun. Thank you for saying yes to forever with me.
        </p>

        {/* Decorative hearts */}
        <div className="flex justify-center space-x-6 animate-fade-in-up delay-1000">
          <span className="text-4xl animate-pulse">💕</span>
          <span className="text-5xl animate-pulse delay-200">💖</span>
          <span className="text-4xl animate-pulse delay-400">💕</span>
        </div>

        {/* Date */}
        <p className="text-lg text-white/80 drop-shadow-md animate-fade-in-up delay-1500">Always & Forever ∞</p>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 默认爱心动画 */}
        <div className="floating-heart" style={{ left: "10%", animationDelay: "0s" }}>
          💖
        </div>
        <div className="floating-heart" style={{ left: "20%", animationDelay: "2s" }}>
          💕
        </div>
        <div className="floating-heart" style={{ left: "30%", animationDelay: "4s" }}>
          💗
        </div>
        <div className="floating-heart" style={{ left: "70%", animationDelay: "1s" }}>
          💖
        </div>
        <div className="floating-heart" style={{ left: "80%", animationDelay: "3s" }}>
          💕
        </div>
        <div className="floating-heart" style={{ left: "90%", animationDelay: "5s" }}>
          💗
        </div>
        
        {/* 点击生成的爱心 */}
        {hearts.map((heart) => (
          <div 
            key={heart.id}
            className="dynamic-heart"
            style={{
              left: typeof heart.x === 'number' ? `${heart.x}px` : heart.x,
              top: typeof heart.y === 'number' ? `${heart.y}px` : heart.y,
              fontSize: `${heart.size}px`,
              transform: `rotate(${heart.rotation}deg)`,
              animationDuration: `${heart.duration}s`
            }}
          >
            {heart.type}
          </div>
        ))}
        
        {/* 自动生成的默认爱心 */}
        {autoHearts.map((heart) => (
          <div 
            key={heart.id}
            className="auto-heart"
            style={{
              left: typeof heart.x === 'number' ? `${heart.x}px` : heart.x,
              bottom: '0px',
              fontSize: `${heart.size}px`,
              transform: `rotate(${heart.rotation}deg)`,
              animationDuration: `${heart.duration}s`
            }}
          >
            {heart.type}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-heart {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
        
        .floating-heart {
          position: absolute;
          bottom: -50px;
          font-size: 30px;
          animation: float-up 12s infinite linear;
          z-index: 5;
          opacity: 0; /* 起始为透明，通过动画控制可见性 */
          will-change: transform, opacity; /* 提高动画性能 */
        }
        
        .dynamic-heart {
          position: absolute;
          animation: float-heart 5s forwards ease-out;
          z-index: 10;
          text-shadow: 0 0 10px rgba(255, 192, 203, 0.5);
        }
        
        .auto-heart {
          position: absolute;
          animation: float-up 10s forwards ease-out;
          z-index: 8;
          text-shadow: 0 0 10px rgba(255, 192, 203, 0.5);
          opacity: 0; /* 初始为透明，由动画控制 */
        }
      `}</style>
    </div>
  )
}
