'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Guest, GuestChanges, GuestStatus } from '@/types/guests'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, MinusIcon, PlusIcon, SaveIcon, SearchIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface AddGuestDialogProps {
    onAdd: (guest: Omit<Guest, 'id' | 'created_at' | 'updated_at'>) => void
    user: User
}

function AddGuestDialog({ onAdd, user }: AddGuestDialogProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState<GuestStatus>('PENDING')
    const [companions, setCompanions] = useState(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd({
            couple_id: user.id,
            name: name.trim(),
            email: email.trim() || null,
            phone: phone.trim() || null,
            status,
            number_of_companions: companions
        })
    }

    return (
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle className="text-2xl font-light text-gray-900">
                    Adicionar Convidado
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Preencha as informações do convidado abaixo.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name" className="text-gray-700">Nome*</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do convidado"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email do convidado"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-gray-700">Telefone</Label>
                    <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefone do convidado"
                        className="border-gray-200 focus:border-shadow focus:ring-shadow"
                    />
                </div>
                <div className="grid gap-2">
                    <Label className="text-gray-700">Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as GuestStatus)}>
                        <SelectTrigger className="border-gray-200 focus:border-shadow focus:ring-shadow">
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PENDING">Pendente</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                            <SelectItem value="DECLINED">Recusado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label className="text-gray-700">Acompanhantes</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setCompanions(Math.max(0, companions - 1))}
                            className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                        >
                            <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-gray-900 font-medium">{companions}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setCompanions(companions + 1)}
                            className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="border-gray-200 hover:bg-gray-100">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" className="bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none">
                            Pronto
                        </Button>
                    </DialogClose>
                </div>
            </form>
        </DialogContent>
    )
}

interface GuestsClientProps {
    user: User
    initialGuests: Guest[]
}

export default function GuestsClient({ user, initialGuests }: GuestsClientProps) {
    const router = useRouter()
    const supabase = createClient()
    const [searchTerm, setSearchTerm] = useState('')
    const [guests, setGuests] = useState<Guest[]>(initialGuests)
    const [changes, setChanges] = useState<GuestChanges>({})
    const [saving, setSaving] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Filter guests based on search term
    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddNewGuest = (guestData: Omit<Guest, 'id' | 'created_at' | 'updated_at'>) => {
        const newGuest: Guest = {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...guestData
        }

        setGuests(prev => [...prev, newGuest])
        setChanges(prev => ({
            ...prev,
            [newGuest.id]: {
                original: newGuest,
                current: newGuest,
                isNew: true
            }
        }))
        setDialogOpen(false)
    }

    const handleUpdateGuest = (id: string, field: keyof Guest, value: any) => {
        setGuests(prev => prev.map(guest => {
            if (guest.id === id) {
                const updatedGuest = { ...guest, [field]: value }

                // Track changes
                if (!changes[id]) {
                    changes[id] = {
                        original: guest,
                        current: updatedGuest
                    }
                } else {
                    changes[id].current = updatedGuest
                }

                return updatedGuest
            }
            return guest
        }))
    }

    const handleDeleteGuest = (guest: Guest) => {
        setGuests(prev => prev.filter(g => g.id !== guest.id))
        setChanges(prev => ({
            ...prev,
            [guest.id]: {
                original: guest,
                current: guest,
                isDeleted: true
            }
        }))
    }

    const handleSave = async () => {
        setSaving(true)
        const changesArray = Object.entries(changes)

        if (changesArray.length === 0) {
            toast.info('Nenhuma alteração para salvar')
            setSaving(false)
            return
        }

        try {
            // Handle deletions
            const deletions = changesArray
                .filter(([_, change]) => change.isDeleted)
                .map(([id]) => id)

            if (deletions.length > 0) {
                const { error } = await supabase
                    .from('guests')
                    .delete()
                    .in('id', deletions)

                if (error) {
                    if (error.code === 'PGRST116') {
                        throw new Error('Alguns convidados não foram encontrados')
                    }
                    throw error
                }
            }

            // Handle updates
            const updates = changesArray
                .filter(([_, change]) => !change.isNew && !change.isDeleted)
                .map(([_, change]) => change.current)

            if (updates.length > 0) {
                const { error } = await supabase
                    .from('guests')
                    .upsert(updates)

                if (error) {
                    if (error.code === '23505') {
                        throw new Error('Conflito ao atualizar convidados - emails duplicados')
                    }
                    throw error
                }
            }

            // Handle insertions
            const insertions = changesArray
                .filter(([_, change]) => change.isNew)
                .map(([_, change]) => {
                    const { id, ...guestWithoutId } = change.current
                    return guestWithoutId
                })

            if (insertions.length > 0) {
                const { error } = await supabase
                    .from('guests')
                    .insert(insertions)

                if (error) {
                    if (error.code === '23505') {
                        throw new Error('Conflito ao adicionar convidados - emails duplicados')
                    }
                    throw error
                }
            }

            toast.success('Alterações salvas com sucesso!')
            setChanges({})
            router.refresh()
        } catch (error) {
            console.error('Error saving changes:', error)
            toast.error(error instanceof Error ? error.message : 'Erro ao salvar alterações')
        } finally {
            setSaving(false)
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
                            Convidados
                        </h1>
                    </div>
                    <div className="flex gap-2 sm:gap-4">
                        <Button
                            onClick={handleSave}
                            disabled={saving || Object.keys(changes).length === 0}
                            className="flex-1 sm:flex-none bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 disabled:bg-gray-500 disabled:shadow-none text-sm sm:text-base"
                        >
                            {saving ? (
                                'Salvando...'
                            ) : (
                                <>
                                    <SaveIcon className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Salvar Alterações</span>
                                    <span className="sm:hidden">Salvar</span>
                                </>
                            )}
                        </Button>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex-1 sm:flex-none bg-shadow hover:bg-dune text-white shadow-lg shadow-shadow/20 text-sm sm:text-base">
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Adicionar Convidado</span>
                                    <span className="sm:hidden">Adicionar</span>
                                </Button>
                            </DialogTrigger>
                            <AddGuestDialog onAdd={handleAddNewGuest} user={user} />
                        </Dialog>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Buscar convidados..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-shadow focus:ring-shadow"
                    />
                </div>

                {/* Guest List - Scrollable Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">
                                            Nome
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">
                                            Telefone
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                                            Acompanhantes
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[5%]">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {filteredGuests.map((guest) => (
                                        <motion.tr
                                            key={guest.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-gray-50/50"
                                        >
                                            <td className="px-4 py-2">
                                                <Input
                                                    value={guest.name}
                                                    onChange={(e) => handleUpdateGuest(guest.id, 'name', e.target.value)}
                                                    className="text-gray-900 border-gray-200 focus:border-shadow focus:ring-shadow"
                                                    placeholder="Nome*"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    value={guest.email || ''}
                                                    onChange={(e) => handleUpdateGuest(guest.id, 'email', e.target.value)}
                                                    className="text-gray-900 border-gray-200 focus:border-shadow focus:ring-shadow"
                                                    placeholder="Email"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    value={guest.phone || ''}
                                                    onChange={(e) => handleUpdateGuest(guest.id, 'phone', e.target.value)}
                                                    className="text-gray-900 border-gray-200 focus:border-shadow focus:ring-shadow"
                                                    placeholder="Telefone"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Select
                                                    value={guest.status}
                                                    onValueChange={(value) => handleUpdateGuest(guest.id, 'status', value as GuestStatus)}
                                                >
                                                    <SelectTrigger className="text-gray-700 border-gray-200 focus:border-shadow focus:ring-shadow rounded-md text-sm">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PENDING">Pendente</SelectItem>
                                                        <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                                                        <SelectItem value="DECLINED">Recusado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleUpdateGuest(guest.id, 'number_of_companions', Math.max(0, guest.number_of_companions - 1))}
                                                        className="h-8 w-8 p-0 hover:bg-malta/10"
                                                    >
                                                        <MinusIcon className="w-4 h-4" />
                                                    </Button>
                                                    <span className="text-gray-900 font-medium w-6 text-center">
                                                        {guest.number_of_companions}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleUpdateGuest(guest.id, 'number_of_companions', guest.number_of_companions + 1)}
                                                        className="h-8 w-8 p-0 hover:bg-malta/10"
                                                    >
                                                        <PlusIcon className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <Button
                                                    onClick={() => handleDeleteGuest(guest)}
                                                    variant="ghost"
                                                    className="text-shadow hover:text-dune hover:bg-malta/10 transition-colors"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 