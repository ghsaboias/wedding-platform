'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category, GiftWithCategoryAndContributions } from '@/types/registry'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ImageIcon, PlusIcon, SearchIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface AddGiftDialogProps {
    onAdd: (gift: Omit<GiftWithCategoryAndContributions, 'id' | 'created_at' | 'updated_at' | 'contributions'>) => void
    categories: Category[]
}

function AddGiftDialog({ onAdd, categories }: AddGiftDialogProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [category, setCategory] = useState<string>('')
    const [isGroupGift, setIsGroupGift] = useState(false)
    const [suggestedContribution, setSuggestedContribution] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
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

        onAdd({
            title: title.trim(),
            description: description.trim() || null,
            total_price: price,
            min_contribution: null,
            suggested_contribution: suggested,
            current_contributions: 0,
            is_group_gift: isGroupGift,
            image_url: imageUrl.trim() || null,
            category_id: category || null,
            category: categories.find(c => c.id === category) || null,
            user_id: '' // Will be set by the parent component
        })
    }

    const handleImageSearch = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(title)}&per_page=1`, {
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
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Adicionar Presente</DialogTitle>
                <DialogDescription>
                    Preencha as informações do presente abaixo.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Nome do Presente*</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Jogo de Panelas"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição do presente"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
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
                    <Label htmlFor="price">Preço*</Label>
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                        placeholder="Valor do presente"
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="isGroupGift">Presente em Grupo?</Label>
                    <input
                        id="isGroupGift"
                        type="checkbox"
                        checked={isGroupGift}
                        onChange={(e) => setIsGroupGift(e.target.checked)}
                        className="ml-2"
                    />
                </div>
                {isGroupGift && (
                    <div className="grid gap-2">
                        <Label htmlFor="suggestedContribution">Sugestão de Contribuição</Label>
                        <Input
                            id="suggestedContribution"
                            type="number"
                            step="0.01"
                            min="0"
                            value={suggestedContribution}
                            onChange={(e) => setSuggestedContribution(e.target.value)}
                            placeholder="Valor sugerido por pessoa"
                        />
                    </div>
                )}
                <div className="grid gap-2">
                    <Label htmlFor="image">Imagem</Label>
                    <div className="flex gap-2">
                        <Input
                            id="image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="URL da imagem"
                        />
                        <Button type="button" onClick={handleImageSearch} className="shrink-0">
                            <ImageIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit">Adicionar</Button>
                    </DialogClose>
                </div>
            </form>
        </DialogContent>
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

    // Load categories on mount
    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await supabase.from('categories').select('*')
            if (data) setCategories(data)
        }
        loadCategories()
    }, [])

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
        <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <Button
                        variant="ghost"
                        className="bg-gray-900 hover:bg-gray-700 p-2"
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon className="w-4 h-4 text-gray-100" />
                    </Button>
                    <h1 className="text-3xl font-light text-gray-800">
                        Lista de Presentes
                    </h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-rose-600 hover:bg-rose-700">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Adicionar Presente
                            </Button>
                        </DialogTrigger>
                        <AddGiftDialog onAdd={handleAddGift} categories={categories} />
                    </Dialog>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Buscar presentes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
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
                                <img
                                    src={gift.image_url}
                                    alt={gift.title}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{gift.title}</h3>
                                        {gift.category && (
                                            <span className="text-sm text-gray-500">{gift.category.name}</span>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteGift(gift.id)}
                                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
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
                                                className="bg-rose-600 h-2 rounded-full"
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
            </div>
        </div>
    )
}