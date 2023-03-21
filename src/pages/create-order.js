import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {

    const userID = useGetUserID();

    const [option, setOption] = useState({
        symbol: "",
        strike: 0,
        purchaseDate: "",
        expDate: "",
        collateral: 0,
        credit: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOption({ ...option, [name]: value })
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/options", option);
            alert("Order Created!");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-order">
            <h2> Create Order </h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="symbol">Symbol</label>
                <input type="text" id="symbol" name="symbol" onChange={handleChange} />

                <label htmlFor="strike">Strike</label>
                <input type="number" id="strike" step="0.5" name="strike" onChange={handleChange} />

                <label htmlFor="purchaseDate">Purchase Date</label>
                <input type="date" id="purchaseDate" name="purchaseDate" onChange={handleChange} />

                <label htmlFor="expDate">Expiration Date</label>
                <input type="date" id="expDate" name="expDate" onChange={handleChange} />

                <label htmlFor="collateral">Collateral</label>
                <input type="number" id="collateral" name="collateral" onChange={handleChange} />

                <label htmlFor="credit">Credit</label>
                <input type="number" id="credit" name="credit" onChange={handleChange} />
                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};