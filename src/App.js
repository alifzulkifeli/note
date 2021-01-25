import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { useMediaQuery } from 'react-responsive'


function App() {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1224px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (<>
    { isBigScreen && <div className='todo-app'>
      <TodoList />
    </div>}
    { isTabletOrMobile && <div className='todo-app-mobile'>
      <TodoList />
    </div>}
  </>
  );
}

export default App;
