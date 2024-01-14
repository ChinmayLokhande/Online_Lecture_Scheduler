import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './Instructor.css'

function Instructor() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");

  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://online-lecture-system.onrender.com/api/instructor/${username}`)
      .then((res) => {
        setLectures(res.data.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        console.error("Error fetching admin users:", err);
      });
    ;
  }, []);

  return (
    <div>
      {/* Your Instructor component content */}
      <div className="navbar">
        <h3>Instructor Panel</h3>
      </div>
      <p>Welcome, {username}!</p>

      <div className="lecture-list">
        {lectures.map((lecture) => (
          <div className="lecture-card">
            <div className="lecture-card-content">
              <h2>{lecture.title}</h2>
              <p>Date: {new Date(lecture.date).toLocaleDateString()}</p>
              <p>Time: {lecture.startTime} - {lecture.endTime}</p>
              <p>Description: {lecture.description}</p>
              <a href={lecture.link} className="lecture-card-link" target="_blank" rel="noopener noreferrer">
                Join Lecture
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Instructor;
