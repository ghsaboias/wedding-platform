'use server'

import { createClient } from '@/utils/supabase/server'
import { format } from 'date-fns'
import Image from 'next/image'

interface WeddingInfo {
    wedding_date: string | null
    venue_name: string | null
    venue_address: string | null
    ceremony_time: string | null
    reception_time: string | null
    story: string | null
}

export default async function CouplePage({
    params,
}: {
    params: { id: string }
}) {
    const supabase = await createClient()
    const { id } = await params

    // First check if the user exists
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', id)
        .single()

    // Then get the wedding info
    const { data: weddingInfo } = await supabase
        .from('wedding_info')
        .select('*')
        .eq('id', id)
        .single()

    // If neither profile nor wedding info exists, show a placeholder
    if (!profile || !weddingInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
                <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden p-8">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <Image
                                src="/wedding-rings.svg"
                                alt="Wedding Rings"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Coming Soon
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            This couple's wedding page is being prepared with love and care.
                            Please check back later for their special day details.
                        </p>
                        <div className="w-16 h-1 bg-pink-200 mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            {profile.full_name}'s Wedding
                        </h1>

                        {weddingInfo.wedding_date && (
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {format(new Date(weddingInfo.wedding_date), 'MMMM d, yyyy')}
                                </h2>
                            </div>
                        )}

                        {(weddingInfo.venue_name || weddingInfo.venue_address) && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Venue</h3>
                                {weddingInfo.venue_name && (
                                    <p className="text-gray-600">{weddingInfo.venue_name}</p>
                                )}
                                {weddingInfo.venue_address && (
                                    <p className="text-gray-600">{weddingInfo.venue_address}</p>
                                )}
                            </div>
                        )}

                        {(weddingInfo.ceremony_time || weddingInfo.reception_time) && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule</h3>
                                {weddingInfo.ceremony_time && (
                                    <p className="text-gray-600">Ceremony: {weddingInfo.ceremony_time}</p>
                                )}
                                {weddingInfo.reception_time && (
                                    <p className="text-gray-600">Reception: {weddingInfo.reception_time}</p>
                                )}
                            </div>
                        )}

                        {weddingInfo.story && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Story</h3>
                                <p className="text-gray-600 whitespace-pre-wrap">{weddingInfo.story}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 