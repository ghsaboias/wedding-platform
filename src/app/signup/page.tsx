'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signup } from '../login/actions'

export default function SignUpPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            await signup(formData)
        } catch (error) {
            setError(`An error occurred during sign up: ${error}`)
        } finally {
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
                    {user ? (
                        <div className="text-center space-y-6">
                            <h2 className="text-3xl font-light text-dune">Você já tem uma conta</h2>
                            <p className="text-shadow">Você já está logado no sistema.</p>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => router.push('/dashboard')}
                                className="w-full justify-center rounded-md bg-malta py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-malta/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-malta transition-colors"
                            >
                                Ir para o Dashboard
                            </motion.button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-2 text-center text-3xl font-light text-dune"
                                >
                                    Crie sua conta
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-2 text-center text-sm text-shadow"
                                >
                                    Junte-se a nós para começar a planejar seu casamento perfeito
                                </motion.p>
                            </div>

                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                                            autoComplete="new-password"
                                            required
                                            className="mt-1 block w-full rounded-md border-shadow/20 shadow-sm focus:border-malta focus:ring-malta sm:text-sm transition-colors bg-white/80"
                                            placeholder="••••••••"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-dune">
                                            Confirmar senha
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            className="mt-1 block w-full rounded-md border-shadow/20 shadow-sm focus:border-malta focus:ring-malta sm:text-sm transition-colors bg-white/80"
                                            placeholder="••••••••"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

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

                                <div>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        disabled={loading}
                                        className="group relative flex w-full justify-center rounded-md bg-malta py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-malta/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-malta transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Criando conta...' : 'Criar conta'}
                                    </motion.button>
                                </div>
                            </form>

                            <div className="text-sm text-center">
                                <Link
                                    href="/login"
                                    className="font-medium text-shadow hover:text-dune transition-colors"
                                >
                                    Já tem uma conta? Faça login
                                </Link>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    )
} 