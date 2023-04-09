import { EthProvider } from "./contexts/EthContext";
import React from 'react';
import Home from "./components/Home";


function App() {
  return (
    <EthProvider> 
      <Home />
    </EthProvider>
  );
}


export default App;
