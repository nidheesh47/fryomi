import React from 'react';
import { useParams } from 'react-router';
import useFetch from '../../Hooks/UseFetch';
import DataTable from 'react-data-table-component';
import { axiosInstance } from '../../config/axiosInstance';

const Orders = () => {
  const { id } = useParams();
  const [orderData, isLoading, error] = useFetch(`/order/get-all-restaurant-orders/${id}`);
  
  const orders = orderData?.orders;

  const updateOrderStatus = async (orderId) => {
    console.log(orderId)
    try {
      console.log('tryBlock', orderId)
      const response = await axiosInstance.patch(`/order/update-order-status/${orderId}`)
      alert("updated successfully")
      window.location.reload()
    } catch (error) {
      
    }
  }
  
  const columns = [
    {
      name: 'Order ID',
      selector: row => row._id,
    },
    {
      name: 'Restaurant',
      selector: row => row.restaurant.name,
    },
    {
      name: 'Status',
      selector: row => row.status,
    },
    {
      name: 'Final Price',
      selector: row => row.finalPrice,
    },
    {
      name: 'Created At',
      selector: row => new Date(row.createdAt).toLocaleString(),
    },
    {
        name: 'Actions',
        cell: row => (
          <button
            onClick={() => updateOrderStatus(row._id)}
            disabled={row.status === 'delivered'}
            style={{
              padding: '6px 12px',
              backgroundColor: row.status === 'delivered' ? '#ccc' : '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: row.status === 'delivered' ? 'not-allowed' : 'pointer',
            }}
          >
            Update Status
          </button>
        ),
      },
  ];

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {orders && (
        <DataTable
          columns={columns}
          data={orders}
          pagination
        />
      )}
    </div>
  );
};

export default Orders;
