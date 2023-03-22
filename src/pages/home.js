import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {

    const [options, setOptions] = useState([])
    const [marks, setMarks] = useState({});

    useEffect(() => {
        const fetchOption = async () => {
            try {
                const response = await axios.get("http://localhost:3001/options");
                setOptions(response.data);

                const symbolArray = response.data.map(obj => obj.symbol);
                console.log(symbolArray);
                const markRequests = symbolArray.map(symbol => axios.get(`http://127.0.0.1:8000/stock/${symbol}`));
                const markResponses = await Promise.all(markRequests);

                const newMarks = {};
                markResponses.forEach((response, index) => {
                    const symbol = symbolArray[index];
                    newMarks[symbol] = response.data.mark;
                });
                setMarks(newMarks);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOption();
    }, [])

    return (
        <div>
          <h2>Options</h2>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Strike</th>
                <th>Purchase Date</th>
                <th>Expiration Date</th>
                <th>Collateral</th>
                <th>Credit</th>
                <th>% return on collateral</th>
                <th>Breakeven</th>
                <th>Quote</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option) => (
                <tr key={option._id}>
                  <td>{option.symbol}</td>
                  <td>{option.strike}</td>
                  <td>{new Date(option.purchaseDate).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: '2-digit'
                    })}</td>
                    <td>{new Date(option.expDate).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: '2-digit'
                    })}</td>
                  <td>{option.collateral}</td>
                  <td>{option.credit}</td>
                  <td>{((option.credit / option.collateral).toFixed(2)) * 100}%</td>
                  <td>${(option.credit - option.collateral) * -1 / 100}</td>
                  <td>{marks[option.symbol]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};