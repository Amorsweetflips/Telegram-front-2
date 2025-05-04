import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [payload, setPayload] = useState({ data: [] });

  useEffect(() => {
    api.getData().then(setPayload).catch(console.error);
  }, []);

  const messages = payload.data;

  return (
    <div className="App">
      <h1>Messages</h1>
      {messages.length ? (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.sender_username}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      ) : (
        'Loading…'
      )}
    </div>
  );
}

export default App;
