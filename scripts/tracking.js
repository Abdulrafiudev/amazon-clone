import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { delivery_options } from "../data/delivery_options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

let tracking_html = ``;

cart.forEach((cart_items) => {
    
  let product_id = cart_items.product_id
  // This was done so as to access all the other properties based on their ID
  let matching_products;

  products.forEach((product) => {
    if (product_id === product.id){
      matching_products = product
    }
  });

  let delivery_option_id = cart_items.delivery_options_id

  let options;

  delivery_options.forEach((delivery_options) => {
    if (delivery_options.id === delivery_option_id){
      options = delivery_options;
    }
  })
  let todays_date = dayjs()
  let delivery_date = todays_date.add(options.delivery_days, `days`)
  let date_string = delivery_date.format(`dddd, MMMM D`)
  


  tracking_html = 
  `
  <div class="order-tracking">
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>

          <div class="delivery-date">
            Arriving on ${date_string}
          </div>

          <div class="product-info">
           ${matching_products.name}
          </div>

          <div class="product-info">
            Quantity: ${cart_items.quantity}
          </div>

          <img class="product-image" src="${matching_products.image}">

          <div class="progress-labels-container">
            <div class="progress-label">
              Preparing
            </div>
            <div class="progress-label current-status">
              Shipped
            </div>
            <div class="progress-label">
              Delivered
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
  </div>
  
  
  
  
  
  
  `



})
document.querySelector(`.main`).innerHTML = tracking_html