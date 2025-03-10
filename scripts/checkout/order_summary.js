import {cart, remove_from_cart, calculate_cart_quantity, update_quantity, update_delivery_date} from "../../data/cart.js"
import {products} from "../../data/products.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { delivery_options } from "../../data/delivery_options.js"
import { payment_order_summary } from "./payment_summary.js"



calculate_cart_quantity()

//I used an MVC 
export function render_order_summary(){
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

      cart_summary_html+=

              `<div class="cart-item-container js-cart-item-container-${matching_products.id}">
                  <div class="delivery-date">
                    Delivery date: ${date_string}
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
                          Quantity: <span class="quantity-label js_quantity_label_${matching_products.id}">${cart_items.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-product-id = "${matching_products.id}">
                          Update
                        </span>
                        <input class = "quantity_input input_${matching_products.id}" data-product-id = "${matching_products.id}">
                        <span class= "save_quantity_link link-primary save_${matching_products.id}" data-product-id = "${matching_products.id}"> save </span>
                        <span class="delete-quantity-link link-primary" data-product-id = "${matching_products.id}">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      ${delivery_options_html(matching_products, cart_items)}
                    
                  
                      
                    </div>
                  </div>
              </div>
          
      
      
      
      
      `



    })

    function delivery_options_html(matching_products, cart_items){
      let html = ``
      delivery_options.forEach((delivery_options) => {

        let todays_date = dayjs()
        let delivery_date = todays_date.add(delivery_options.delivery_days, `days`)
        let date_string = delivery_date.format(`dddd, MMMM D`)

        let price_string = delivery_options.price_cents === 0 ? `FREE shippng` : `$${delivery_options.price_cents * 0.01.toFixed(2)}- Shipping`;

        let is_checked = delivery_options.id === cart_items.delivery_options_id
        
        html+=
                `
                  <div class="delivery-option" data-product-id = "${matching_products.id}" data-delivery-options-id = "${delivery_options.id}">
                    <input type="radio" ${is_checked ? `checked` : ``}
                      class="delivery-option-input"
                      name="delivery-option-${matching_products.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${date_string}
                      </div>
                      <div class="delivery-option-price">
                        ${price_string}
                      </div>
                    </div>
                  </div>
                `
                
      })

    return html

    }

    document.querySelector(`.order-summary`).innerHTML= cart_summary_html

    document.querySelectorAll(`.delete-quantity-link`).forEach((delete_link) => {
        delete_link.addEventListener(`click`, () => {
          let product_id = delete_link.dataset.productId;
          remove_from_cart(product_id)
          
          let container = document.querySelector(`.js-cart-item-container-${product_id}`)
          container.remove()
          calculate_cart_quantity()
          payment_order_summary()
        })
    });


    document.querySelectorAll(`.update-quantity-link`).forEach((update_link) => {
      update_link.addEventListener(`click`, () => {

        let product_id = update_link.dataset.productId;
        console.log(product_id)

        //document.querySelector(`.input_${product_id}`).classList.add(`display`)
        //document.querySelector(`.save_${product_id}`).classList.add(`display`)

        let container = document.querySelector(`.js-cart-item-container-${product_id}`)
        container.classList.add(`is_editing_quantity`)

        
        
      
      
      })
    })

    document.querySelectorAll(`.save_quantity_link`).forEach((save_link) => {

      save_link.addEventListener(`click`, () => {

      
        let product_id = save_link.dataset.productId;
        console.log(product_id)
        

        make_save_link_interactive(product_id)
      })
    })


    document.querySelectorAll(`.quantity_input`).forEach((input) => {

      input.addEventListener(`keydown`, (event) => {

        if (event.key === `Enter`){

          let product_id = input.dataset.productId;

          console.log(product_id)

          make_save_link_interactive(product_id)

        
        }

      })
    })

    function make_save_link_interactive(product_id){
      let input_button = document.querySelector(`.input_${product_id}`).value
      
      let new_value = Number(input_button)

      

      update_quantity(product_id, new_value)

      
  

      if (new_value < 0 ){
        alert(`Not a valid input`)
      
      }
      else{
        payment_order_summary()
        let container = document.querySelector(`.js-cart-item-container-${product_id}`)
      container.classList.remove(`is_editing_quantity`)

      document.querySelector(`.js_quantity_label_${product_id}`).innerHTML = new_value
      calculate_cart_quantity()
      }


      

      console.log(cart)
    }

    document.querySelectorAll(`.delivery-option`).forEach((delivery_link) => {

      delivery_link.addEventListener(`click`, () => {

        let product_id = delivery_link.dataset.productId;
        
        let delivery_options_id = delivery_link.dataset.deliveryOptionsId

        update_delivery_date(product_id, delivery_options_id)
        render_order_summary()
        payment_order_summary()
        

      
      })
      

    })
}

