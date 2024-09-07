import React from 'react';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store'; 

const App = () => {
  console.log("Store: ", store); 
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
