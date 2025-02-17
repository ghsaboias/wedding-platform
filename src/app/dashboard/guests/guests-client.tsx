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
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Adicionar Convidado</DialogTitle>
                <DialogDescription>
                    Preencha as informações do convidado abaixo.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nome*</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do convidado"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email do convidado"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefone do convidado"
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as GuestStatus)}>
                        <SelectTrigger>
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
                    <Label>Acompanhantes</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setCompanions(Math.max(0, companions - 1))}
                        >
                            <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{companions}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setCompanions(companions + 1)}
                        >
                            <PlusIcon className="h-4 w-4" />
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
                        <Button type="submit">Pronto</Button>
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
                        Gerenciamento de Convidados
                    </h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleSave}
                            disabled={saving || Object.keys(changes).length === 0}
                            className="bg-rose-600 hover:bg-rose-700"
                        >
                            {saving ? (
                                'Salvando...'
                            ) : (
                                <>
                                    <SaveIcon className="w-4 h-4 mr-2" />
                                    Salvar Alterações
                                </>
                            )}
                        </Button>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-800 hover:bg-gray-900">
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Adicionar Convidado
                                </Button>
                            </DialogTrigger>
                            <AddGuestDialog onAdd={handleAddNewGuest} user={user} />
                        </Dialog>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Buscar convidados..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Guest List */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <colgroup>
                                <col className="w-[18%]" />
                                <col className="w-[18%]" />
                                <col className="w-[14%]" />
                                <col className="w-[12%]" />
                                <col className="w-[12%]" />
                                <col className="w-[10%]" />
                            </colgroup>
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Telefone
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        Acompanhantes
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredGuests.map((guest) => (
                                    <motion.tr
                                        key={guest.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-4">
                                            <Input
                                                value={guest.name}
                                                onChange={(e) => handleUpdateGuest(guest.id, 'name', e.target.value)}
                                                className="text-gray-900"
                                                placeholder="Nome*"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4">
                                            <Input
                                                value={guest.email || ''}
                                                onChange={(e) => handleUpdateGuest(guest.id, 'email', e.target.value)}
                                                className="text-gray-900"
                                                placeholder="Email"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4">
                                            <Input
                                                value={guest.phone || ''}
                                                onChange={(e) => handleUpdateGuest(guest.id, 'phone', e.target.value)}
                                                className="text-gray-900"
                                                placeholder="Telefone"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4">
                                            <Select
                                                value={guest.status}
                                                onValueChange={(value) => handleUpdateGuest(guest.id, 'status', value as GuestStatus)}
                                            >
                                                <SelectTrigger className="text-gray-700 border border-input rounded-md text-sm py-2 pr-3">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pendente</SelectItem>
                                                    <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                                                    <SelectItem value="DECLINED">Recusado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="whitespace-nowrap flex justify-center py-4">
                                            <div className="flex items-center gap-2">
                                                <MinusIcon className="w-5 h-5 bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleUpdateGuest(guest.id, 'number_of_companions', guest.number_of_companions - 1)} />
                                                <span className="text-gray-900">{guest.number_of_companions}</span>
                                                <PlusIcon className="w-5 h-5 bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300" onClick={() => handleUpdateGuest(guest.id, 'number_of_companions', guest.number_of_companions + 1)} />
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap text-center">
                                            <Button
                                                onClick={() => handleDeleteGuest(guest)}
                                                variant="ghost"
                                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
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
    )
} 