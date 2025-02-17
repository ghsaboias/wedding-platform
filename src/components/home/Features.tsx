'use client'

import { motion } from "framer-motion";

export interface Feature {
    text: string;
}

export interface FeatureGroup {
    title: string;
    icon: React.ReactNode;
    features: Feature[];
    animationDirection: 'left' | 'right';
}

export interface FeaturesProps {
    title: string;
    subtitle: string;
    groups: FeatureGroup[];
}

export default function Features({ title, subtitle, groups }: FeaturesProps) {
    return (
        <section id="features" className="py-32 px-4 bg-gradient-to-br from-timberwolf via-malta to-hillary">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
            >
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl text-dune font-light"
                    >
                        {title}
                        <span className="block mt-2 text-shadow">{subtitle}</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-shadow mx-auto mt-8 rounded-full"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {groups.map((group, groupIndex) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, x: group.animationDirection === 'left' ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-timberwolf/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
                        >
                            <div className="flex items-center mb-8">
                                <span className="w-12 h-12 bg-shadow/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-shadow/20 transition-colors">
                                    {group.icon}
                                </span>
                                <h3 className="text-2xl text-dune font-semibold">{group.title}</h3>
                            </div>
                            <ul className="space-y-6">
                                {group.features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: group.animationDirection === 'left' ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start group"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-shadow/10 flex items-center justify-center mr-3 group-hover:bg-shadow/20 transition-colors">
                                            <svg className="w-4 h-4 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-dune group-hover:text-shadow transition-colors font-medium">{feature.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
} 