'use server'

import { GiftWithCategoryAndContributions } from '@/types/registry'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RegistryClient from './registry-client'

export default async function RegistryPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: gifts } = await supabase
        .from('gifts')
        .select(`
            *,
            category:categories(*),
            contributions(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <RegistryClient
            user={user}
            initialGifts={gifts as GiftWithCategoryAndContributions[] || []}
        />
    )
} 