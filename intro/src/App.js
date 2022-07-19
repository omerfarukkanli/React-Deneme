import React, { Component } from "react";
import CategoryLists from "./CategoryLists";
import Navi from "./Navi";
import ProductLists from "./ProductLists";
import { Col, Container, Row } from "reactstrap";
import alertify from "alertifyjs";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
      
    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart", 1);
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };

  render() {
    const product = { title: "Product List" };
    const category = { title: "Category List" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />
          <Row>
            <Col xs="3">
              <CategoryLists
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={category}
              />
            </Col>
            <Col xs="9">
              <ProductLists
                addToCart={this.addToCart}
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={product}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
