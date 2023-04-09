import { EthProvider } from "./contexts/EthContext";
import React from 'react';
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Uploads from "./components/Uploads/Uploads";

function App() {

  return (
    <EthProvider>
      <Router>
        <div>
          <div>Hi</div>
          <Route exact path="/" component={Home} />
          <Route path="/uploads" component={Uploads} />
        </div>
      </Router>
    </EthProvider>
  );
}


export default App;
