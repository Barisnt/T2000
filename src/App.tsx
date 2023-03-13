import { Button } from 'antd';
import get from 'axios';
import { useState } from 'react';
function App() {
  const [responseState, setResponseState] = useState('ğğğ');

  return (
    <>
      <div>selamun aleyke </div>
      <Button
        onClick={() => {
          get('https://yts.mx/api/v2/list_movies.json?quality=3D').then(
            (response) => {
              setResponseState(JSON.stringify(response));
              console.log(response);
            }
          );
        }}
      >
        merhabalar aq
      </Button>
      <div>{responseState}</div>
    </>
  );
}

export default App;
