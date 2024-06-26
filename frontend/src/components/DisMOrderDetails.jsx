import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../DistributionFun.css';

const DisMOrderDetails = ({ order }) => {
    const { dispatch } = useOrdersContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        const result = await Swal.fire({
            title: "Do you want to delete this record?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/orders/' + order._id, {
                    method: 'DELETE'
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'DELETE_ORDER', payload: json });
                    Swal.fire("Deleted", "", "success");
                } else {
                    throw new Error('Failed to delete order');
                }
            } catch (error) {
                console.error(error);
                Swal.fire("Error Occurred", "Failed to delete order. Please try again.", "error");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/update-order/${order._id}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Placed":
                return "blue";
            case "Approved":
                return "green";
            case "Cancelled":
                return "red";
            case "Collectible":
                return "orange";
            default:
                return "black"; 
        }
    };

    return (
        <div className="order-details">
            <Paper style={{ width: '100%' }}>
                <Table aria-label="order-details-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Distributor ID</TableCell>
                            <TableCell>Distributor Name</TableCell>
                            <TableCell>Order Status</TableCell>
                            {/* Item details headers */}
                            <TableCell>Item Code</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Unit Price(lkr)</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Cost(lkr)</TableCell>
                            <TableCell>Total Amount to Pay(lkr)</TableCell>
                            <TableCell>Order Placed Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Display details for each item */}
                        {order.items.map((item, index) => (
                            <TableRow key={index}>
                                {/* Display order details only for the first item */}
                                {index === 0 && (
                                    <>
                                        <TableCell rowSpan={order.items.length}>{order._id}</TableCell>
                                        <TableCell rowSpan={order.items.length}>{order.distributorId}</TableCell>
                                        <TableCell rowSpan={order.items.length}>{order.distributorName}</TableCell>
                                        <TableCell rowSpan={order.items.length}>
                                        <span style={{ fontWeight: 'bold', color: getStatusColor(order.orderStatus) }}>{order.orderStatus}</span></TableCell>
                                    </>
                                )}
                                {/* Display item details */}
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unit * item.quantity}</TableCell>
                                {/* Display total amount to pay and created at */}
                                {index === 0 && ( // Only display these once for the first item
                                    <>
                                        <TableCell rowSpan={order.items.length}>{order.totalAmount}</TableCell>
                                        <TableCell rowSpan={order.items.length}>{format(new Date(order.createdAt), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell rowSpan={order.items.length}>
                                            {/* Action buttons */}
                                            <div className="action-buttons">
                                                <button onClick={handleClick} className="btn-delete">Delete</button>
                                                <button onClick={handleEdit} className="btn-edit">Edit</button>
                                            </div>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default DisMOrderDetails;