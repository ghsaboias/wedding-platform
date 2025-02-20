'use server'

import { createClient } from '@/utils/supabase/server'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { notFound } from 'next/navigation'
// import { WeddingInfo } from '@/types/wedding-info'

// interface WeddingInfo {
//     wedding_date: string | null
//     venue_name: string | null
//     venue_address: string | null
//     ceremony_time: string | null
//     reception_time: string | null
//     story: string | null
// }

interface WeddingInfo {
    wedding_date: string | null
    venue_name: string | null
    venue_address: string | null
    ceremony_time: string | null
    reception_time: string | null
    story: string | null
    bride_name: string | null
    groom_name: string | null
}

export default async function CouplePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const supabase = await createClient()
    const { id } = await params

    // Get both profile and wedding info in parallel for better performance
    const [profileResult, weddingInfoResult] = await Promise.all([
        supabase
            .from('profiles')
            .select('full_name')
            .eq('id', id)
            .single(),
        supabase
            .from('wedding_info')
            .select('*')
            .eq('id', id)
            .single()
    ])

    // If profile doesn't exist, show 404
    if (!profileResult.data) {
        notFound()
    }

    const profile = profileResult.data
    const weddingInfo = weddingInfoResult.data

    // Format the wedding date
    const formattedDate = weddingInfo?.wedding_date
        ? format(parseISO(weddingInfo.wedding_date), 'EEEE, MMMM d, yyyy')
        : null

    // Format times if they exist
    const formatTime = (time: string | null) => {
        if (!time) return null
        try {
            return format(parseISO(`2000-01-01T${time}`), 'h:mm a')
        } catch {
            return time // Fallback to original format if parsing fails
        }
    }

    const ceremonyTime = weddingInfo ? formatTime(weddingInfo.ceremony_time) : null
    const receptionTime = weddingInfo ? formatTime(weddingInfo.reception_time) : null

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="relative h-48 bg-pink-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                                <Image
                                    src="/wedding-rings.svg"
                                    alt="Wedding Rings"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
                            {weddingInfo?.bride_name && weddingInfo?.groom_name ? (
                                <>
                                    {weddingInfo.bride_name} & {weddingInfo.groom_name}
                                </>
                            ) : (
                                'Casal'
                            )}
                        </h1>

                        {formattedDate && (
                            <div className="text-center mb-8">
                                <p className="text-2xl text-gray-600">{formattedDate}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Venue Information */}
                            {weddingInfo && (weddingInfo.venue_name || weddingInfo.venue_address) && (
                                <div className="bg-pink-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Local</h3>
                                    {weddingInfo.venue_name && (
                                        <p className="text-gray-800 font-medium mb-2">{weddingInfo.venue_name}</p>
                                    )}
                                    {weddingInfo.venue_address && (
                                        <p className="text-gray-600">{weddingInfo.venue_address}</p>
                                    )}
                                </div>
                            )}

                            {/* Schedule Information */}
                            {(ceremonyTime || receptionTime) && (
                                <div className="bg-pink-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Horário</h3>
                                    {ceremonyTime && (
                                        <div className="mb-3">
                                            <p className="text-gray-800 font-medium">Cerimônia</p>
                                            <p className="text-gray-600">{ceremonyTime}</p>
                                        </div>
                                    )}
                                    {receptionTime && (
                                        <div>
                                            <p className="text-gray-800 font-medium">Recepção</p>
                                            <p className="text-gray-600">{receptionTime}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Our Story Section */}
                        {weddingInfo?.story && (
                            <div className="border-t border-gray-200 pt-8">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Nossa História</h3>
                                <div className="prose prose-pink max-w-none">
                                    <p className="text-gray-600 whitespace-pre-wrap text-center">{weddingInfo.story}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 