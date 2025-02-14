export interface Category {
    id: string
    name: string
    slug: string
    icon: string
    created_at: string
}

export interface Gift {
    id: string
    title: string
    description: string | null
    total_price: number
    min_contribution: number | null
    suggested_contribution: number | null
    current_contributions: number
    is_group_gift: boolean
    image_url: string | null
    category_id: string | null
    user_id: string
    created_at: string
    updated_at: string
}

export interface Contribution {
    id: string
    gift_id: string
    amount: number
    contributor_name: string
    contributor_email: string
    message: string | null
    thanked_at: string | null
    thank_you_message: string | null
    created_at: string
}

export interface GiftWithCategory extends Gift {
    category: Category | null
}

export interface GiftWithContributions extends Gift {
    contributions: Contribution[]
}

export interface GiftWithCategoryAndContributions extends Gift {
    category: Category | null
    contributions: Contribution[]
} 