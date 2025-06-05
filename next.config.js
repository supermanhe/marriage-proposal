/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出，适合Netlify部署
  images: {
    unoptimized: true, // 确保静态导出时图片正常工作
  },
  // 确保在Netlify上也能正确加载静态资源
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
}

module.exports = nextConfig
