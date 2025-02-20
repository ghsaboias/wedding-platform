'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, HomeIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Profile {
    full_name?: string
    username?: string
    avatar_url?: string
    updated_at?: string
}

interface WeddingInfo {
    wedding_date: string | null
    venue_name: string | null
    venue_address: string | null
    ceremony_time: string | null
    reception_time: string | null
    story: string | null
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile>({})
    const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>({
        wedding_date: null,
        venue_name: null,
        venue_address: null,
        ceremony_time: null,
        reception_time: null,
        story: null
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const supabase = createClient()
    const router = useRouter()

    const getProfileAndWeddingInfo = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
                return
            }

            // Fetch profile data
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (profileError && profileError.code !== 'PGRST116') {
                throw profileError
            }

            // Fetch wedding info
            const { data: weddingData, error: weddingError } = await supabase
                .from('wedding_info')
                .select('*')
                .eq('id', user.id)
                .single()

            if (weddingError && weddingError.code !== 'PGRST116') {
                throw weddingError
            }

            if (profileData) setProfile(profileData)
            if (weddingData) setWeddingInfo(weddingData)
        } catch (error) {
            console.error('Error loading data:', error)
            toast.error(error instanceof Error ? error.message : 'Erro ao carregar informações')
        } finally {
            setLoading(false)
        }
    }, [supabase, router])

    useEffect(() => {
        getProfileAndWeddingInfo()
    }, [getProfileAndWeddingInfo])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Usuário não autenticado')

            // Update profile
            const profileUpdates = {
                id: user.id,
                full_name: profile.full_name,
                username: profile.username,
                updated_at: new Date().toISOString(),
            }

            const { error: profileError } = await supabase
                .from('profiles')
                .upsert(profileUpdates)

            if (profileError) {
                if (profileError.code === '23505') {
                    throw new Error('Este nome de usuário já está em uso')
                }
                throw profileError
            }

            // Update wedding info
            const weddingUpdates = {
                id: user.id,
                ...weddingInfo,
                wedding_date: weddingInfo.wedding_date ? new Date(weddingInfo.wedding_date).toISOString() : null,
            }

            const { error: weddingError } = await supabase
                .from('wedding_info')
                .upsert(weddingUpdates)

            if (weddingError) throw weddingError

            toast.success('Informações atualizadas com sucesso!')
            setMessage({ type: 'success', text: 'Informações atualizadas com sucesso!' })
            router.refresh()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar informações'
            setMessage({ type: 'error', text: errorMessage })
            toast.error(errorMessage)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30 flex items-center justify-center">
                <div className="text-dune">Carregando...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-shadow/5 via-transparent to-transparent"></div>

            {/* Navigation Header */}
            <header className="relative z-10 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/dashboard" className="flex items-center space-x-2 text-dune hover:text-shadow transition-colors">
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span>Voltar ao Painel de Controle</span>
                        </Link>
                        <Link href="/" className="flex items-center space-x-2 text-dune hover:text-shadow transition-colors">
                            <HomeIcon className="w-5 h-5" />
                            <span>Início</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="relative z-10 px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl text-dune font-light">
                                Informações do
                                <span className="block mt-2 text-shadow">Casal</span>
                            </h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-24 h-1 bg-shadow mx-auto mt-8 rounded-full"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Profile Information Section */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-dune">Informações Pessoais</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="full_name">Nome Completo</Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            value={profile.full_name || ''}
                                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                            className="mt-1 block w-full rounded-xl border-0 p-3 text-dune bg-malta/10 placeholder:text-dune/40 focus:ring-2 focus:ring-shadow transition-all"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="username">Nome de Usuário</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            value={profile.username || ''}
                                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                            className="mt-1 block w-full rounded-xl border-0 p-3 text-dune bg-malta/10 placeholder:text-dune/40 focus:ring-2 focus:ring-shadow transition-all"
                                            placeholder="Seu nome de usuário"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Wedding Information Section */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-dune">Informações do Casamento</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="wedding_date">Data do Casamento</Label>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Input
                                                id="wedding_date"
                                                type="date"
                                                value={weddingInfo.wedding_date ? format(new Date(weddingInfo.wedding_date), 'yyyy-MM-dd') : ''}
                                                onChange={(e) => setWeddingInfo({ ...weddingInfo, wedding_date: e.target.value })}
                                                className="sm:w-48 text-dune bg-malta/10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="venue_name">Local do Casamento</Label>
                                        <Input
                                            id="venue_name"
                                            value={weddingInfo.venue_name || ''}
                                            onChange={(e) => setWeddingInfo({ ...weddingInfo, venue_name: e.target.value })}
                                            placeholder="Nome do local"
                                            className="text-dune bg-malta/10 placeholder:text-dune/40"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="venue_address">Endereço</Label>
                                        <Input
                                            id="venue_address"
                                            value={weddingInfo.venue_address || ''}
                                            onChange={(e) => setWeddingInfo({ ...weddingInfo, venue_address: e.target.value })}
                                            placeholder="Endereço completo"
                                            className="text-dune bg-malta/10 placeholder:text-dune/40"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="ceremony_time">Horário da Cerimônia</Label>
                                            <Input
                                                id="ceremony_time"
                                                type="time"
                                                value={weddingInfo.ceremony_time || ''}
                                                onChange={(e) => setWeddingInfo({ ...weddingInfo, ceremony_time: e.target.value })}
                                                className="text-dune bg-malta/10"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="reception_time">Horário da Recepção</Label>
                                            <Input
                                                id="reception_time"
                                                type="time"
                                                value={weddingInfo.reception_time || ''}
                                                onChange={(e) => setWeddingInfo({ ...weddingInfo, reception_time: e.target.value })}
                                                className="text-dune bg-malta/10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="story">Nossa História</Label>
                                        <Textarea
                                            id="story"
                                            value={weddingInfo.story || ''}
                                            onChange={(e) => setWeddingInfo({ ...weddingInfo, story: e.target.value })}
                                            placeholder="Compartilhe sua história de amor com seus convidados..."
                                            className="h-32 text-dune bg-malta/10 placeholder:text-dune/40"
                                        />
                                    </div>
                                </div>
                            </div>

                            {message && (
                                <div className={`text-sm text-center p-3 rounded-lg ${message.type === 'success'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full bg-shadow hover:bg-dune text-white p-3 rounded-xl font-medium transition-all transform hover:scale-102 hover:shadow-lg shadow-lg shadow-shadow/20"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Salvando...
                                        </>
                                    ) : (
                                        'Salvar Alterações'
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={() => router.push('/update-password')}
                                    variant="outline"
                                    className="w-full bg-white/50 hover:bg-white/70 text-dune p-3 rounded-xl font-medium transition-all transform hover:scale-102 hover:shadow-lg"
                                >
                                    Alterar Senha
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 