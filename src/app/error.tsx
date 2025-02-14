'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    const router = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Caught a global error:", error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-4xl font-bold">Oops! Algo deu errado.</h1>
            <h2 className="text-2xl font-bold">Que tal tentar novamente?</h2>
            <Button onClick={() => reset()}>Tentar novamente</Button>
            <p className="text-gray-500">{error.message}</p>
            <Button variant="outline" onClick={() => router.push("/")}>
                Voltar para a página inicial
            </Button>
        </div>
    )
} 