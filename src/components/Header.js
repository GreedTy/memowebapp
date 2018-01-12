import React from 'react';
import * as firebase from 'firebase';
import logo from '../logo.svg';

class Header extends React.Component {

    render() {

        return (
          <nav className="header">
              <div className="nav-wrapper indigo darken-1">
                <div className ="headerline">
                  <div className="brand-logo center">
                    <div className="font">
                      React MemoPAD
                    </div>
                  </div>
                      <ul>
                          <li><img width="90" src={logo} className="App-logo" alt="logo" /></li>
                      </ul>
                </div>
              </div>
          </nav>


        );
    }
}

export default Header;
