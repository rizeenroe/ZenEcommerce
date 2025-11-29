'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const billboardImages = [
        { src: '/billboard1.jpg', href: '/promo/1' },
        { src: '/billboard2.jpeg', href: '/promo/2' },
        { src: '/billboard3.jpg', href: '/promo/3' },
    ];

    const slideWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    const startAutoScroll = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (!scrollRef.current) return;
            const container = scrollRef.current;
            const maxScroll = slideWidth * (billboardImages.length - 1);
            const nextScroll =
                container.scrollLeft + slideWidth > maxScroll ? 0 : container.scrollLeft + slideWidth;
            container.scrollTo({ left: nextScroll, behavior: 'smooth' });
        }, 7000);
    };

    useEffect(() => {
        startAutoScroll();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const scrollToNext = () => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const maxScroll = slideWidth * (billboardImages.length - 1);
        const nextScroll =
            container.scrollLeft + slideWidth > maxScroll ? 0 : container.scrollLeft + slideWidth;
        container.scrollTo({ left: nextScroll, behavior: 'smooth' });
        startAutoScroll();
    };

    const scrollToPrev = () => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const prevScroll =
            container.scrollLeft - slideWidth < 0
                ? slideWidth * (billboardImages.length - 1)
                : container.scrollLeft - slideWidth;
        container.scrollTo({ left: prevScroll, behavior: 'smooth' });
        startAutoScroll();
    };

    return (
        <div className="space-y-10">
            {/* Billboard */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex overflow-hidden w-full h-[400px] rounded-md shadow-md select-none"
                >
                    {billboardImages.map(({ src, href }, idx) => (
                        <Link
                            key={idx}
                            href={href}
                            className="min-w-full relative flex-shrink-0 h-full"
                        >
                            <Image
                                src={src}
                                alt={`Billboard ${idx + 1}`}
                                fill
                                className="object-cover rounded-md"
                                priority={idx === 0}
                            />
                        </Link>
                    ))}
                </div>

                {/* Left Arrow */}
                <button
                onClick={scrollToPrev}
                className="absolute top-0 left-0 h-full px-4 flex items-center justify-center z-10 hover:bg-black/10 transition"
                >
                    <span className="text-white text-3xl">&lt;</span>
                </button>

                {/* Right Arrow */}
                <button
                onClick={scrollToNext}
                className="absolute top-0 right-0 h-full px-4 flex items-center justify-center z-10 hover:bg-black/10 transition"
                >
                    <span className="text-white text-3xl">&gt;</span>
                </button>
            </div>

            {/* Recommendations */}
            <div>
                <div className="bg-gray-100 p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Item A', 'Item B', 'Item C', 'Item D'].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white border rounded-md p-4 shadow hover:shadow-md transition"
                            >
                                <div className="h-24 bg-gray-200 mb-2 rounded" />
                                <p className="text-center">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Keep Shopping */}
            <div>
                <div className="bg-gray-100 p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Keep Shopping For</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Item A', 'Item B', 'Item C', 'Item D'].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white border rounded-md p-4 shadow hover:shadow-md transition"
                            >
                                <div className="h-24 bg-gray-200 mb-2 rounded" />
                                <p className="text-center">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}