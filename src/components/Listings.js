import React, { Component } from 'react'
import Product from './Product';

import '../css/Listings.css'

class Listings extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div className="Listings">
      <span className="header">Products</span>
          <table className='listing-table'>
          <tr>
            <th className='column-header'>Id</th>
            <th className='column-header'>Price</th>
            <th className='column-header'>Stock</th>
            <th className='column-header'></th>
          </tr>
          <Product id='1' price='2' stock='3'/>
        </table>
      </div>
    );
  }
}

export default Listings
