import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

function BuyerDashboard() {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const res = await API.get("/listings");
    setListings(res.data);
  };

  const buyCredits = async (id) => {
    await API.post(`/transactions/buy?buyerId=3&listingId=${id}&quantity=10`);
    fetchListings();
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Buyer Dashboard</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Buy</th>
            </tr>
          </thead>

          <tbody>
            {listings.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.pricePerCredit}</td>
                <td>{l.listedQuantity}</td>
                <td>
                  <button onClick={()=>buyCredits(l.id)}>Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default BuyerDashboard;