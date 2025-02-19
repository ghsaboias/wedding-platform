'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category, GiftWithCategoryAndContributions } from '@/types/registry'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ImageIcon, PlusIcon, SearchIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface AddGiftDialogProps {
    onAdd: (gift: Omit<GiftWithCategoryAndContributions, 'id' | 'created_at' | 'updated_at' | 'contributions'>) => void
    categories: Category[]
    open: boolean
    onOpenChange: (open: boolean) => void
}

function AddGiftDialog({ onAdd, categories, open, onOpenChange }: AddGiftDialogProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [category, setCategory] = useState<string>('')
    const [isGroupGift, setIsGroupGift] = useState(false)
    const [suggestedContribution, setSuggestedContribution] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const price = parseFloat(totalPrice)
        const suggested = suggestedContribution ? parseFloat(suggestedContribution) : null

        if (isNaN(price) || price <= 0) {
            toast.error('Por favor, insira um preço válido')
            return
        }

        if (isGroupGift && suggested && (isNaN(suggested) || suggested <= 0 || suggested > price)) {
            toast.error('Por favor, insira uma sugestão de contribuição válida')
            return
        }

        // Validate image URL
        let validatedImageUrl = null
        if (imageUrl.trim()) {
            try {
                const url = new URL(imageUrl.trim())
                if (url.protocol === 'http:' || url.protocol === 'https:') {
                    validatedImageUrl = url.toString()
                } else {
                    toast.error('A URL da imagem deve começar com http:// ou https://')
                    return
                }
            } catch (error) {
                toast.error('Por favor, insira uma URL válida para a imagem')
                return
            }
        }

        onAdd({
            title: title.trim(),
            description: description.trim() || null,
            total_price: price,
            min_contribution: null,
            suggested_contribution: suggested,
            current_contributions: 0,
            is_group_gift: isGroupGift,
            image_url: validatedImageUrl,
            category_id: category || null,
            category: categories.find(c => c.id === category) || null,
            user_id: '' // Will be set by the parent component
        })

        // Reset form
        setTitle('')
        setDescription('')
        setTotalPrice('')
        setCategory('')
        setIsGroupGift(false)
        setSuggestedContribution('')
        setImageUrl('')

        // Close dialog
        onOpenChange(false)
    }

    const handleImageSearch = async () => {
        if (!imageUrl.trim()) {
            toast.error('Por favor, insira o nome do presente para buscar uma imagem')
            return
        }

        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(imageUrl)}&per_page=1`, {
                headers: {
                    'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                }
            })
            const data = await response.json()
            if (data.results?.[0]?.urls?.regular) {
                setImageUrl(data.results[0].urls.regular)
                toast.success('Imagem encontrada!')
            } else {
                toast.error('Nenhuma imagem encontrada. Tente uma descrição diferente.')
            }
        } catch (error) {
            console.error('Error fetching image:', error)
            toast.error('Erro ao buscar imagem')
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-light text-gray-900">
                        Adicionar Presente
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Preencha as informações do presente abaixo.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-gray-700">Nome do Presente*</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Jogo de Panelas"
                            className="border-gray-200 focus:border-shadow focus:ring-shadow"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-gray-700">Descrição</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição do presente"
                            className="border-gray-200 focus:border-shadow focus:ring-shadow"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category" className="text-gray-700">Categoria</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="border-gray-200 focus:border-shadow focus:ring-shadow">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price" className="text-gray-700">Preço*</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            placeholder="Valor do presente"
                            className="border-gray-200 focus:border-shadow focus:ring-shadow"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isGroupGift" className="text-gray-700">Presente em Grupo?</Label>
                        <input
                            id="isGroupGift"
                            type="checkbox"
                            checked={isGroupGift}
                            onChange={(e) => setIsGroupGift(e.target.checked)}
                            className="ml-2 rounded border-gray-300 text-shadow focus:ring-shadow"
                        />
                    </div>
                    {isGroupGift && (
                        <div className="grid gap-2">
                            <Label htmlFor="suggestedContribution" className="text-gray-700">Sugestão de Contribuição</Label>
                            <Input
                                id="suggestedContribution"
                                type="number"
                                step="0.01"
                                min="0"
                                value={suggestedContribution}
                                onChange={(e) => setSuggestedContribution(e.target.value)}
                                placeholder="Valor sugerido por pessoa"
                                className="border-gray-200 focus:border-shadow focus:ring-shadow"
                            />
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="image" className="text-gray-700">Imagem</Label>
                        <div className="flex gap-2">
                            <Input
                                id="image"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Descreva o presente para buscar uma imagem"
                                className="border-gray-200 focus:border-shadow focus:ring-shadow"
                            />
                            <Button
                                type="button"
                                onClick={handleImageSearch}
                                className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                            >
                                Buscar
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="border-gray-200 hover:bg-gray-100"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                        >
                            Adicionar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

interface RegistryClientProps {
    user: User
    initialGifts: GiftWithCategoryAndContributions[]
}

export default function RegistryClient({ user, initialGifts }: RegistryClientProps) {
    const router = useRouter()
    const supabase = createClient()
    const [searchTerm, setSearchTerm] = useState('')
    const [gifts, setGifts] = useState(initialGifts)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Load categories on mount
    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await supabase.from('categories').select('*')
            if (data) setCategories(data)
        }
        loadCategories()
    }, [supabase])

    const filteredGifts = gifts.filter(gift =>
        gift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddGift = async (
        giftData: Omit<GiftWithCategoryAndContributions, 'id' | 'created_at' | 'updated_at' | 'contributions'>
    ) => {
        setLoading(true);
        try {
            // Extract the category from giftData and map its 'id' to 'category_id'
            const { category, ...restGiftData } = giftData;
            const payload = {
                ...restGiftData,
                user_id: user.id,
                category_id: category?.id || null,
            };

            const { data, error } = await supabase
                .from('gifts')
                .insert([payload])
                .select('*, category:categories(*)')
                .single();

            if (error) throw error;

            setGifts((prev) => [...prev, { ...data, contributions: [] }]);
            toast.success('Presente adicionado com sucesso!');
        } catch (error) {
            console.error('Error adding gift:', error);
            toast.error('Erro ao adicionar presente');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteGift = async (giftId: string) => {
        try {
            const { error } = await supabase
                .from('gifts')
                .delete()
                .eq('id', giftId)

            if (error) throw error

            setGifts(prev => prev.filter(gift => gift.id !== giftId))
            toast.success('Presente removido com sucesso!')
        } catch (error) {
            console.error('Error deleting gift:', error)
            toast.error('Erro ao remover presente')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-shadow/5 via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-4 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                    <div className="flex items-center gap-8">
                        <Button
                            variant="ghost"
                            className="bg-shadow hover:bg-dune text-white p-2 shrink-0"
                            onClick={() => router.back()}
                        >
                            <ArrowLeftIcon className="w-4 h-4 text-white" />
                        </Button>
                        <h1 className="text-xl sm:text-4xl font-light text-gray-900">
                            Lista de Presentes
                        </h1>
                    </div>
                    <Button
                        onClick={() => setDialogOpen(true)}
                        className="flex-1 sm:flex-none bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 text-sm sm:text-base"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Adicionar Presente</span>
                        <span className="sm:hidden">Adicionar</span>
                    </Button>
                </div>

                {/* Search */}
                <div className="relative mt-4 sm:mt-0">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Buscar presentes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-shadow focus:ring-shadow"
                    />
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
                                {gift.image_url && gift.image_url.startsWith('http') ? (
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
                                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                                        <div className="space-y-2">
                                            <h3 className="text-lg sm:text-xl font-semibold text-dune line-clamp-2">{gift.title}</h3>
                                            {gift.category && (
                                                <span className="inline-block text-xs sm:text-sm text-dune/80 bg-malta/10 px-2 sm:px-3 py-1 rounded-full">
                                                    {gift.category.name}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteGift(gift.id)}
                                            className="text-shadow hover:text-dune hover:bg-malta/10 transition-colors ml-2"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>
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
            <AddGiftDialog
                onAdd={handleAddGift}
                categories={categories}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
}