'use client'

import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface DashboardClientProps {
    user: User
    profile: any // Replace with proper profile type
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
            {/* Header Section */}
            <section className="py-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl text-gray-800 font-light mb-4">
                            Bem-vindo ao seu
                            <span className="block mt-2 text-rose-600">Painel de Controle</span>
                        </h1>
                        <div className="w-24 h-1 bg-rose-600 mx-auto mt-8 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Dashboard Grid */}
            <section className="px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Quick Actions Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ações Rápidas</h2>
                            <div className="space-y-4">
                                <Link
                                    href="/dashboard/guests"
                                    className="block w-full text-center bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
                                >
                                    Gerenciar Convidados
                                </Link>
                                <Link
                                    href="/dashboard/registry"
                                    className="block w-full text-center bg-white border-2 border-rose-600 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full transition-all transform hover:scale-105"
                                >
                                    Lista de Presentes
                                </Link>
                            </div>
                        </motion.div>

                        {/* Wedding Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Detalhes do Casamento</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Data</span>
                                    <span className="text-gray-800 font-medium">12 de Dezembro, 2024</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Local</span>
                                    <span className="text-gray-800 font-medium">Jardim Botânico</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Convidados Confirmados</span>
                                    <span className="text-gray-800 font-medium">42/150</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Progresso</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Planejamento</span>
                                        <span className="text-rose-600">75%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-rose-600 h-2 rounded-full" style={{ width: '75%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Confirmações</span>
                                        <span className="text-rose-600">28%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-rose-600 h-2 rounded-full" style={{ width: '28%' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tasks Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Próximas Tarefas</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-rose-600 rounded-full mr-3" />
                                    <span className="text-gray-600">Confirmar menu com o buffet</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-rose-600 rounded-full mr-3" />
                                    <span className="text-gray-600">Agendar prova do vestido</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-rose-600 rounded-full mr-3" />
                                    <span className="text-gray-600">Enviar save the dates</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
} 