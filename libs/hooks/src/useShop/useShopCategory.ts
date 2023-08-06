import { useLazyQuery } from '@apollo/client';
import { CATEGORY_QUERY } from '@fe-monorepo/data-access';
import { ShopCategoryDataModel } from '@fe-monorepo/models';
import { useState } from 'react';
interface CategoryResponse {
    getAllCategory: {
      is_successful: boolean;
      error_code: string;
      error_msg: string;
      data: ShopCategoryDataModel[]
    };
};
export const useShopCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [getAllCategory, { data: categories, error: categoriesError }] = useLazyQuery<CategoryResponse>(CATEGORY_QUERY.getAllCategory,{ errorPolicy: 'all' });
    
    const getAll = async () => {
        setIsLoading(true);
        const { data } = await getAllCategory();
        setIsLoading(false);
        return data?.getAllCategory;
    }


    return {
        getAll,
        isLoading,
        setIsLoading,
        categories: categories?.getAllCategory
    }
}