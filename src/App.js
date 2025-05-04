import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [payload, setPayload] = useState({ data: [] });

  useEffect(() => {
    api.getData().then(setPayload).catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Messages</h1>
      {payload.data.length ? (
        <ul>
          {payload.data.map(msg => (
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
