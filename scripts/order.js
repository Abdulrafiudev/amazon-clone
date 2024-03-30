import {cart} from "../data/cart.js"
import { products } from "../data/products.js";
import { delivery_options } from "../data/delivery_options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

 localStorage.getItem(`todays_date`)



update_order_cart_quantity()


let order_checkout_html =``;
let order_header = ``;

let total_product_price = 0;

let shipping_price = 0;


cart.forEach((cart_items) => {


  let product_id = cart_items.product_id
  // This was done so as to access all the other properties based on their ID
  let matching_products;

  products.forEach((product) => {
    if (product_id === product.id){
      matching_products = product
    }
  });

  total_product_price = ((matching_products.price_cent * cart_items.quantity)*0.01)

  let delivery_option_id = cart_items.delivery_options_id

  let options;

  delivery_options.forEach((delivery_options) => {
    if (delivery_options.id === delivery_option_id){
      options = delivery_options;
    }
  })
  shipping_price += options.price_cents * 0.01

  let total_before_tax = total_product_price + shipping_price;
  let total_after_price = total_before_tax * 0.1
  let total = total_product_price + shipping_price + total_before_tax + total_after_price

  let todays_date = dayjs()
  let delivery_date = todays_date.add(options.delivery_days, `days`)
  let date_string = delivery_date.format(`dddd, MMMM D`)
  let date_string_2 = todays_date.format(`MMMM D`)
  

  localStorage.setItem(`todays_date`, date_string_2)

  order_checkout_html+= 
  `
  <div class="order-container_1">

      <div class="order-header">
            <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${date_string_2}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${total_product_price.toFixed(2)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${matching_products.id}ma</div>
          </div>

      </div>

      <div class="order-details-grid">
              
          <div class="product-image-container">
            <img src="${matching_products.image}">
          </div>

          <div class="product-details">
              <div class="product-name">
                ${matching_products.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${date_string}
              </div>
              <div class="product-quantity">
                Quantity: ${cart_items.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div> 
                

                
      </div>
      
        
      
      
      
      
  
   </div>
  
  `


 
      
    
  
  
  
  
  
  
  
  
  
  


  
})



document.querySelector(`.orders-grid`).innerHTML = order_checkout_html



function update_order_cart_quantity(){
  let cart_quantity = 0;

  cart.forEach((cart_items) => {
       cart_quantity+= cart_items.quantity
     })
  document.querySelector(`.cart-quantity`).innerHTML = cart_quantity

  
}