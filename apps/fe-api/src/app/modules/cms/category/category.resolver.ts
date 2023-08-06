import { Query, Resolver, Context } from '@nestjs/graphql';
import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolver {
   
constructor(
    private categoryService: CategoryService,
) {}

  @Query('getAllCategory')
    getAllCategory(
      @Context('req') request: any,
    ) {
      return this.categoryService.getAllCategory(request)
    }
}
