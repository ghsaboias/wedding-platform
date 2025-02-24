'use client'

import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ThankYouPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const coupleId = searchParams.get('coupleId')

    const handleReturn = () => {
        if (coupleId) {
            router.push(`/couple/${coupleId}`)
        } else {
            router.back()
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Obrigado!</h1>
                    <p className="text-xl text-muted-foreground">
                        Seu presente foi registrado com sucesso. Os noivos serão notificados da sua contribuição.
                    </p>
                </div>

                <Button
                    onClick={handleReturn}
                    className="w-full"
                >
                    Voltar para a página do casal
                </Button>
            </div>
        </div>
    )
} 