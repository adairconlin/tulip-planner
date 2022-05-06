import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/mutations";
import { QUERY_MY_CATEGORIES } from "../../utils/queries";

const CategoryForm = ({ updateCategoryState, setDefault, defaultCategory, openForm, openCategoryForm }) => {
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

    const colorSelect = e => {
        setCatForm({
            ...catForm,
            color: e.target.className
        });

        if(e.target.children.length < 1) {
            const xMark = document.createElement("span");
            xMark.textContent = "X";
            xMark.className = "handwriting para";
    
            e.target.style.border = "3px solid gray";
    
            e.target.appendChild(xMark);
        }
    }

    const createCategory = async (e) => {
        e.preventDefault();

        setDefault(catForm.categoryName);
        openCategoryForm();

        try {
            const { data } = await addCategory({
                variables: { ...catForm }
            });
        } catch(e) {
            console.log(e);
        }

        updateCategoryState(catForm.categoryName);
;
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
                                    return <p className="main-red handwriting category-list" key={cat?._id} onClick={chooseCategory}>{cat?.categoryName}</p>
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
                    <section className="radio-btns">
                        <div name="color" className="red" onClick={colorSelect} />
                        <div name="color" className="orange" onClick={colorSelect} />
                        <div name="color" className="lt-green" onClick={colorSelect} />
                        <div name="color" className="green" onClick={colorSelect} />
                    </section>
                    <section className="radio-btns">
                        <div name="color" className="lt-blue" onClick={colorSelect} />
                        <div name="color" className="blue" onClick={colorSelect} />
                        <div name="color" className="purple" onClick={colorSelect} />
                        <div name="color" className="pink" onClick={colorSelect} />
                    </section>
                    
                    <button className="green-btn font subtitle" onClick={createCategory}>save and select</button>
                </>
            }
        </>
    )
}

export default CategoryForm;