import React, { useEffect, useState } from 'react';
import api from './api';  // ← changed from '../api'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getData().then(setData).catch(console.error);
  }, []);

  return (
    <div className="App">
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        'Loading…'
      )}
    </div>
  );
}

export default App;
