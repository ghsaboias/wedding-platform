'use client'

import { useAuth } from '@/components/providers/AuthProvider';
import { motion } from "framer-motion";
import Link from "next/link";

export interface HeroStat {
    value: string;
    label: string;
}

export interface HeroProps {
    title: string;
    subtitle: string;
    stats: HeroStat[];
}

export default function Hero({ title, subtitle, stats }: HeroProps) {
    const { user } = useAuth();

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center px-4">
            <div className="absolute inset-0 z-0">
                <video autoPlay muted loop className="object-cover w-full h-full z-[-1]">
                    <source src="/wedding_table.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-dune/60 via-dune/30 to-dune/70"></div>
                <div className="absolute inset-0 backdrop-blur-[4px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-shadow/20 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto mt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-7xl font-light mb-6 tracking-tight"
                >
                    <span className="block text-timberwolf font-semibold tracking-normal drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] text-shadow-lg">{title}</span>
                    <span className="block text-timberwolf mt-2 font-semibold tracking-normal drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] text-shadow-lg">{subtitle}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto text-timberwolf drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                >
                    Prepare seu evento com facilidade e segurança
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center h-14"
                >
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="h-14 flex items-center justify-center bg-shadow hover:bg-pine-cone text-timberwolf px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg font-medium hover:shadow-xl hover:shadow-pine-cone/20 backdrop-blur-sm"
                        >
                            Meu Evento
                        </Link>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/signup"
                                className="h-14 flex items-center justify-center bg-shadow hover:bg-pine-cone text-timberwolf px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg font-medium hover:shadow-xl hover:shadow-pine-cone/20 backdrop-blur-sm"
                            >
                                Começar Agora
                            </Link>
                            <Link
                                href="/login"
                                className="h-14 flex items-center justify-center bg-timberwolf/90 hover:bg-timberwolf text-dune px-10 rounded-full transition-all hover:scale-105 shadow-lg text-lg font-medium backdrop-blur-sm"
                            >
                                Fazer Login
                            </Link>
                        </div>
                    )}
                </motion.div>
                <div className="mt-16 flex items-center justify-center space-x-8">
                    {stats.map((stat) => (
                        <div key={stat.value} className="text-center">
                            <div>
                                <p className="text-3xl font-bold text-timberwolf drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">{stat.value}</p>
                                <p className="text-sm text-timberwolf/90 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 