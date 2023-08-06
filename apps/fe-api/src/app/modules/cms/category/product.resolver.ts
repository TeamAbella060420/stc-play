import { Query, Resolver, Context, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductInput } from '../../../typeDefs/product';

@Resolver('Product')
export class ProductResolver {
   
constructor(
    private productService: ProductService,
) {}

  @Query('getAllProduct')
    getAllProduct(
      @Context('req') request: any,
      @Args('details') details: ProductInput,
    ) {
      return this.productService.getAllProduct(request, details)
    }
}
