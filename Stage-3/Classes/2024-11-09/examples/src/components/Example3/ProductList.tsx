import { useEffect, useState, ChangeEvent } from "react";
import productData from "../../data/products.json";
import ProductDetails from "./ProductDetails";
import Categories  from "./Categories";

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
}

const ProductList = ({ category }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    /* New additions to Mr.Karel's code */
    const [productNameField, setProductNameField] = useState("");
    const [productPriceField, setProductPriceField] = useState("");
    const [productStockField, setProductStockField] = useState("");
    const [productDescriptionField, setProductDescriptionField] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleProductName = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductName = e.target.value;
        setProductNameField(newProductName);
    }
    const handleProductPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductPrice = e.target.value;
        setProductPriceField(newProductPrice);
    }
    const handleProductStock = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductStock = e.target.value;
        setProductStockField(newProductStock);
    }
    const handleProductDescription = (e: ChangeEvent<HTMLInputElement>) => {
        const newProductDesc = e.target.value;
        setProductDescriptionField(newProductDesc);
    }
    const handleAddProductButtonClick = ()=>{
        if(!productDescriptionField){
            setErrorMessage("Please fill product description field.");
        }
        if(!productStockField){
            setErrorMessage("Please fill product stock field.");
        }
        if(!productPriceField){
            setErrorMessage("Please fill product price field.");
        }
        if(!productNameField){
            setErrorMessage("Please fill product name field.");
        }

          /*   setErrorMessage("");
            const i = categories.length;
            const newId = categories[i-1].id + 1;
            let categoryExists = false;
            for(let x = 0; x < categories.length; x++){
                console.log(x);
                if(categories[x].name.toLocaleLowerCase() == categoryField.toLocaleLowerCase()){
                    categoryExists = true;
                    setErrorMessage("This category already exists!");
                }
            }
            if(!categoryExists){
                setCategories([...categories, {id: newId, name:categoryField}]);
            } */

    }
    /* End of new additions */
    // The code inside this useEffect will run when the category prop changes
    useEffect(() => {
        // Reset active product
        setActiveProduct(null);

        // Update products state based on the category
        setProducts(
            productData.filter((product) => product.categoryId === category.id)
        );
    }, [category]);

    return (
        <>
            <div className="p-4">
                <h2 className="d-inline">Products in {category.name}</h2>
                {/* NEW Additions to Mr.Karel's Code */}
                <input type="text" value={productNameField} className="ms-4 d-inline input-group-text" 
                    placeholder="Product name..." onChange={handleProductName} />
                <input type="text" value={productPriceField} className="ms-4 d-inline input-group-text" 
                    placeholder="Product Price..." onChange={handleProductPrice} />
                <input type="text" value={productStockField} className="ms-4 d-inline input-group-text" 
                    placeholder="Product Stock..." onChange={handleProductStock} />
                <input type="text" value={productDescriptionField} className="ms-4 d-inline input-group-text" 
                    placeholder="Product Description..." onChange={handleProductDescription} />
                <select className = "form-select" name="CategorySelection">
                {Categories.map((category) => (
                       <option value={category.name}></option>
                    ))}
                </select>
                <button className="btn btn-primary ms-4 mb-2" onClick={handleAddProductButtonClick}>Add New Product</button>
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
