import React, {useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";


const UpdateProduct=()=>{

    const [name,setName] =useState("");
    const [price,setPrice] =useState("");
    const [category,setCategory] =useState("");
    const [company,setCompany] =useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
    
        getProductDetail()
    })

    const getProductDetail=async()=>{
        let result = await fetch(`http://localhost:3000/updateproduct/${params.id}`);
         result = await result.json();
         console.log(result);
         setName(result.name);
         setPrice(result.price);
         setCategory(result.category);
         setCompany(result.company);
    }

    const updateProduct =  async()=>{
        console.log(name, price , category , company)
        let result = await fetch(`http://localhost:3000/getoneproduct/${params.id}`,{
            method :'Put',
            body: JSON.stringify({name, price, category, company}),
            headers :{
                'Content-Type': "applicaton/json"
            }
        });
        result = await result.json()
        navigate("/");
    }





    return (
        <> 
          <h1 className="h1 update"> Update product </h1>
          
        <div className="addproduct">
           
          

            <input className="inputBox" type="text" placeholder="Enter name of product" required
            value={name} onChange={(e)=>{setName(e.target.value)}}/>
          
            <input className="inputBox" type="text" placeholder="Enter name of price" required
            value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
         

            <input className="inputBox" type="text" placeholder="Enter name of category" required
            value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
          

            <input className="inputBox" type="text" placeholder="Enter name of company" required
            value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
         

            <button className="btn"  onClick={updateProduct} > Update Product</button>
                
        </div>
        </>
    )
}

export default UpdateProduct;