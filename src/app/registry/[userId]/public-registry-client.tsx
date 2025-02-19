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
    const [dialogOpen, setDialogOpen] = useState(false)

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
        <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-shadow/5 via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-4 sm:p-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-xl sm:text-4xl font-light text-gray-900">
                        Lista de Presentes
                    </h1>
                    <p className="text-base sm:text-xl text-dune/70">
                        PLACEHOLDER
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Buscar presentes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-shadow focus:ring-shadow"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="bg-white/50 backdrop-blur-sm border-gray-200 focus:border-shadow focus:ring-shadow">
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
                {filteredGifts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
                        {filteredGifts.map((gift) => (
                            <motion.div
                                key={gift.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
                            >
                                {gift.image_url ? (
                                    <div className="relative h-36 sm:h-48 overflow-hidden">
                                        <Image
                                            src={gift.image_url}
                                            alt={gift.title}
                                            width={400}
                                            height={192}
                                            className="w-full h-36 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-36 sm:h-48 bg-malta/10 flex items-center justify-center rounded-t-2xl">
                                        <ImageIcon className="w-8 sm:w-12 h-8 sm:h-12 text-malta/30" />
                                    </div>
                                )}
                                <div className="p-4 sm:p-6">
                                    <div className="space-y-2 mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl font-semibold text-dune line-clamp-2">{gift.title}</h3>
                                        {gift.category && (
                                            <span className="inline-block text-xs sm:text-sm text-dune/80 bg-malta/10 px-2 sm:px-3 py-1 rounded-full">
                                                {gift.category.name}
                                            </span>
                                        )}
                                    </div>
                                    {gift.description && (
                                        <p className="text-dune/70 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">{gift.description}</p>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <div className="text-dune font-medium text-sm sm:text-base">
                                            R$ {gift.total_price.toFixed(2)}
                                        </div>
                                        {gift.is_group_gift && (
                                            <div className="text-xs sm:text-sm text-dune/70">
                                                Sugestão: R$ {gift.suggested_contribution?.toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                    {gift.is_group_gift && (
                                        <div className="mt-3 sm:mt-4">
                                            <div className="flex justify-between text-xs sm:text-sm text-dune/70 mb-1">
                                                <span>Progresso</span>
                                                <span>{Math.round((gift.current_contributions / gift.total_price) * 100)}%</span>
                                            </div>
                                            <div className="w-full bg-malta/20 rounded-full h-1.5 sm:h-2">
                                                <div
                                                    className="bg-shadow h-1.5 sm:h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${Math.min(100, (gift.current_contributions / gift.total_price) * 100)}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <Dialog open={dialogOpen} onOpenChange={(open) => {
                                            setDialogOpen(open)
                                            if (!open) {
                                                setSelectedGift(null)
                                            }
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="w-full bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                                                    onClick={() => {
                                                        setSelectedGift(gift)
                                                        setDialogOpen(true)
                                                    }}
                                                    disabled={gift.current_contributions >= gift.total_price}
                                                >
                                                    {gift.current_contributions >= gift.total_price
                                                        ? 'Presente já adquirido'
                                                        : gift.is_group_gift
                                                            ? 'Contribuir'
                                                            : 'Presentear'}
                                                </Button>
                                            </DialogTrigger>
                                            {selectedGift && (
                                                <ContributionDialog
                                                    gift={selectedGift}
                                                    onContribute={() => {
                                                        handleContribution()
                                                        setDialogOpen(false)
                                                    }}
                                                />
                                            )}
                                        </Dialog>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-12">
                        <p className="text-lg">Nenhum presente encontrado</p>
                    </div>
                )}
            </div>
        </div>
    )
} 