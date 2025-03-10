import { cart, remove_from_cart, calculate_cart_quantity , new_cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { delivery_options } from "../../data/delivery_options.js";






export function payment_order_summary(){

  let total_product_price = 0;

  let shipping_price = 0;
  let payment_html = ''

  cart.forEach((cart_items) => {

    let product_id = cart_items.product_id

    let matching_products;

    products.forEach((product) => {
      if (product_id === product.id){
        matching_products = product
      }
    });

    total_product_price += ((matching_products.price_cent * cart_items.quantity)*0.01)


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

   payment_html = `
      <div class="payment-summary-title">
            Order Summary
      </div>
      <div class="payment-summary-row">
        <div class="item">Item(3):</div>
        <div class="payment-summary-money">$${total_product_price.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${shipping_price.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${total_before_tax.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${total_after_price.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${total.toFixed(2)}</div>
      </div>

      <a href="../../orders.html" >
        <button class="place-order-button button-primary" data-product-id = "${matching_products.id}">
          Place your order
        </button>
      </a>
  
  
  
  
  
  
  `
})
  document.querySelector(`.payment-summary`).innerHTML = payment_html
  
  
      function calculate_item(){
        let cart_quantity = 0;

        cart.forEach((cart_items) => {
            cart_quantity+= cart_items.quantity
          })
          document.querySelector(`.item`).innerHTML = `Items(${cart_quantity}):`
      }
      calculate_item()


      document.querySelectorAll(`.place-order-button`).forEach((button) => {
        
        button.addEventListener(`click`, () => {
          
          let product_id =  button.dataset.productId

          console.log(product_id)


          
        
          
        })

      })

   
  
  
  
  
  
}
