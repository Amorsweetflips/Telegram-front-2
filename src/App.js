import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  // `messages === null` means “still loading”
  // once loaded it becomes an array (possibly empty)
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    api.getData()
      .then(data => setMessages(data))
      .catch(err => {
        console.error(err);
        setMessages([]);  // stop loading even on error
      });
  }, []);

  // show only Loading… until messages is not null
  if (messages === null) {
    return (
      <div className="App">
        <h1>Messages</h1>
        <div>Loading…</div>
      </div>
    );
  }

  // once messages is an array, render it (or “No messages”)
  return (
    <div className="App">
      <h1>Messages</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              <strong>@{msg.sender_username}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      ) : (
        <div>No messages yet.</div>
      )}
    </div>
  );
}

export default App;
