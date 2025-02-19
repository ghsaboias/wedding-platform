'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GiftWithCategoryAndContributions } from '@/types/registry'
import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { ImageIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ContributionDialog from '../../dashboard/registry/contribution-dialog'

interface PublicRegistryClientProps {
    profile: User
    gifts: GiftWithCategoryAndContributions[]
}

export default function PublicRegistryClient({ profile, gifts }: PublicRegistryClientProps) {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedGift, setSelectedGift] = useState<GiftWithCategoryAndContributions | null>(null)

    const categories = Array.from(new Set(gifts.map(gift => gift.category?.name || 'others')))

    const filteredGifts = gifts.filter(gift => {
        const matchesSearch = gift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gift.description?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || gift.category?.name === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleContribution = () => {
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-malta/10">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-light text-gray-900 mb-4">
                            Lista de Presentes
                        </h1>
                        <p className="text-xl text-gray-600">
                            PLACEHOLDER
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Buscar presentes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as categorias</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {gifts.find(g => g.category?.name === category)?.category?.name || 'Outros'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Gift Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGifts.map((gift) => (
                        <motion.div
                            key={gift.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            {gift.image_url ? (
                                <Image
                                    src={gift.image_url}
                                    alt={gift.title}
                                    width={400}
                                    height={192}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{gift.title}</h3>
                                    {gift.category && (
                                        <span className="text-sm text-gray-500">{gift.category.name}</span>
                                    )}
                                </div>
                                {gift.description && (
                                    <p className="text-gray-600 mb-4">{gift.description}</p>
                                )}
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-900">
                                        R$ {gift.total_price.toFixed(2)}
                                    </div>
                                    {gift.is_group_gift && (
                                        <div className="text-sm text-gray-500">
                                            Sugestão: R$ {gift.suggested_contribution?.toFixed(2)}
                                        </div>
                                    )}
                                </div>
                                {gift.is_group_gift && (
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progresso</span>
                                            <span>{Math.round((gift.current_contributions / gift.total_price) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-shadow h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min(100, (gift.current_contributions / gift.total_price) * 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="w-full bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                                                onClick={() => setSelectedGift(gift)}
                                                disabled={gift.current_contributions >= gift.total_price}
                                            >
                                                {gift.current_contributions >= gift.total_price
                                                    ? 'Presente já adquirido'
                                                    : gift.is_group_gift
                                                        ? 'Contribuir'
                                                        : 'Presentear'}
                                            </Button>
                                        </DialogTrigger>
                                        {selectedGift && selectedGift.id === gift.id && (
                                            <ContributionDialog
                                                gift={selectedGift}
                                                onContribute={handleContribution}
                                            />
                                        )}
                                    </Dialog>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
} 