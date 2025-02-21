'use client'

import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'

function LoginContent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        const message = searchParams.get('message')
        if (message) {
            setSuccessMessage(message)
        }
    }, [searchParams])

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    throw new Error('Email ou senha incorretos')
                }
                throw error
            }

            router.refresh()
            router.push('/dashboard')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Ocorreu um erro ao fazer login')
            toast.error(error instanceof Error ? error.message : 'Ocorreu um erro ao fazer login')
        } finally {
            setLoading(false)
        }
    }

    const handleSignInWithGoogle = async () => {
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            })

            if (error) {
                throw error
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro ao fazer login com Google')
            toast.error(error instanceof Error ? error.message : 'Erro ao fazer login com Google')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-shadow/5 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4">
                <Link href="/" className="flex items-center text-shadow hover:text-dune transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </Link>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-center py-2 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-shadow/10"
                >
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-2 text-center text-3xl font-light text-dune"
                        >
                            Bem-vindo de volta
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 text-center text-sm text-shadow"
                        >
                            Faça login para continuar planejando seu casamento perfeito
                        </motion.p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="rounded-md bg-red-50 p-4"
                            >
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="rounded-md bg-green-50 p-4"
                            >
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">{successMessage}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-dune">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="mt-1 block w-full rounded-md border-shadow/20 shadow-sm focus:border-malta focus:ring-malta sm:text-sm transition-colors bg-white/80"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-dune">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-1 block w-full rounded-md border-shadow/20 shadow-sm focus:border-malta focus:ring-malta sm:text-sm transition-colors bg-white/80"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-md bg-malta py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-malta/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-malta transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-shadow/20" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white/90 px-2 text-shadow">Ou continue com</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={handleSignInWithGoogle}
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-3 rounded-md border border-shadow/20 bg-white px-3 py-2 text-sm font-semibold text-dune shadow-sm hover:bg-hillary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-malta disabled:opacity-50 transition-colors"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Entrar com Google
                            </motion.button>
                        </div>
                    </div>
                    <div className="text-sm text-center">
                        <Link
                            href="/signup"
                            className="font-medium text-shadow hover:text-dune transition-colors"
                        >
                            Ainda não tem uma conta? Faça cadastro
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30 flex items-center justify-center">
                <div className="text-malta">Loading...</div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    )
}   