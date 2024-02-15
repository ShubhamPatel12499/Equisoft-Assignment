import React from 'react';
import '../Styles/Task.css';
import { useNavigate } from 'react-router-dom';

const Task = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/product'); 
  };

  return (
    <div class="task-container">
      <h1>Welcome to My Website</h1>
      <p>You Can Start Exploring The Website by Clicking on below Button.</p>
      <button class="button" onClick={handleButtonClick}>Let's Start</button>
    </div>
  );
};

export default Task;