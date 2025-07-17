import { Injectable } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    stripe: Stripe;

    constructor(){
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            throw new Error('STRIPE_SECRET_KEY is not defined');
        }
        this.stripe = new Stripe(stripeSecretKey);
    }
            
    async checkout(checkoutDto: CheckoutDto){
        const checkout = await this.stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ['card'],
                currency: "USD",
                line_items: checkoutDto.data.map(({product, quantity}) => {
                    return {
                        price_data:{
                            currency: "USD",
                            product_data:{
                                name: product.name,
                                images: [product.urlImg],
                            },
                            unit_amount: Math.round(product.price * 100), 
                        },
                        quantity,
                    };
                }),
                success_url: 'http://localhost:4200/payment/success',
                cancel_url: 'http://localhost:4200',
            });

            const {url} = checkout;
            return {
                url,
            };
    }
}
