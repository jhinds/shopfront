import React, { Component } from 'react'

class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <tr className="Product">
        <td className="product-cell">{this.props.id}</td>
        <td className="product-cell">{this.props.price}</td>
        <td className="product-cell">{this.props.stock}</td>
        <td className="product-cell"><button>Buy!</button></td>
      </tr>
    );
  }
}

export default Product
