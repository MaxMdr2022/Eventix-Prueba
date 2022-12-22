import React from "react";
import { useDispatch } from "react-redux";
import { sort } from "../../Redux/actions";

const Sort = ()=>{


    const dispatch = useDispatch();

    const handleSort = (e)=>{

        e.preventDefault();
        dispatch(sort(e.target.value))
    };

    return (

        <div>
            <select onChange={(e)=> handleSort(e)}>
                <option value={"notSort"}>Not Sort</option>
                <option value={"A-Z"}>A-Z</option>
                <option value={"Z-A"}>Z-A</option>
            </select>
        </div>
    )
};

export default Sort;