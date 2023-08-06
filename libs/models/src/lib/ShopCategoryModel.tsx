export type SubCategories = {
    category_id: number;
    category_seo_code: string;
    img: string;
    name_en: string;
    name: string;
    sort_id: number;
    parent_category_id: number;
}

export type ShopCategoryDataModel = {
    category_id: number;
    category_seo_code: string;
    name_en: string;
    name: string;
    sort_id: number;
    img: string;
    parent_category_id: number;
    sub_categories: SubCategories[];
}
