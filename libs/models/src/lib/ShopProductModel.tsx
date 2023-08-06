export type ShopProductDataModel = {
  product_id: number;
  is_preorder: number;
  name_en: string;
  name: string;
  is_tax_applicable: number;
  description_en: string | null;
  details_en: string | null;
  usage_instructions_en: string | null;
  quantity: number;
  number_of_likes: number;
  is_digital: number;
  sort_id: number;
  category_id: number;
  sku: string | null;
  media: string[];
  unit_price: number;
  discount_rate: number;
  discount_price: number;
  total_price: number;
  total_tax: number;
  grand_total: number;
  combination_id: number;
  lowest_grand_total: number;
};

export interface ProductInput {
  category_id: number;
  timestamp?: string;
  page_number?: number;
  is_digital?: number;
  is_active?: number;
}
