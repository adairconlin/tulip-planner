import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/mutations";
import { QUERY_MY_CATEGORIES } from "../../utils/queries";

const CategoryForm = ({ updateCategoryState, defaultCategory }) => {
    if(!defaultCategory) {
        defaultCategory = "Choose Category";
    }

    // Query for your categories
    const { loading, data } = useQuery(QUERY_MY_CATEGORIES);
    const categories = data?.myCategories || [];

    const [categoryInput, setCategoryInput] = useState(true);
    const showCategoryForm = () => {
        setCategoryInput(!categoryInput);
        document.querySelector(".dropdown-content").style.display = "block";
    }

    const chooseCategory = e => {
        let categoryTitle = document.querySelector('[name="category"]');
        categoryTitle.innerHTML = e.target.innerHTML;

        updateCategoryState(e.target.innerHTML);
    }

    const [catForm, setCatForm] = useState(
        {
            categoryName: "",
            color: "",
        })

    const [addCategory, { error }] = useMutation(ADD_CATEGORY);
    const handleFormChange = e => {
        const { name, value } = e.target;
        setCatForm({
            ...catForm,
            [name]: value
        });
    }

    const createCategory = async (e) => {
        e.preventDefault();
        let categoryTitle = document.querySelector('[name="category"]');
        categoryTitle.innerHTML = catForm.categoryName;
        setCategoryInput(true);

        try {
            const { data } = await addCategory({
                variables: { ...catForm }
            });
        } catch(e) {
            console.log(e);
        }

        updateCategoryState(categoryTitle.innerHTML);
    };

    if(loading) {
        return (
            <p>Loading categories...</p>
        )
    }

    return (
            <>
                <a>Category:</a>
                <div className="dropdown">
                    <a name="category">{defaultCategory}</a>
                    <div className="dropdown-content">
                        {categories?.length ? 
                            categories?.map(cat => {
                                return <p key={cat?._id} onClick={chooseCategory}>{cat?.categoryName}</p>
                            }) : ""
                        }

                        { categoryInput  ?
                            <button onClick={showCategoryForm} 
                                className="subtitle">+ Add New Category</button> :
                            <> 
                                <label htmlFor="categoryName">Category Name:</label>
                                <input name="categoryName" onChange={handleFormChange} />
                                
                                <label htmlFor="color">Color:</label>
                                <input name="color" onChange={handleFormChange} />
                                
                                <button onClick={createCategory}>save and select category</button>
                            </>
                        }
                    </div>
                </div>



            </>
    )
}

export default CategoryForm;