import { Button } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { ytsSearch } from './store/ytsSearchSlice';

function App() {
  const [responseState, setResponseState] = useState('ğğğ');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((store) => store.yts.isLoading);
  return (
    <>
      <div>selamun aleyke </div>
      <Button
        onClick={() => {
          dispatch(ytsSearch());
        }}
      >
        merhabalar aq
      </Button>
      <div>{isLoading}</div>
    </>
  );
}

export default App;
