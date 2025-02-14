'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ErrorPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-4xl font-bold">Oops! Algo deu errado.</h1>
            <h2 className="text-2xl font-bold">Que tal tentar novamente?</h2>
            <Button onClick={() => router.push('/dashboard')}>Tentar novamente</Button>
            <p className="text-gray-500">Desculpe, mas ocorreu um erro ao carregar esta página.</p>
            <Link href="/" className="text-blue-500 hover:text-blue-600">Voltar para a página inicial</Link>
        </div>
    )
}