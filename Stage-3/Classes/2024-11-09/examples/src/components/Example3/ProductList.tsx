import { useEffect, useState, ChangeEvent } from "react";
import productData from "../../data/products.json";
import ProductDetails from "./ProductDetails";
import CustomInput from './CustomInput';
/* New variable imported */


interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    stock: number;
    description: string;
}

interface ProductListProps {
    category: Category;
    categories: Category[];
}

const ProductList = ({ category, categories }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    
    /* New additions to Mr.Karel's code */
    const [allProducts, setAllProducts] = useState<Product[]>(productData);
    const [productNameField, setProductNameField] = useState("");
    const [productPriceField, setProductPriceField] = useState<number>(0);
    const [productStockField, setProductStockField] = useState<number>(0);
    const [productDescriptionField, setProductDescriptionField] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>(-1);
    const [errorMessage, setErrorMessage] = useState("");

    const handleProductName = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductName = e.target.value;
        setProductNameField(newProductName);
    }
    const handleProductPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductPrice = parseInt(e.target.value);
            setProductPriceField(newProductPrice);
    }
    const handleProductStock = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductStock = parseInt(e.target.value);
        setProductStockField(newProductStock);
    }
    const handleProductDescription = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductDesc = e.target.value;
        setProductDescriptionField(newProductDesc);
    }

    const handleAddProductButtonClick = ()=>{
        setErrorMessage("");
        if(!productNameField){
            setErrorMessage("Please fill product name field.");
            return
        }
        if(!productPriceField || productPriceField == 0){
            setErrorMessage("Price must not be 0");
            return
        }
        if(!productStockField || productStockField == 0){
            setErrorMessage("Stock must not be 0");
            return
        }
        if(!productDescriptionField){
            setErrorMessage("Please fill product description field.");
            return
        }
        
        if(!selectedCategory){
            setErrorMessage("Please select a category.");
            return
        }
        
        const i = allProducts.length;
        const newId = allProducts[i-1].id + 1;
        let productExists = false;
        let categoryName = "";
        for(let x = 0; x < allProducts.length; x++){
            if(allProducts[x].name.toLocaleLowerCase() == productNameField.toLocaleLowerCase()){
                for (let y = 0; y<categories.length; y++ ){
                    if(allProducts[x].categoryId == categories[y].id){
                        categoryName = categories[y].name;
                    }
                }
                productExists = true;
                setErrorMessage(`This product already exists in ${categoryName}!`);
            }
        }
        if(!productExists){
            setAllProducts([...allProducts, {id: newId, name: productNameField, categoryId: selectedCategory, price: productPriceField, stock: productStockField, description: productDescriptionField }]);
        } 

    }
    /* End of new additions */
    // The code inside this useEffect will run when the category prop changes
    useEffect(() => {
        // Reset active product
        setActiveProduct(null);

        // replaced productData with allProducts, and updated the conditions of the useEffect's refresh to include changes in allProducts not just category
        setProducts(
            allProducts.filter((product) => product.categoryId === category.id)
        );
    }, [category, allProducts]);

    return (
        <>
            <div className="p-4">
                <h2 className="d-inline">Products in {category.name}</h2>
                {/* NEW Additions to Mr.Karel's Code */}
                <CustomInput value={productNameField} onChange={handleProductName} placeholder="Product name..." type="text"/>
                <CustomInput value={productPriceField} onChange={handleProductPrice} placeholder="Product Price..." type="number"/>
                <CustomInput value={productStockField} onChange={handleProductStock} placeholder="Product Stock..." type="number"/>
                <CustomInput value={productDescriptionField} onChange={handleProductDescription} placeholder="Product Description..." type="text"/>

                <select className = "d-inline input-group-text ms-3" name = "Category" defaultValue = {""}
                value = {selectedCategory}
                onChange = {e => setSelectedCategory(parseInt(e.target.value))}>
                    <option value="-1"  disabled>Select a category</option>
                {categories.map((category) => (
                       <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <button className="btn btn-primary ms-4 mb-2" onClick={handleAddProductButtonClick}>Add Product</button>
                <p className="d-inline ms-4">{errorMessage}</p>
                {/* End of new Additions */}
                <div className="list-group">
                    {products.map((product) => (
                        <a
                            href="#"
                            key={`product-${product.id}`}
                            className={`list-group-item list-group-item-action ${
                                product.id === activeProduct?.id ? "active" : ""
                            }`}
                            onClick={() => setActiveProduct(product)}
                        >
                            {product.name}
                        </a>
                    ))}
                </div>
            </div>
            {activeProduct ? <ProductDetails product={activeProduct} /> : ""}
        </>
    );
};

export default ProductList;
