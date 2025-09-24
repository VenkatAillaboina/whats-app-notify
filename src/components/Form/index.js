import './index.css'

const Form = () => {
    return (
        <form className="form">
            <div className="label-input-group">
                <label className="form-label" htmlFor="first-name">First Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder="Enter your first name"
                />
            </div>

            <div className="label-input-group">
                <label className="form-label" htmlFor="last-name">Last Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="last-name"
                    name="last-name"
                    placeholder="Enter your last name"
                />
            </div>

            <div className="label-input-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                    className="form-input textarea"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                />
            </div>

            <div className="label-input-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                />
            </div>

            <div className="separator">
                <hr />
                <span>OR</span>
                <hr />
            </div>

            <div className="label-input-group">
                <label className="form-label" htmlFor="number">Number</label>
                <input
                    className="form-input"
                    type="number"
                    id="number"
                    name="number"
                    placeholder="Enter your number"
                />
            </div>

            <div className="date-time-row">
                <div className="label-input-group">
                    <label className="form-label" htmlFor="date">Select Date</label>
                    <input className="form-input" type="date" id="date" name="date" />
                </div>

                <div className="label-input-group">
                    <label className="form-label" htmlFor="time">Select Time</label>
                    <input className="form-input" type="time" id="time" name="time" />
                </div>
            </div>
            
            <button className="submit-button" type="submit">Submit</button>
        </form>
    )
}

export default Form
