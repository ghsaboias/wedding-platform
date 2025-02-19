'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { HomeIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// interface DashboardClientProps {
//     user: User
//     profile: any // Replace with proper profile type
// }

export default function DashboardClient() {
    const { user } = useAuth()
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-shadow/5 via-transparent to-transparent"></div>

            {/* Navigation Header */}
            <header className="relative z-10 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center space-x-2 text-dune hover:text-shadow transition-colors">
                            <HomeIcon className="w-5 h-5" />
                            <span>Início</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <span className="text-dune">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-1 text-dune hover:text-shadow transition-colors"
                            >
                                <span>Sair</span>
                                <LogOutIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Header Section */}
            <section className="relative pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl text-dune font-light mb-4">
                            Bem-vindo ao seu
                            <span className="block mt-2 text-shadow">Painel de Controle</span>
                        </h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="w-24 h-1 bg-shadow mx-auto mt-8 rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Control Panel Section */}
            <section className="relative px-4 mb-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-shadow/90 to-dune/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-semibold text-white mb-2">Painel de Controle</h2>
                            <p className="text-malta/80 mb-6">Acesso rápido às principais funcionalidades</p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Link
                                    href="/dashboard/guests"
                                    className="group flex items-center justify-between bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-all transform hover:scale-102 hover:shadow-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Gerenciar Convidados</span>
                                    </div>
                                    <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/dashboard/registry"
                                    className="group flex items-center justify-between bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-all transform hover:scale-102 hover:shadow-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Lista de Presentes</span>
                                    </div>
                                    <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/dashboard/settings"
                                    className="group flex items-center justify-between bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-all transform hover:scale-102 hover:shadow-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Configurações</span>
                                    </div>
                                    <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dashboard Grid */}
            <section className="relative z-10 px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Wedding Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-dune mb-6">Detalhes do Casamento</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-dune/80">Data</span>
                                    <span className="text-dune font-medium">12 de Dezembro, 2024</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-dune/80">Local</span>
                                    <span className="text-dune font-medium">Jardim Botânico</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-dune/80">Convidados Confirmados</span>
                                    <span className="text-dune font-medium">42/150</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-dune mb-6">Progresso</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-dune/80">Planejamento</span>
                                        <span className="text-shadow">75%</span>
                                    </div>
                                    <div className="w-full bg-malta/20 rounded-full h-2">
                                        <div className="bg-shadow h-2 rounded-full" style={{ width: '75%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-dune/80">Confirmações</span>
                                        <span className="text-shadow">28%</span>
                                    </div>
                                    <div className="w-full bg-malta/20 rounded-full h-2">
                                        <div className="bg-shadow h-2 rounded-full" style={{ width: '28%' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tasks Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-dune mb-6">Próximas Tarefas</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-shadow rounded-full mr-3" />
                                    <span className="text-dune/80">Confirmar menu com o buffet</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-shadow rounded-full mr-3" />
                                    <span className="text-dune/80">Agendar prova do vestido</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-shadow rounded-full mr-3" />
                                    <span className="text-dune/80">Enviar save the dates</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
} 