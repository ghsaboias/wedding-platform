'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import GuestsClient from './guests-client'

export default async function GuestsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: guests } = await supabase
        .from('guests')
        .select('*')
        .eq('couple_id', user.id)
        .order('created_at', { ascending: true })

    return <GuestsClient user={user} initialGuests={guests || []} />
} 