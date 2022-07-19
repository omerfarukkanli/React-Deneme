import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class ProductLists extends Component {
  

  render() {
    return (
      <div>
        <h2>
          {this.props.info.title}-{this.props.currentCategory}
        </h2>
        <Table size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Qantity Per Unit</th>
              <th>Unit İn Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button onClick={()=>this.props.addToCart(product)} color="primary">add</Button>
                </td>
              </tr>
            ))}

            <tr></tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
