'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

interface PaymentLinkButtonProps {
    amount: number
    name?: string
    className?: string
    children?: React.ReactNode
    metadata?: Record<string, string>
}

export function PaymentLinkButton({
    amount,
    name,
    className,
    children,
    metadata
}: PaymentLinkButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handlePayment = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/create-payment-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, name, metadata }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create payment link')
            }

            // Redirect to the payment link
            window.location.href = data.url
        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Failed to create payment link. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handlePayment}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? 'Loading...' : children || 'Pay Now'}
        </Button>
    )
} 