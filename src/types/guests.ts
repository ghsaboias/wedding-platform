export type GuestStatus = 'PENDING' | 'CONFIRMED' | 'DECLINED'

export interface Guest {
    id: string
    couple_id: string
    name: string
    email?: string | null
    phone?: string | null
    status: GuestStatus
    number_of_companions: number
    dietary_restrictions?: string | null
    notes?: string | null
    created_at: string
    updated_at: string
}

export interface GuestFormData {
    name: string
    email?: string
    phone?: string
    status: GuestStatus
    number_of_companions: number
    dietary_restrictions?: string
    notes?: string
}

export interface GuestChanges {
    [key: string]: {
        original: Guest
        current: Guest
        isDeleted?: boolean
        isNew?: boolean
    }
} 