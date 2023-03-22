import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {

    const [options, setOptions] = useState([])
    const [marks, setMarks] = useState({});

    useEffect(() => {
        const fetchOption = async () => {
            try {
                const response = await axios.get("http://localhost:3001/options");
                
                // Update the 'options' state variable with the response data
                setOptions(response.data);

                // Extract the symbols from the option data and store them in an array
                const symbolArray = response.data.map((obj) => obj.symbol);

                // Create an array of requests to retrieve stock data for each symbol using the 'map' function
                const markRequests = symbolArray.map((symbol) =>
                  axios.get(`http://127.0.0.1:8000/stock/${symbol}`)
                );
                // Wait for all the requests to complete using the 'Promise.all' function
                const markResponses = await Promise.all(markRequests);

                // Create a new object to store the marks for each symbol
                const newMarks = {};
                // Iterate over the mark responses and extract the mark value for each symbol
                markResponses.forEach((response, index) => {
                  const symbol = symbolArray[index];
                  newMarks[symbol] = response.data.mark;
                });
                // Update the 'marks' state variable with the new marks object
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