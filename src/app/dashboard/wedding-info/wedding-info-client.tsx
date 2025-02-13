'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Profile {
    id: string
    full_name: string | null
}

interface WeddingInfo {
    wedding_date: string | null
    venue_name: string | null
    venue_address: string | null
    ceremony_time: string | null
    reception_time: string | null
    story: string | null
}

interface WeddingInfoClientProps {
    user: User
    weddingInfo: WeddingInfo | null
    profile: Profile
}

export default function WeddingInfoClient({ user, weddingInfo, profile }: WeddingInfoClientProps) {
    const router = useRouter()
    const supabase = createClient()
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState<WeddingInfo>({
        wedding_date: weddingInfo?.wedding_date || null,
        venue_name: weddingInfo?.venue_name || null,
        venue_address: weddingInfo?.venue_address || null,
        ceremony_time: weddingInfo?.ceremony_time || null,
        reception_time: weddingInfo?.reception_time || null,
        story: weddingInfo?.story || null,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (weddingInfo) {
                await supabase
                    .from('wedding_info')
                    .update(formData)
                    .eq('id', user.id)
            } else {
                await supabase
                    .from('wedding_info')
                    .insert([{ ...formData, id: user.id }])
            }
            router.refresh()
        } catch (error) {
            console.error('Error saving wedding info:', error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">Wedding Information</h1>
                    <p className="text-gray-600 mt-2">
                        Manage your wedding details and share them with your guests
                    </p>
                </div>
                <Link
                    href={`/couple/${user.id}`}
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-500"
                >
                    View Public Page ↗
                </Link>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="wedding_date">Wedding Date</Label>
                        <Input
                            id="wedding_date"
                            type="date"
                            value={formData.wedding_date ? format(new Date(formData.wedding_date), 'MM-dd-yyyy') : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    wedding_date: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="venue_name">Venue Name</Label>
                        <Input
                            id="venue_name"
                            value={formData.venue_name || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    venue_name: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="venue_address">Venue Address</Label>
                        <Input
                            id="venue_address"
                            value={formData.venue_address || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    venue_address: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="ceremony_time">Ceremony Time</Label>
                        <Input
                            id="ceremony_time"
                            value={formData.ceremony_time || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    ceremony_time: e.target.value,
                                }))
                            }
                            placeholder="e.g. 2:00 PM"
                        />
                    </div>

                    <div>
                        <Label htmlFor="reception_time">Reception Time</Label>
                        <Input
                            id="reception_time"
                            value={formData.reception_time || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    reception_time: e.target.value,
                                }))
                            }
                            placeholder="e.g. 5:00 PM"
                        />
                    </div>

                    <div>
                        <Label htmlFor="story">Your Story</Label>
                        <Textarea
                            id="story"
                            value={formData.story || ''}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    story: e.target.value,
                                }))
                            }
                            placeholder="Share your story with your guests..."
                            className="h-32"
                        />
                    </div>

                    <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </Card>
        </div>
    )
} 