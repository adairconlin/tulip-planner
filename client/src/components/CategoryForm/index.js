import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/mutations";

const CategoryForm = () => {
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

    return (
            <>
                <label htmlFor="categoryName">Category Name:</label>
                <input name="categoryName" onChange={handleFormChange} />
                
                <label htmlFor="color">Color:</label>
                <input name="color" onChange={handleFormChange} />
                
                <button onClick={createCategory}>save category</button>
            </>
    )
}

export default CategoryForm;