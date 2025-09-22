import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cognetex - AI Development & Full Stack Solutions',
    short_name: 'Cognetex',
    description: 'Transform your business with cutting-edge AI, machine learning, and full-stack development solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#fb923c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
