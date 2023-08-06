import { useLazyQuery } from '@apollo/client';
import { PRODUCT_QUERY } from '@fe-monorepo/data-access';
import { ProductInput, ShopProductDataModel } from '@fe-monorepo/models';
import { useState } from 'react';
import moment from 'moment';
interface ProductResponse {
    getAllProduct: {
        is_successful: boolean;
        error_code: string;
        error_msg: string;
        data: ShopProductDataModel[]
    }
}
interface ProductParams {
    details: ProductInput
}
export const useShopProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [getAllProduct, { data: products, error: productError }] = useLazyQuery<ProductResponse, ProductParams>(PRODUCT_QUERY.getAllProduct,{ errorPolicy: 'all' });
    
    const getAll = async (params: ProductInput) => {
        setIsLoading(true);
        const { data } = await getAllProduct({
            variables: { details: {...params, timestamp: moment().format('YYYY-MM-DD HH:mm:ss')} }
          });
        setIsLoading(false);
        return data?.getAllProduct;
    }


    return {
        getAll,
        isLoading,
        setIsLoading,
        products: products?.getAllProduct
    }
}