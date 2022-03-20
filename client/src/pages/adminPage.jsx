import React from "react";
import { Table, Container } from "react-bootstrap"
import { useState } from "react";

function AdminPage() {
    const [state, setState] = useState({
        isConfirm: 0,
    })


    return(
        <>
            <Container>
            <h1>Income Transaction</h1>
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
                <tr>
                <td>1</td>
                <td>Sugeng</td>
                <td>Cileungsi</td>
                <td>16820</td>
                <td>69.000</td>
                <td>Waiting Approve</td>
                <td>
                    <div className="d-flex justify-content-center gap-2">
                        <button type="button" class="btn btn-success">Approve</button>
                        <button type="button" class="btn btn-danger">Cancel</button>
                    </div>
                </td>
                </tr>
                <tr>
                <td>2</td>
                <td>Haris</td>
                <td>Serang</td>
                <td>42111</td>
                <td>30.000</td>
                <td>Success</td>
                <td><i><img src="/images/IconApprove.png" alt="" /></i></td>
                </tr>
                <tr>
                <td>3</td>
                <td>Aziz</td>
                <td>Bekasi</td>
                <td>13450</td>
                <td>28.000</td>
                <td>Cancel</td>
                <td><i><img src="/images/IconCancel.png" alt="" /></i></td>
                </tr>
                <tr>
                <td>4</td>
                <td>Lae</td>
                <td>Tanjung Balai</td>
                <td>21331</td>
                <td>30.000</td>
                <td>On The Way</td>
                <td><i><img src="/images/IconApprove.png" alt="" /></i></td>
                </tr>
            </tbody>
            </Table>
            </Container>
        </>
    )
}

export default AdminPage