import React, { Component } from 'react'
import ShopfrontContract from '../build/contracts/Shopfront.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Listings from './components/Listings';
import AdminConsole from './components/AdminConsole';

const contract = require('truffle-contract')
const shopfront = contract(ShopfrontContract)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      shopfrontInstance: null,
      account: null,
      productLine: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    shopfront.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var shopfrontInstance

    // Get accounts.
    return this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({account: accounts[0]});
      shopfront.deployed().then((instance) => {
        this.setState({shopfrontInstance: instance});
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Shopfront</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <Listings/>
              <AdminConsole contract={this.state.shopfrontInstance} account={this.state.accounts}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
