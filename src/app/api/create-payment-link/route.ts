import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { amount, name, metadata } = await req.json()
        const coupleId = metadata?.coupleId

        // First create a product
        const product = await stripe.products.create({
            name: name || 'Wedding Gift',
            metadata
        })

        // Then create a price for the product
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: amount * 100, // Convert to cents
            currency: 'brl',
        })

        // Create a payment link
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            after_completion: {
                type: 'redirect',
                redirect: {
                    url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you${coupleId ? `?coupleId=${coupleId}` : ''}`
                }
            },
        })

        return NextResponse.json({ url: paymentLink.url })
    } catch (error) {
        console.error('Error creating payment link:', error)
        return NextResponse.json(
            { error: 'Error creating payment link' },
            { status: 500 }
        )
    }
} 