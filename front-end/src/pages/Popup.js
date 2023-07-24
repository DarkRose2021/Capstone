import React from 'react'

const Popup = ({ message, onClose }) => {
    return (
      <div className="popup-container">
        <div className="popup">
          <p>{message}</p>
          <button className="close-button" onClick={onClose}>
            I understand!
          </button>
        </div>
      </div>
    );
}

export default Popup