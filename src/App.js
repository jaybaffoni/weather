import React, { Component } from 'react';
import './App.css';
import {
  MDBNavbar, MDBNavbarBrand, NavbarToggler, Collapse, NavbarNav, NavItem, NavLink
  } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Week from './Week';
import Hourly from './Hourly';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      collapse: false,
      isWideEnough: false,
      data:[]
    });

    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    this.setState({
        collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <Router>
          <MDBNavbar color="indigo" fixed="top" dark expand="md">
            <div className="container" style={{paddingLeft:'0px', paddingRight:'0px'}}>
              <MDBNavbarBrand>
                  <strong className="white-text">Weather</strong>
              </MDBNavbarBrand>
              { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav right>
                        <NavItem>
                            <NavLink to="/weekly">Daily</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/hourly">Hourly</NavLink>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </div>
          </MDBNavbar>
          <Switch>
              <Route path="/daily" component={Week} />
              <Route path="/hourly" component={Hourly} />
              <Route path="*" render={() => <Redirect to="/daily" />} />
          </Switch>
        </Router>
    </div>
    )}
}

export default App;
