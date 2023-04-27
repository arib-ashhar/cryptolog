import { EthProvider } from "./contexts/EthContext";
import React from 'react';
import Home from "./components/Home";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <EthProvider>
      {/* <Router>
        <Switch>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/uploads" component={Uploads} />
          </div>
        </Switch>
      </Router> */}

      <Home />

    </EthProvider>
  );
}


export default App;
