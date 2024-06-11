import { Injectable, Get, Post,Put, Delete } from '@nestjs/common';

@Injectable()
export class ProductService {
    @Get()
    getProduct(): string{
        return 'Get Product';
    }

    @Post()
    createProduct () : string{
        return 'Post Product';
    }

    @Get(':/id')
    getProductDetail(): string{
        return 'Detai Product';
    }

    @Put(':/id')
    updateProduct(): string{
        return 'UPdate Product';
    }

    @Delete(':/id')
    deleteProduct(): string{
        return 'delete Product';
    }
    
}
