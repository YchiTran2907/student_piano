import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Ichi's Piano",
        short_name: "Ichi Piano",
        description: "Quản lý học tập, tiến độ, lịch học và thành tích học viên piano",

        start_url: '/',
        display: 'standalone',

        background_color: '#f8fafc',
        theme_color: '#8b5cf6',

        icons: [
            {
                src: '/icons/ichi-piano.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/ichi-piano.png',
                sizes: '512x512',
                type: 'image/png',
            }
        ]
    }
}