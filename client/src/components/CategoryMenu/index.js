import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/mutations";
import { QUERY_MY_CATEGORIES } from "../../utils/queries";

const CategoryForm = ({ updateCategoryState, defaultCategory, openForm, openCategoryForm }) => {
    if(!defaultCategory) {
        defaultCategory = "Choose a category...";
    }

    // Query for your categories
    const { loading, data } = useQuery(QUERY_MY_CATEGORIES);
    const categories = data?.myCategories || [];

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
        openCategoryForm();

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
        <> { !openForm ?
                <>
                    <a className="main-red font para">Category:</a>
                    <section className="dropdown">
                        <section>
                            <a className="main-red handwriting para" name="category">{defaultCategory}</a>
                        </section>
                        <section className="dropdown-content">
                            {categories?.length ? 
                                categories?.map(cat => {
                                    return <p key={cat?._id} onClick={chooseCategory}>{cat?.categoryName}</p>
                                }) : ""
                            }
                            
                            <button onClick={openCategoryForm} className="main-red font subtitle cat-btn">+ Add New Category</button>
                        </section>
                    </section>
                </> 
            :
                <>
                    <label className="main-red font para" htmlFor="categoryName">Category Name:</label>
                    <input className="main-green handwriting para" name="categoryName" onChange={handleFormChange} />
                    
                    <label className="main-red font para" htmlFor="color">Color:</label>
                    <input name="color" onChange={handleFormChange} />
                    
                    <button className="green-btn font subtitle" onClick={createCategory}>save and select</button>
                </>
            }
        </>
    )
}

export default CategoryForm;