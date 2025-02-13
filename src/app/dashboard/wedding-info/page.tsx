'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import WeddingInfoClient from './wedding-info-client'

export default async function WeddingInfoPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: weddingInfo } = await supabase
        .from('wedding_info')
        .select('*')
        .eq('id', user.id)
        .single()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return <WeddingInfoClient user={user} weddingInfo={weddingInfo} profile={profile} />
} 