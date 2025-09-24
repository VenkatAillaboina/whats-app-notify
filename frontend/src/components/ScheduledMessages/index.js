import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import MessageItem from '../MessageItem';
import './index.css';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

const ScheduledMessages = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    const fetchMessages = async () => {
      setStatus(STATUS.LOADING);
      try {
        const response = await fetch('http://localhost:8080/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMessages(data.data || []);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        setStatus(STATUS.FAILURE);
      }
    };

    fetchMessages();
  }, []);

  const renderLoadingView = () => (
    <div className="loader-container">
      <ClipLoader color="#1e88e5" size={50} />
      <p>Loading messages...</p>
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="Failed"
        className="failure-img"
      />
      <p className="status-message error">Failed to fetch messages.</p>
    </div>
  );

  const renderSuccessView = () => {
    if (messages.length === 0) {
      return (
        <p className="status-message warning">No scheduled messages found.</p>
      );
    }

    return (
      <div className="table-responsive">
        <table className="messages-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <MessageItem key={msg._id} msg={msg} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderView = () => {
    switch (status) {
      case STATUS.LOADING:
        return renderLoadingView();
      case STATUS.FAILURE:
        return renderFailureView();
      case STATUS.SUCCESS:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div className="scheduled-messages">
      <h2>Scheduled Messages</h2>
      {renderView()}
    </div>
  );
};

export default ScheduledMessages;