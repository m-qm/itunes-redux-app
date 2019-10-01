import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import configureStore from "./config/store";
import Search from "./components/Search";
import Detail from "./components/Detail";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Find your music</h1>
          </header>
          <div className="App-body">
            <Router>
              <div>
                <Route exact path="/" component={Search} />
                <Route path="/detail" component={Detail} />
              </div>
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
