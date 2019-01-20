export default class ProductInfo {
    constructor(apiUrl, auth) {
      this.apiUrl = apiUrl;
      this.auth = auth;
    }
  
    getAllProducts() {
        let allProductUrl = `${this.apiUrl}products/5c00e6c9a7b11b000696acc2/all`;
        return fetch(allProductUrl, {
        method: "GET",
        headers: {
          'Authorization': this.auth
        }
      })
    }

    getProduct(id) {
        let productUrl = `${this.apiUrl}products/`+id;
        return fetch(productUrl, {
          method: "GET",
          headers: {
            'Authorization': this.auth
          }
        })
      }
    }
