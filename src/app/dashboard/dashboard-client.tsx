'use client'

import { Card } from '@/components/ui/card'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
}

interface DashboardClientProps {
    user: User
    profile: Profile
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
            <div className="container mx-auto py-10 px-4">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Welcome, {profile?.full_name || user.email?.split('@')[0]}!
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Let's make your special day unforgettable
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="p-8 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Wedding Information</h2>
                                <p className="text-gray-600">
                                    Set up your wedding details and create a beautiful landing page for your guests
                                </p>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    href="/dashboard/wedding-info"
                                    className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-500 transition-colors font-medium"
                                >
                                    Manage Info
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">RSVP Manager</h2>
                                <p className="text-gray-600">
                                    Keep track of your guest list and manage RSVPs with ease
                                </p>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    href="/dashboard/rsvp"
                                    className="inline-flex items-center justify-center w-full bg-rose-600 text-white px-4 py-3 rounded-lg hover:bg-rose-500 transition-colors font-medium"
                                >
                                    Manage RSVPs
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Gift List Manager</h2>
                                <p className="text-gray-600">
                                    Create and manage your wedding gift registry with style
                                </p>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    href="/dashboard/gifts"
                                    className="inline-flex items-center justify-center w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-500 transition-colors font-medium"
                                >
                                    Manage Gifts
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
} 