import SearchScreen from './screens/SearchScreen';
import { useAppDispatch, useAppSelector } from './store';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((store) => store.yts.isLoading);
  return (
    <>
      <SearchScreen />
    </>
  );
}

export default App;
