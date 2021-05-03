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
    this.handleBookSaved = this.handleBookSaved.bind(this);
    this.handleBookEdit = this.handleBookEdit.bind(this);
    this.state = { bookSaved: false, isEdit: false, editingISBN: "" };
  }

  handleBookSaved() {
    this.setState({ bookSaved: true }, () => {
      //callback function so that users could navigate to Create tab again
      this.setState({ bookSaved: false });
    });
  }

  handleBookEdit(ISBN) {
    this.setState({ isEdit: true, editingISBN: ISBN }, () => {
      //callback function so that users could navigate to List tab again
      this.setState({ isEdit: false });
    });
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
                <Route exact path="/">
                  {this.state.isEdit ? (
                    <Redirect to="/book" />
                  ) : (
                    <BookList handleBookEdit={this.handleBookEdit} />
                  )}
                </Route>
                <Route path="/book">
                  {this.state.bookSaved ? (
                    <Redirect to="/" />
                  ) : (
                    <BookDetail
                      handleBookSaved={this.handleBookSaved}
                      editingISBN={this.state.editingISBN}
                    />
                  )}
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
