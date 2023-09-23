import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()

    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:3000/getproduct");
        result = await result.json();
        setProducts(result)
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:3000/deleteproduct/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts()
        }

    }
    const searchHandler = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }



    }

    return (
        <div className=" product-list">
            <h1> Product     List </h1>
            <input className="inputBox search" type="search" placeholder="search product"
                onChange={searchHandler} />
            <ul className="ul1">
                <li>S.no </li>
                <li>name</li>
                <li>Price </li>
                <li>Category </li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            <div className="ul2">
                {
                    products.length > 0 ? products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button className="button" onClick={() => deleteProduct(item._id)}> Delete</button>
                                <button className="btn2"><Link to={"/update/" + item._id}> Update </Link></button>
                            </li>

                        </ul>)

                        : <h3>Result not found</h3>
                }</div>
        </div>

    )
}
export default Product