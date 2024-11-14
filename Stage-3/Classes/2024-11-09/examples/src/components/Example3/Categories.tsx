import { useEffect, useState, ChangeEvent } from "react";
import categoryData from "../../data/categories.json";
import ProductList from "./ProductList";

interface Category {
    id: number;
    name: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setactiveCategory] = useState<Category | null>(null);

    /* New additions to Mr.Karel's code */
    const [categoryField, setCategoryField] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleCategoryName = (e: ChangeEvent<HTMLInputElement>) => {
        const newCategoryName = e.target.value;
        setCategoryField(newCategoryName);
    }
    const handleAddCategoryButtonClick = ()=>{
        if(categoryField != "" && categoryField){
            setErrorMessage("");
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
            }
            
        }else{
            setErrorMessage("Please fill the category name field first.")
        }
    }
    /* End of new additions */

    // The code inside this useEffect will run when the component mounts
    useEffect(() => {
        setCategories(categoryData);
    }, []);

    return (
        <>
            <div className="p-4">
                <h2 className="d-inline">Categories</h2>

                {/* NEW Additions to Mr.Karel's Code */}
                <input type="text" value={categoryField} className="ms-4 d-inline input-group-text" 
                placeholder="Category name..." onChange={handleCategoryName} />
                <button className="btn btn-primary ms-4 mb-2" onClick={handleAddCategoryButtonClick}>Add New Category</button>
                <p className="d-inline ms-4">{errorMessage}</p>
                {/* End of new Additions */}

                <div className="list-group">
                    {categories.map((category) => (
                        <a
                            href="#"
                            key={`product-${category.id}`}
                            className={`list-group-item list-group-item-action ${
                                category.id === activeCategory?.id
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setactiveCategory(category)}
                        >
                            {category.name}
                        </a>
                    ))}
                </div>
            </div>
            {activeCategory ? <ProductList category={activeCategory} /> : ""}
        </>
    );
};

export default Categories;
