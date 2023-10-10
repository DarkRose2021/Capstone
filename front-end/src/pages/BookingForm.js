import React from 'react'

const BookingForm = () => {
  return (
  <div className='booking'>
    <h1>Booking Information</h1>
    <div className="form">
        <div>
            <form>
                <label>Full Name</label><br />
                <input type='text' required /><br />
                <label>Email</label><br />
                <input type='email' required /><br />
                <label>Phone Number</label><br />
                <input type='tel' required /><br />
                <label>Location</label><br />
                <input type='text' required /><br />
                <label>Message</label><br />
                <textarea /><br />
                <label>Type of session you are interested in?</label><br />
                <select required>
                    <option>Equine portrait</option>
                    <option>Event photography</option>
                    <option>Fine art photography</option>
                    <option>Advertising and marketing photography</option>
                    <option>Editorial and journalistic photography</option>
                    <option>Equine lifestyle photography</option>
                    <option>Other</option>
                </select><br />
                <label>How did you hear about me?</label><br />
                <select>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Word of Mouth</option>
                    <option>Website</option>
                    <option>Other</option>
                </select>
                <button type='submit'>Submit</button>
            </form>
        </div>
        </div>
    </div>
)
}

export default BookingForm