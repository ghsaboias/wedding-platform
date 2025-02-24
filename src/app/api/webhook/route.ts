import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

// This is your Stripe webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
    try {
        const body = await req.text()
        // Get the raw headers
        const signature = req.headers.get('stripe-signature')

        if (!signature || !webhookSecret) {
            console.error('Missing stripe-signature or webhook secret')
            return NextResponse.json(
                { error: 'Missing stripe-signature or webhook secret' },
                { status: 400 }
            )
        }

        let event
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        } catch (err: any) {
            console.error('Webhook signature verification failed:', err.message)
            return NextResponse.json({ error: err.message }, { status: 400 })
        }

        // Log all events for debugging
        console.log(`Received Stripe event: ${event.type}`, {
            id: event.id,
            type: event.type,
            created: new Date(event.created * 1000).toISOString(),
        })

        // Handle the event
        switch (event.type) {
            case 'payment_intent.created':
                const paymentIntentCreated = event.data.object
                console.log('Payment intent created:', {
                    id: paymentIntentCreated.id,
                    amount: paymentIntentCreated.amount,
                    currency: paymentIntentCreated.currency,
                    status: paymentIntentCreated.status,
                })
                break

            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object
                console.log('Payment succeeded:', {
                    id: paymentIntent.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    status: paymentIntent.status,
                    customer: paymentIntent.customer,
                    payment_method: paymentIntent.payment_method,
                })
                // TODO: Update your database with payment success
                // TODO: Send confirmation email
                break

            case 'payment_intent.payment_failed':
                const paymentFailed = event.data.object
                console.log('Payment failed:', {
                    id: paymentFailed.id,
                    amount: paymentFailed.amount,
                    currency: paymentFailed.currency,
                    status: paymentFailed.status,
                    error: paymentFailed.last_payment_error,
                })
                // TODO: Handle failed payment (notify user, update database, etc.)
                break

            case 'checkout.session.completed':
                const session = event.data.object
                console.log('Checkout completed:', {
                    id: session.id,
                    amount_total: session.amount_total,
                    currency: session.currency,
                    customer: session.customer,
                    payment_status: session.payment_status,
                })
                // TODO: Fulfill the purchase
                break

            case 'checkout.session.expired':
                const expiredSession = event.data.object
                console.log('Checkout expired:', {
                    id: expiredSession.id,
                    expires_at: new Date(expiredSession.expires_at * 1000).toISOString(),
                })
                break

            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (err) {
        console.error('Webhook error:', err)
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        )
    }
} 