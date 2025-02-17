'use client'

import { motion } from "framer-motion";
import Link from "next/link";

export interface TrustIndicator {
    icon: React.ReactNode;
    title: string;
}

export interface CallToActionProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    trustIndicators: TrustIndicator[];
}

export default function CallToAction({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    trustIndicators
}: CallToActionProps) {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-timberwolf via-malta to-timberwolf">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.6, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-hillary/40 via-transparent to-transparent"
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative max-w-4xl mx-auto text-center px-4"
            >
                <h2 className="text-4xl md:text-5xl mb-8 text-dune font-light">
                    {title}
                    <span className="block mt-2 text-shadow font-medium">{subtitle}</span>
                </h2>
                <p className="text-xl text-pine-cone mb-12 max-w-2xl mx-auto">
                    {description}
                </p>
                <div className="space-y-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href={ctaLink}
                            className="inline-block bg-shadow hover:bg-pine-cone text-timberwolf px-12 py-4 rounded-full transition-colors shadow-lg text-lg font-medium hover:shadow-xl hover:shadow-pine-cone/20"
                        >
                            {ctaText}
                        </Link>
                    </motion.div>
                    <p className="text-sm text-pine-cone">
                        Grátis para começar • Nenhum cartão de crédito necessário
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {trustIndicators.map((indicator, index) => (
                        <div key={index} className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {indicator.icon}
                                <h3 className="font-semibold text-dune">{indicator.title}</h3>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
} 