import React, { Component } from 'react';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {SplashScreen, ProductList, BuyProduct} from './index';

export default class Main extends Component {

  render() {
    return (
        <Router>
            <Scene key="root">
                <Scene key="productList"
                    animation="fade"
                    component={ProductList}
                    hideNavBar={true}
                    initial={true}
                />
                <Scene key="buyProduct"
                    animation="fade"
                    component={BuyProduct}
                    hideNavBar={true}
                />
            </Scene>
        </Router>
    );
  }
}
