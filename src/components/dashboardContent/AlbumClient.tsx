'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion';

const albums = [
    {
        year: '2025',
        title: 'Piano Competition',
        images: [
            '/album/2025/4.jpg',
            '/album/2025/2.jpg',
            '/album/2025/3.jpg',
            '/album/2025/1.jpg',
            '/album/2025/5.jpg',
            '/album/2025/6.jpg',
            '/album/2025/8.jpg',
            '/album/2025/9.jpg',
        ],
    },
    {
        year: '2024',
        title: 'Piano Competition',
        images: [
            '/album/2024/6.jpg',
            '/album/2024/2.jpg',
            '/album/2024/3.jpg',
            '/album/2024/4.jpg',
            '/album/2024/5.jpg',
            '/album/2024/1.jpg',
            '/album/2024/7.jpg',
            '/album/2024/8.jpg',
        ],
    },
    {
        year: '2023',
        title: 'Piano Competition',
        images: [
            '/album/2023/2.jpg',
            '/album/2023/1.jpg',
            '/album/2023/3.jpg',
            '/album/2023/4.jpg',
        ],
    },
];

export default function AlbumClient() {
    const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState(0); // 1: next, -1: prev

    // Hiệu ứng thanh timeline chạy dọc theo tiến trình cuộn trang
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const closeModal = () => {
        setSelectedAlbum(null);
        setCurrentImage(0);
    };

    const openAlbum = (index: number) => {
        setSelectedAlbum(index);
        setCurrentImage(0);
    };

    const nextImage = () => {
        if (selectedAlbum === null) return;
        setDirection(1);
        const images = albums[selectedAlbum].images;
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (selectedAlbum === null) return;
        setDirection(-1);
        const images = albums[selectedAlbum].images;
        setCurrentImage(
            (prev) => (prev - 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedAlbum === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedAlbum, currentImage]);

    // Biến cấu hình hiệu ứng slider ảnh
    const sliderVariants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.4
            }
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        })
    };

    return (
        <>
            <div className="bg-black text-white overflow-x-hidden">

                {/* HERO SECTION với hiệu ứng Fade-in-up */}
                <section className="h-screen flex items-center justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <h1 className="text-7xl md:text-9xl font-extralight tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            PIANO
                        </h1>

                        <h2 className="text-5xl md:text-7xl font-thin mt-6 tracking-wide">
                            COMPETITION
                        </h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mt-10 uppercase tracking-[0.4em] text-sm"
                        >
                            Timeline Gallery
                        </motion.div>
                    </motion.div>
                </section>

                {/* TIMELINE SECTION */}
                <div className="relative">
                    {/* Đường Line Timeline chạy mượt theo cuộn chuột */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white via-white/50 to-transparent -translate-x-1/2 origin-top"
                        style={{ scaleY }}
                    />

                    {albums.map((album, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <section
                                key={album.year}
                                className="relative min-h-screen flex items-center py-20 lg:py-0"
                            >
                                {/* Nút tròn phát sáng trên Timeline */}
                                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, margin: "-20%" }}
                                        className="h-5 w-5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                    />
                                </div>

                                <div
                                    className={`w-full grid lg:grid-cols-2 gap-10 lg:gap-20 items-center px-8 lg:px-24 ${
                                        !isEven ? 'lg:[&>*:first-child]:order-2' : ''
                                    }`}
                                >
                                    {/* KHỐI ẢNH (Đã thu nhỏ kích thước) */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-15%" }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full flex justify-center" // Căn giữa khung ảnh
                                    >
                                        <div
                                            onClick={() => openAlbum(idx)}
                                            className="relative w-full max-w-[450px] h-[45vh] lg:h-[55vh] rounded-[24px] lg:rounded-[32px] overflow-hidden cursor-pointer group shadow-2xl border border-white/5"
                                        >
                                            <Image
                                                src={album.images[0]}
                                                alt={album.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />

                                            <div className="absolute bottom-6 left-6 backdrop-blur-md bg-black/40 px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="text-xs text-white/90 font-light tracking-wider">
                                                    {album.images.length} PHOTOS →
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* KHỐI NỘI DUNG */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-15%" }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                        className="flex flex-col justify-center"
                                    >
                                        <div className="text-white/10 text-8xl md:text-[10rem] font-thin font-serif leading-none select-none">
                                            {album.year}
                                        </div>

                                        <h2 className="mt-2 text-4xl lg:text-5xl font-light tracking-wide">
                                            {album.title}
                                        </h2>

                                        {/* Bạn có thể thêm lại thẻ p miêu tả ở đây nếu cần */}

                                        <div>
                                            <button
                                                onClick={() => openAlbum(idx)}
                                                className="mt-10 px-8 py-3.5 rounded-full border border-white/20 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform active:scale-95"
                                            >
                                                View Gallery
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>

            {/* FULLSCREEN GALLERY MODAL với AnimatePresence */}
            <AnimatePresence>
                {selectedAlbum !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center select-none"
                    >
                        {/* Lớp nền click để đóng */}
                        <div className="absolute inset-0" onClick={closeModal} />

                        {/* NÚT ĐÓNG */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-20 h-12 w-12 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* ĐIỀU HƯỚNG TRÁI */}
                        <button
                            onClick={prevImage}
                            className="absolute left-6 z-20 h-14 w-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all active:scale-90"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        {/* KHU VỰC HIỂN THỊ ẢNH (Có hiệu ứng Slide mượt) */}
                        <div className="relative w-full h-full max-w-[85vw] max-h-[80vh] flex items-center justify-center overflow-hidden">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={currentImage}
                                    custom={direction}
                                    variants={sliderVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute w-full h-full item-center justify-center flex"
                                >
                                    <Image
                                        src={albums[selectedAlbum].images[currentImage]}
                                        alt=""
                                        fill
                                        priority
                                        className="object-contain pointer-events-none"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ĐIỀU HƯỚNG PHẢI */}
                        <button
                            onClick={nextImage}
                            className="absolute right-6 z-20 h-14 w-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all active:scale-90"
                        >
                            <ChevronRight size={28} />
                        </button>

                        {/* THÔNG TIN & DOTS PHÍA DƯỚI */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-20">
                            <div className="text-xs tracking-widest text-white/40 uppercase">
                                {currentImage + 1} / {albums[selectedAlbum].images.length}
                            </div>

                            <div className="mt-4 flex gap-2.5 justify-center items-center">
                                {albums[selectedAlbum].images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > currentImage ? 1 : -1);
                                            setCurrentImage(idx);
                                        }}
                                        className="relative p-1 focus:outline-none"
                                    >
                                        <motion.div 
                                            className="h-1.5 rounded-full bg-white"
                                            animate={{
                                                width: idx === currentImage ? 28 : 6,
                                                opacity: idx === currentImage ? 1 : 0.25
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}