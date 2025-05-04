import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    api.getData()
       .then(setMessages)
       .catch(err => {
         console.error(err);
         setMessages([]); // avoid infinite loading
       });
  }, []);

  if (messages === null) {
    return <div>Loading…</div>;
  }

  return (
    <div className="App">
      <h1>Messages</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              <strong>{msg.sender_username}:</strong> {msg.message}
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
