'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { HomeIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
// interface DashboardClientProps {
//     user: User
//     profile: any // Replace with proper profile type
// }

interface WeddingInfo {
    wedding_date: string | null
    venue_name: string | null
    venue_address: string | null
    ceremony_time: string | null
    reception_time: string | null
    story: string | null
}

interface Guest {
    id: string
    couple_id: string
    name: string
    email?: string | null
    phone?: string | null
    status: 'PENDING' | 'CONFIRMED' | 'DECLINED'
    number_of_companions: number
    dietary_restrictions?: string | null
    notes?: string | null
    created_at: string
    updated_at: string
}

export default function DashboardClient() {
    const { user } = useAuth()
    const supabase = createClient()
    const router = useRouter()
    const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>({
        wedding_date: null,
        venue_name: null,
        venue_address: null,
        ceremony_time: null,
        reception_time: null,
        story: null
    })
    const [guests, setGuests] = useState<Guest[]>([])
    const [loading, setLoading] = useState(true)

    const getWeddingInfoAndGuests = useCallback(async () => {
        try {
            if (!user) return

            const [weddingResult, guestsResult] = await Promise.all([
                supabase
                    .from('wedding_info')
                    .select('*')
                    .match({ id: user.id })
                    .maybeSingle(),
                supabase
                    .from('guests')
                    .select('*')
                    .eq('couple_id', user.id)
            ])

            if (weddingResult.error && weddingResult.error.code !== 'PGRST116') {
                throw weddingResult.error
            }

            if (guestsResult.error) {
                throw guestsResult.error
            }

            if (weddingResult.data) setWeddingInfo(weddingResult.data)
            if (guestsResult.data) setGuests(guestsResult.data)
        } catch (error) {
            console.error('Error loading data:', error)
            toast.error('Erro ao carregar informações')
        } finally {
            setLoading(false)
        }
    }, [supabase, user])

    useEffect(() => {
        getWeddingInfoAndGuests()
    }, [getWeddingInfoAndGuests])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const handleCopyLink = async () => {
        if (!user?.id) return
        const link = `${window.location.origin}/couple/${user.id}`
        await navigator.clipboard.writeText(link)
        toast.success('Link copiado para a área de transferência!')
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
                                    href="/profile"
                                    className="group flex items-center justify-between bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-all transform hover:scale-102 hover:shadow-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Informações do Casal</span>
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

            {/* Share Registry Section */}
            <section className="relative px-4 mb-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <h2 className="text-xl sm:text-2xl font-semibold text-dune mb-2 sm:mb-4">Compartilhe sua Página do Casal</h2>
                        <p className="text-sm sm:text-base text-dune/70 mb-4 sm:mb-6">Compartilhe o link abaixo com seus convidados para que eles possam acessar todas as informações do seu casamento.</p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <div className="flex-1 bg-malta/10 p-3 sm:p-4 rounded-lg text-dune/80 font-mono text-xs sm:text-sm break-all sm:truncate">
                                {`${process.env.NEXT_PUBLIC_APP_URL}/couple/${user?.id}`}
                            </div>
                            <Button
                                onClick={handleCopyLink}
                                className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 sm:w-auto"
                            >
                                Copiar Link
                            </Button>
                            <Link
                                href={`/couple/${user?.id}`}
                                target="_blank"
                            >
                                <Button
                                    className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 sm:w-auto"
                                >
                                    Ver Página do Casal
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dashboard Grid */}
            <section className="relative z-10 px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <span className="text-dune font-medium">
                                        {weddingInfo.wedding_date
                                            ? format(parseISO(weddingInfo.wedding_date), "d 'de' MMMM, yyyy", { locale: ptBR })
                                            : 'Não definida'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-dune/80">Local</span>
                                    <span className="text-dune font-medium">
                                        {weddingInfo.venue_name || 'Não definido'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-dune/80">Convidados Confirmados</span>
                                    <span className="text-dune font-medium">
                                        {guests.filter(g => g.status === 'CONFIRMED').reduce((acc, guest) => acc + 1 + guest.number_of_companions, 0)}/
                                        {guests.reduce((acc, guest) => acc + 1 + guest.number_of_companions, 0)}
                                    </span>
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