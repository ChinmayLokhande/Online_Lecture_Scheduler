import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // Import your CSS file

function Admin() {
  const [adminUserData, setAdminUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const [eventForm, setEventForm] = useState({
    title: "",
    instructor: "",
    link: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/admin")
      .then((res) => {
        setAdminUserData(res.data.data);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        console.error("Error fetching admin users:", err);
      });
  }, []);

  const handleDropdownChange = (event) => {
    const selectedInstructorName = event.target.value;
    const selectedUser = adminUserData.find((user) => user.username === selectedInstructorName);
  
    
    setEventForm((prevForm) => ({
      ...prevForm,
      instructor: selectedInstructorName,
    }));
  
    setSelectedUser(selectedUser);
  };

  const handleEventInputChange = (event) => {
    const { name, value } = event.target;
    setEventForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:6969/api/admin/addLecture", { data:eventForm })
      .then((res) => {
        setSuccessMessage('Event created successfully!'); // Set success message
        setError(null); // Clear any previous error
      })
      .catch((err) => setError(err.response.data.error));
  }

  return (  
    <div>
      <div className="navbar">
        <h3>Admin Panel</h3>
      </div>

      <div className="admin-container">
        <h2>Add Lecture</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="input-container">
          <label>Select User:</label>
          <select onChange={handleDropdownChange}>
            <option value="" disabled required>
              Select a User
            </option>
            {adminUserData.map((user) => (
              <option
                key={user._id}
                value={user.username}
                onChange={handleEventInputChange}
              >
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div className="selected-user-container">
            <h2>Selected User:</h2>
            <p>Username: {selectedUser.username}</p>
            <p>Subject: {selectedUser.subject}</p>
          </div>
        )}

        <form className="event-form" >
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={eventForm.title}
            onChange={handleEventInputChange}
            required
          />

          <label>Link:</label>
          <input
            type="text"
            name="link"
            value={eventForm.link}
            onChange={handleEventInputChange}
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={eventForm.date}
            onChange={handleEventInputChange}
            class="date-input"
            required
          />

          <div class="label-container">
            <label>Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={eventForm.startTime}
              onChange={handleEventInputChange}
              class="time-input"
              required
            />
          </div>

          <div class="label-container">
            <label>End Time:</label>
            <input
              type="time"
              name="endTime"
              class="time-input"
              onChange={handleEventInputChange}
              value={eventForm.endTime}
              required
            />
          </div>

          <label>Description:</label>
          <textarea
            name="description"
            value={eventForm.description}
            onChange={handleEventInputChange}
          ></textarea>

          <button onClick={handleSubmit}>Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;