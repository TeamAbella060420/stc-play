export type ShopModel = {
    id: string,
    type: string,
    title: string,
    combination_id: number,
    img: string,
    breadcrumbs: [string],
    grand_total?: number,
    total_price?: number,
    product_rating?: number,
    total_raters?: number,
    pagination?: string
}
