import { GiftWithCategoryAndContributions } from '@/types/registry'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import PublicRegistryClient from './public-registry-client'

export default async function PublicRegistryPage({
    params
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params
    const supabase = await createClient()

    // Get user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (!profile) {
        notFound()
    }

    // Get gifts with categories and contributions
    const { data: gifts } = await supabase
        .from('gifts')
        .select(`
            *,
            category:categories(*),
            contributions(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    return (
        <PublicRegistryClient
            profile={profile}
            gifts={gifts as GiftWithCategoryAndContributions[] || []}
        />
    )
} 