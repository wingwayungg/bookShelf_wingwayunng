import "./styles.scss";
import React, { Component } from "react";
import { render } from "react-dom";

import {
  BrowserRouter,
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Navigation from "./components/Navigation";

import BookList from "./pages/BookListPage";
import BookDetail from "./pages/BookDetail";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Router>
          <div>
            {
              /* render a navigation component */
              <Navigation />
            }
            <hr />
            {
              /* render routing logic of react-router-dom */
              <Switch>
                <Route exact path="/list">
                  <BookList />
                </Route>
                <Route path="/book/:ISBN_url_parm?">
                  <BookDetail />
                </Route>
              </Switch>
            }
          </div>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
