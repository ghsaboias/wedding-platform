'use client'

import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GiftWithCategoryAndContributions } from '@/types/registry'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { toast } from 'sonner'

interface ContributionDialogProps {
    gift: GiftWithCategoryAndContributions
    onContribute: () => void
}

export default function ContributionDialog({ gift, onContribute }: ContributionDialogProps) {
    const supabase = createClient()
    const [amount, setAmount] = useState(gift.suggested_contribution?.toString() || '')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const contributionAmount = parseFloat(amount)

        if (isNaN(contributionAmount) || contributionAmount <= 0) {
            toast.error('Por favor, insira um valor válido')
            return
        }

        if (contributionAmount > gift.total_price - gift.current_contributions) {
            toast.error('O valor excede o restante necessário')
            return
        }

        setLoading(true)
        try {
            const { error } = await supabase
                .from('contributions')
                .insert({
                    gift_id: gift.id,
                    amount: contributionAmount,
                    contributor_name: name.trim(),
                    contributor_email: email.trim(),
                    message: message.trim() || null
                })

            if (error) throw error

            // Update gift current_contributions
            const { error: updateError } = await supabase
                .from('gifts')
                .update({
                    current_contributions: gift.current_contributions + contributionAmount
                })
                .eq('id', gift.id)

            if (updateError) throw updateError

            toast.success('Contribuição realizada com sucesso!')
            onContribute()
        } catch (error) {
            console.error('Error contributing:', error)
            toast.error('Erro ao realizar contribuição')
        } finally {
            setLoading(false)
        }
    }

    const remainingAmount = gift.total_price - gift.current_contributions

    return (
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle className="text-2xl font-light text-gray-900">
                    {gift.is_group_gift ? 'Contribuir para o Presente' : 'Presentear'}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    {gift.is_group_gift
                        ? 'Contribua com o valor que desejar para este presente.'
                        : 'Presenteie este item.'}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label className="text-gray-700">Informações do Presente</Label>
                    <div className="text-sm text-dune/70 space-y-1">
                        <p>Valor total: R$ {gift.total_price.toFixed(2)}</p>
                        <p>Valor arrecadado: R$ {gift.current_contributions.toFixed(2)}</p>
                        <p>Valor restante: R$ {remainingAmount.toFixed(2)}</p>
                        {gift.suggested_contribution && (
                            <p>Sugestão de contribuição: R$ {gift.suggested_contribution.toFixed(2)}</p>
                        )}
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-gray-700">Valor da Contribuição*</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        max={remainingAmount}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Valor da sua contribuição"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name" className="text-gray-700">Seu Nome*</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-700">Seu Email*</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message" className="text-gray-700">Mensagem (opcional)</Label>
                    <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Deixe uma mensagem para os noivos"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                    />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onContribute()}
                        className="border-gray-200 hover:bg-gray-100 text-white"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                    >
                        {loading ? 'Contribuindo...' : 'Contribuir'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    )
} 