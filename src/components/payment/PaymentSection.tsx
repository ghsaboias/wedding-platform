'use client'

import { PaymentLinkButton } from './PaymentLinkButton'

interface PaymentSectionProps {
    coupleId: string
}

export function PaymentSection({ coupleId }: PaymentSectionProps) {
    return (
        <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Lista de Presentes</h3>
            <div className="max-w-md mx-auto bg-pink-50 p-6 rounded-lg">
                <p className="text-gray-800 mb-4 text-center">
                    Contribua com um valor para ajudar os noivos a realizarem seus sonhos.
                </p>
                <PaymentLinkButton
                    amount={50}
                    name="Presente de Casamento - R$50"
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    metadata={{ coupleId }}
                >
                    Contribuir com R$50
                </PaymentLinkButton>
            </div>
        </div>
    )
} 