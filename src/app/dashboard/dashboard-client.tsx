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
        <div className="container mx-auto py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Welcome, {profile?.full_name || user.email}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage your wedding planning tools below
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Wedding Information</h2>
                    <p className="text-gray-600 mb-4">
                        Manage your wedding details and share them with guests
                    </p>
                    <Link
                        href="/dashboard/wedding-info"
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                    >
                        Manage Info
                    </Link>
                </Card>

                <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">RSVP Manager</h2>
                    <p className="text-gray-600 mb-4">
                        Track and manage your guest list and RSVPs
                    </p>
                    <Link
                        href="/dashboard/rsvp"
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                    >
                        Manage RSVPs
                    </Link>
                </Card>

                <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Gift List Manager</h2>
                    <p className="text-gray-600 mb-4">
                        Create and manage your wedding gift registry
                    </p>
                    <Link
                        href="/dashboard/gifts"
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                    >
                        Manage Gifts
                    </Link>
                </Card>
            </div>
        </div>
    )
} 