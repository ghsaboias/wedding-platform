'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Contribuir para o Presente</DialogTitle>
                <DialogDescription>
                    {gift.is_group_gift
                        ? 'Contribua com o valor que desejar para este presente.'
                        : 'Presenteie este item.'}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label>Informações do Presente</Label>
                    <div className="text-sm text-gray-500">
                        <p>Valor total: R$ {gift.total_price.toFixed(2)}</p>
                        <p>Valor arrecadado: R$ {gift.current_contributions.toFixed(2)}</p>
                        <p>Valor restante: R$ {remainingAmount.toFixed(2)}</p>
                        {gift.suggested_contribution && (
                            <p>Sugestão de contribuição: R$ {gift.suggested_contribution.toFixed(2)}</p>
                        )}
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amount">Valor da Contribuição*</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        max={remainingAmount}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Valor da sua contribuição"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Seu Nome*</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Seu Email*</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Deixe uma mensagem para os noivos"
                    />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Contribuindo...' : 'Contribuir'}
                        </Button>
                    </DialogClose>
                </div>
            </form>
        </DialogContent>
    )
} 