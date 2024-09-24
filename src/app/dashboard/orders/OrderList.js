"use client";

export default function OrderList({ orders, onDelete, onEdit }) {
  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ccc' }}>
            <th style={headingStyle}>Order ID</th>
            <th style={headingStyle}>Status</th>
            <th style={headingStyle}>Item Brief</th>
            <th style={headingStyle}>Order Date</th>
            <th style={headingStyle}>Delivery Date</th>
            <th style={headingStyle}>Cost</th>
            <th style={headingStyle}>Amount Paid</th>
            <th style={headingStyle}>Amount Left</th>
            <th style={headingStyle}>Payment Method</th>
            <th style={headingStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} style={rowStyle}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{order.status}</td>
              <td style={cellStyle}>{order.itemBrief}</td>
              <td style={cellStyle}>{order.orderDate}</td>
              <td style={cellStyle}>{order.deliveryDate}</td>
              <td style={cellStyle}>${order.cost}</td>
              <td style={greenTextStyle}>${order.paymentReceived}</td>
              <td style={redTextStyle}>${order.paymentLeft}</td>
              <td style={cellStyle}>{order.paymentMethod}</td>
              <td style={cellStyle}>
                <button style={editButtonStyle} onClick={() => onEdit(order.id)}>✎</button> {/* Pencil for Edit */}
                <span style={{ marginRight: '10px' }} />  {/* Adding horizontal space */}
                <button style={deleteButtonStyle} onClick={() => onDelete(order.id)}>🗑️</button> {/* Trash for Delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Styling for the table headings */
const headingStyle = {
  padding: '12px',
  backgroundColor: '#f1f1f1',
  fontWeight: 'bold',
  borderBottom: '2px solid #ccc',
};

/* Styling for each table row */
const rowStyle = {
  backgroundColor: '#fafafa',
  borderBottom: '1px solid #ddd',
};

/* Styling for table cells */
const cellStyle = {
  padding: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

/* Styling for the delete button */
const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '18px',
};

/* Styling for the edit button */
const editButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '18px',
};

/* Green text for Amount Paid */
const greenTextStyle = {
  color: 'green',
  padding: '12px',
};

/* Red text for Amount Left */
const redTextStyle = {
  color: 'red',
  padding: '12px',
};
