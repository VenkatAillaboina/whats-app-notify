import './index.css';

const MessageItem = ({ msg }) => {
  const dateObj = new Date(msg.initialDateTime);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <tr className={`message-item-row ${msg.isCompleted ? 'completed-row' : ''}`}>
      <td className="message-item-cell" data-label="First Name">{msg.firstName}</td>
      <td className="message-item-cell" data-label="Last Name">{msg.lastName}</td>
      <td className="message-item-cell" data-label="Email">{msg.email}</td>
      <td className="message-item-cell" data-label="Phone">{msg.phone}</td>
      <td className="message-item-cell" data-label="Message">{msg.message}</td>
      <td className="message-item-cell" data-label="Date">{date}</td>
      <td className="message-item-cell" data-label="Time">{time}</td>
      <td className="message-item-cell" data-label="Status">
        <span className={`status-badge ${msg.isCompleted ? 'success' : 'pending'}`}>
          {msg.isCompleted ? 'Completed' : 'Pending'}
        </span>
      </td>
    </tr>
  );
};

export default MessageItem;