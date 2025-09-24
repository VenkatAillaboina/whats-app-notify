import { useState } from 'react'
import { FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi'
import './index.css'

const STATUS_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

const Form = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !message || !email || !number || !date || !time) {
      setStatus('Please fill in all fields before submitting.')
      setStatusType(STATUS_TYPES.WARNING)
      return
    }

    const payload = {
      firstName,
      lastName,
      message,
      email,
      phone: `+91${number}`, // hardcoded country code +91
      date,
      time
    }

    try {
      const response = await fetch('http://localhost:8080/users/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setStatus('Scheduled successfully!')
        setStatusType(STATUS_TYPES.SUCCESS)
        setFirstName('')
        setLastName('')
        setMessage('')
        setEmail('')
        setNumber('')
        setDate('')
        setTime('')
      } else {
        const errData = await response.json()
        setStatus(errData.message || 'Failed to schedule')
        setStatusType(STATUS_TYPES.ERROR)
      }
    } catch (error) {
      setStatus(`Network error: ${error.message}`)
      setStatusType(STATUS_TYPES.ERROR)
    }
  }

  const renderIcon = () => {
    switch (statusType) {
      case STATUS_TYPES.SUCCESS:
        return <FiCheckCircle className="status-icon success" />
      case STATUS_TYPES.WARNING:
        return <FiAlertCircle className="status-icon warning" />
      case STATUS_TYPES.ERROR:
        return <FiXCircle className="status-icon error" />
      default:
        return null
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="label-input-group">
        <label className="form-label" htmlFor="first-name">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-input"
          type="text"
          id="first-name"
          placeholder="Enter your first name"
        />
      </div>

      <div className="label-input-group">
        <label className="form-label" htmlFor="last-name">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-input"
          type="text"
          id="last-name"
          placeholder="Enter your last name"
        />
      </div>

      <div className="label-input-group">
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input textarea"
          id="message"
          placeholder="Enter your message"
        />
      </div>

      <div className="label-input-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          type="email"
          id="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="label-input-group">
        <label className="form-label" htmlFor="number">Phone Number</label>
        <div className="phone-input">
          <span className="country-code">+91</span>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="form-input phone-field"
            type="text"
            id="number"
            placeholder="Enter your number"
          />
        </div>
      </div>

      <div className="date-time-row">
        <div className="label-input-group">
          <label className="form-label" htmlFor="date">Select Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
            type="date"
            id="date"
          />
        </div>

        <div className="label-input-group">
          <label className="form-label" htmlFor="time">Select Time</label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="form-input"
            type="time"
            id="time"
          />
        </div>
      </div>

      <button className="submit-button" type="submit">Submit</button>

      {status && (
        <p className={`status-message ${statusType}`}>
          {renderIcon()} {status}
        </p>
      )}
    </form>
  )
}

export default Form
