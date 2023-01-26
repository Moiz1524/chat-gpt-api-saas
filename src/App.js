import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:5000', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setResponse(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Response: {response}</p>
      </div>
    </div>
  );
}

export default App;
