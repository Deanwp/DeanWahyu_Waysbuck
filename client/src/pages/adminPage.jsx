import React, { useContext, useState, useEffect } from "react"
import { Container, Table, Col } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

function AdminPage() {
    const [transactions, setTransactions] = useState([]);
    // Fetching transaction data from database
    const getTransactions = async () => {
        try {
          const response = await API.get("/transactions");
          // Store transaction data to useState variabel
          setTransactions(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getTransactions();
      }, []);

    return(
        <>
            <Container>
            <h1>Income Transaction</h1>
            {transactions.length !== 0 ? (
            <Table className="text-center justify-content center">
            <thead>
                <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            
            <tbody>
                {transactions?.map((item, index) => (
                <tr>
                <td>1</td>
                <td>{item.user.name}</td>
                <td>Nganjuk</td>
                <td>123456</td>
                <td>33.000</td>
                <td>{item.status}</td>
                <td><i><img src="/images/IconApprove.png" alt="" /></i></td>
                </tr>))}
            </tbody>
            </Table>) : 
            (<Col>
                <div className="text-center pt-5">
                  <img className="img-fluid" style={{ width: "40%" }} alt="empty"  src="/images/nodata-founds.png"/>
                </div>
            </Col>)}
            </Container>
        </>
    )
}

export default AdminPage