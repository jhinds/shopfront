import React, { Component } from 'react'
import '../css/AdminConsole.css'

import ShopfrontContract from '../../build/contracts/Shopfront.json'
import getWeb3 from '../utils/getWeb3'
const contract = require('truffle-contract')
const shopfront = contract(ShopfrontContract)


class AdminConsole extends Component {
  constructor(props) {
    super(props)

    this.state = {
      price: '',
      stock: ''
    }

    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleStockChange = this.handleStockChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleStockChange(event) {
    this.setState({stock: event.target.value});
  }

  addProduct() {
    console.log(this.state.price);
    console.log(this.state.stock);
    this.props.contract.addNewProduct(this.state.price, this.state.stock, {from: this.props.account});

    this.setState({price: ''});
    this.setState({stock: ''});
    alert('New Product Has Been Added!')
  }

  render() {
    return (
      <div className="AdminConsole">
        <span className="header">Admin</span>
        <div className='product-inputs'>
          <input placeholder="Price"
                 type="number"
                 value={this.state.price}
                 onChange={this.handlePriceChange}></input>
          <input placeholder="Stock"
                 type="number"
                 value={this.state.stock}
                 onChange={this.handleStockChange}></input>
        </div>
        <button className="new-product-button"
                onClick={this.addProduct}>Add New Product</button>
      </div>
    );
  }
}

export default AdminConsole
