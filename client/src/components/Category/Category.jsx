import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getCategories } from "../../redux/StoreBooks/booksActions.js";
import "./Category.css";

export default function Category (){
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.books);

    function viewCategory(index){
        console.log(categories[index]);
        return (<div>
            {JSON.stringify(categories[index]) !=='{}' && Object.keys(categories[index]).sort()
                .map((el) => 
                <div className="subCategoryDiv" key={el}>
                    <Link to ={`/results/${index.split(" ").join("-")}/${el.split(" ").join("-")}`} style={{ textDecoration: "none" }}>
                        <li>{el[0].toLocaleUpperCase() + el.slice(1)}</li>
                    </Link>

                    {JSON.stringify(categories[index][el]) !=='{}' && Object.keys(categories[index][el]).sort()
                    .map((elx) => 
                    <div className="subToCategoryDiv" key={elx}>
                        <Link to ={`/results/${index.split(" ").join("-")}/${el.split(" ").join("-")}/${elx.split(" ").join("-")}`} style={{ textDecoration: "none" }}>
                            <span>{elx[0].toLocaleUpperCase() + elx.slice(1)}</span>
                        </Link>
                    </div>
                    )}

                </div>
            )}
        </div>);
    }


    useEffect(() => {
        if (!Object.keys(categories).length) dispatch(getCategories());
      }, [dispatch]);

    return(
        <div className="contentCategory">
            <div className="titleForm">
                <p>Categories</p>
            </div>

            <div className="contentCategoryDiv">
                {JSON.stringify(categories).length !== '{}' && Object.keys(categories).sort()
                .map((el) =>
                <div className="categoryDiv" key={el}>
                    <p>{el[0].toLocaleUpperCase() + el.slice(1)}</p>
                    {viewCategory(el)}
                </div>)}
            </div>

            <div className="formBack">
                <Link to ="/" style={{ textDecoration: "none" }}>
                    <button className="buttonBack">Back</button>
                </Link>
            </div>
        </div>
    );
}