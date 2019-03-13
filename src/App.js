import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import TimeLine from "./components/TimeLine/TimeLine";
import AddEvent from "./components/AddEvent/AddEvent"
import NewsInfo from "./components/NewsInfo/NewsInfo";
import TransactionsInfo from "./components/TransactionsInfo/TransactionsInfo";
import MinNav from "./components/MinNav/MinNav";
import Media from 'react-media';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="app">
          <MinNav/>
          <div className="app__add-and-info">
              <Media query={{ maxWidth: 599 }}>
                  {matches =>
                      matches ? (
                          <Switch>
                              <Route exact path='/add' component={AddEvent}/>
                          </Switch>
                      ) : (
                          <AddEvent/>
                      )
                  }
              </Media>
              <div className="app__info">
                  <Switch>
                      <Route exact path='/news/:id' component={NewsInfo}/>
                      <Route exact path='/transactions/:id' component={TransactionsInfo}/>
                  </Switch>
              </div>
          </div>
          <Media query={{ maxWidth: 599 }}>
              {matches =>
                  matches ? (
                      <Switch>
                          <Route exact path='/list' component={TimeLine}/>
                      </Switch>
                  ) : (
                      <TimeLine/>
                  )
              }
          </Media>
      </div>
    );
  }
}

export default App;
