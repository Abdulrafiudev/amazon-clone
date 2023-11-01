import {cart, remove_from_cart} from "../data/cart.js"
import {products} from "../data/products.js"

let cart_summary_html=``;


cart.forEach((cart_items) => {

  let product_id = cart_items.product_id
  // This was done so as to access all the other properties based on their ID
  let matching_products;

  products.forEach((product) => {
     if (product_id === product.id){
      matching_products = product
     }
  });
  
  cart_summary_html+=

          `<div class="cart-item-container js-cart-item-container-${matching_products.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matching_products.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matching_products.name}
                  </div>
                  <div class="product-price">
                    $${(matching_products.price_cent * 0.01).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cart_items.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id = "${matching_products.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matching_products.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matching_products.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matching_products.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      
  
  
  
  
  `



})
document.querySelector(`.order-summary`).innerHTML= cart_summary_html

document.querySelectorAll(`.delete-quantity-link`).forEach((delete_link) => {
    delete_link.addEventListener(`click`, () => {
      let product_id = delete_link.dataset.productId;
      remove_from_cart(product_id)
      console.log(cart)
      let container = document.querySelector(`.js-cart-item-container-${product_id}`)
      container.remove()
    })
})
