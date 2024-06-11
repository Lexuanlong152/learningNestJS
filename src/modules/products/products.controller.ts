import { Controller} from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')

    export class ProductController{
        constructor(private readonly productService: ProductService) {}

        getProduct(): string{
            console.log('in')
            return this.productService.getProduct();
        }
    
        createProduct () : string{
            return this.productService.createProduct();
        }
    
        getProductDetail(): string{
            return this.productService.getProductDetail();
        }
    
        updateProduct(): string{
            return this.productService.updateProduct();
        }
    
        deleteProduct(): string{
            return this.productService.deleteProduct();
        }
        
}