import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){}

    @Post('checkout')
    async checkout(@Body() checkoutDto: CheckoutDto){
        return await this.paymentService.checkout(checkoutDto);
    }
}
