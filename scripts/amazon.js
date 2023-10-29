
let product_html = ``

products.forEach((product) => {
  product_html += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
        src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.ratings.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.ratings.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.price_cent * 0.01).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class = "js_quantity_selector_${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js_add_to_cart_button" data-product-id = "${product.id}" >
        Add to Cart
      </button>
    </div>`
    
})



document.querySelector(`.products-grid`).innerHTML = product_html




document.querySelectorAll(`.js_add_to_cart_button`).forEach( (add_button) => {
   add_button.addEventListener(`click`, () => {
    
    
     let matching_items;
     let product_id = add_button.dataset.productId 
     cart.forEach((items) => {
       if (product_id === items.product_id){
        matching_items = items;
       }
      })
      let select_button = document.querySelector(`.js_quantity_selector_${product_id}`)
      let value = Number(select_button.value)
       if (matching_items){
        matching_items.quantity += value
       }
       else{
        cart.push(
          {
            product_id:product_id,
            quantity: value
         }
         )
       }
       console.log(cart)
       
       let cart_quantity = 0;

      cart.forEach((cart_items) => {
        cart_quantity+= cart_items.quantity
      })
      document.querySelector(`.cart-quantity`).innerHTML = cart_quantity
      
 
     
     
   })
})
