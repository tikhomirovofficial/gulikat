import { Category, ProductRes } from "../../types/api/api.types";
import { N_CategoryApi } from "../../types/categories.types";
import { N_ProductApi } from "../../types/products.types";

export const getCombinedData = (categories: N_CategoryApi[], products: N_ProductApi[]) => {

    return categories.map((category: N_CategoryApi) => ({
        ...category,
        products: products.filter((product: N_ProductApi) => product.category.id === category.id),
    }));
}
// Функция поиска
export function searchProducts(query: string, data: ReturnType<typeof getCombinedData>) {
    const lowerQuery = query.toLowerCase()

    const filtered = data.filter(item => {
        const products = item.products.filter(prod => prod.title.toLowerCase().includes(lowerQuery));
        item.products = products
        if (products.length) {
            return item;
        }

    });

    return filtered
}
