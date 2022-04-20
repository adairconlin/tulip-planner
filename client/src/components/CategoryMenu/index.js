import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/mutations";
import { QUERY_MY_CATEGORIES } from "../../utils/queries";

const CategoryForm = () => {
    // Query for your categories
    const { loading, data } = useQuery(QUERY_MY_CATEGORIES);
    const categories = data?.myCategories || [];

    const [categoryInput, setCategoryInput] = useState(true);
    const showCategoryForm = () => {
        setCategoryInput(!categoryInput);
        document.querySelector(".dropdown-content").style.display = "block";
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
        try {
            const { data } = await addCategory({
                variables: { ...catForm }
            });
        } catch(e) {
            console.log(e);
        }
    };

    if(loading) {
        return (
            <p>Loading categories...</p>
        )
    }

    return (
            <>
                <div className="dropdown">
                    <a>Category:</a>
                    <div className="dropdown-content">
                        {categories?.length && 
                            categories?.map(cat => {
                                return <p key={cat?._id}>{cat?.categoryName}</p>
                            })
                        }

                        { categoryInput  ?
                                <button onClick={showCategoryForm} 
                                    className="subtitle">+ Add New Category</button> :
                            <>
                                <label htmlFor="categoryName">Category Name:</label>
                                <input name="categoryName" onChange={handleFormChange} />
                                
                                <label htmlFor="color">Color:</label>
                                <input name="color" onChange={handleFormChange} />
                                
                                <button onClick={createCategory}>save category</button>
                            </>
                        }
                    </div>
                </div>



            </>
    )
}

export default CategoryForm;