import { FC } from 'react';
import styles from "./catalog.module.scss";
import List from "../List";
import Product from "./Product";
import { useAppSelector } from "../../app/hooks";
import { BigSpinner } from "../Preloader";
import { getCombinedData, searchProducts } from "../../utils/common/productsFilter";
import { Element } from 'react-scroll'
import useTheme from '../../hooks/useTheme';

type CatalogProps = {
    search: string
}

const Catalog: FC<CatalogProps> = ({ search }) => {
    const gTheme = useTheme()

    const { categories, products } = useAppSelector(state => state)
    const isLoaded = !categories.isLoading && !products.productsLoading
    const searchedData = searchProducts(search, getCombinedData(categories.category, products.items))

    return (
        <>
            {isLoaded ?
                <div className="block f-column gap-40 ">
                    {
                        searchedData.length > 0 ?
                            searchedData.map(category => (
                                <Element name={`ctg-${category.id}`} key={category.id} className={`${styles.categoryBlock} f-column gap-20`}>
                                    <h2 className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>{category?.title}</h2>
                                    <List
                                        listBlockClassname={`${styles.catalogPartList} d-f flex-wrap gap-20`}
                                        list={category?.products}
                                        listItemClassname={styles.catalogProductWrapper}
                                        renderItem={(product) => {
                                            return <Product
                                                key={product.id}
                                                {...product}
                                            />
                                        }}
                                    />
                                </Element>
                            )) :
                            <p className={`${styles.notFoundedText} ${gTheme("lt-lg-c", " grayColor_dark")}`}>{search.length ? `По запросу: ${search} ничего не найдено.` : "Здесь пока нет товаров."}</p>
                    }
                </div> :
                <BigSpinner />
            }
        </>
    );
};

export default Catalog;