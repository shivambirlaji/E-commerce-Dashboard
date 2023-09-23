import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddProduct=()=>{

    const [name,setName] =useState("");
    const [price,setPrice] =useState("");
    const [category,setCategory] =useState("");
    const [company,setCompany] =useState("");
    const [error,setError]=useState(false);
    const navigate = useNavigate();




    const addProduct=async()=>{
        console.log(name,price,category,company);

        if(!name || !price || !category || !company){

            setError(true)
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:3000/addproduct',{
            method:'post',
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                'content-Type':'application/json'
            }
        }) ;

        result = await result.json();
        navigate("/")
    
       
    }


    return (
        <> <h1 className="h1">Add product </h1>
        
        <div className="addproduct">
           

            <input className="inputBox" type="text" placeholder="Enter name of product" required
            value={name} onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name && <span className="input-valid"> Enter valid name </span>}

            <input className="inputBox" type="text" placeholder="Enter name of price" required
            value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
           {error && !name && <span className="input-valid"> Enter valid price </span>}

            <input className="inputBox" type="text" placeholder="Enter name of category" required
            value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !name && <span className="input-valid"> Enter valid category </span>}

            <input className="inputBox" type="text" placeholder="Enter name of company" required
            value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !name && <span className="input-valid"> Enter valid company </span>}

            <button className="btn"  onClick={addProduct} > Add-Product</button>
                
        </div>
        </>
    )
}

export default AddProduct