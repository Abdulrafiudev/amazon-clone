 export let cart = [];

 
export function add_to_cart(product_id){
  let matching_items;

  let select_button = document.querySelector(`.js_quantity_selector_${product_id}`)

  let value = Number(select_button.value)

  cart.forEach((cart_item) => {

    if (product_id === cart_item.product_id){
     matching_items = cart_item;
    }
   })
   
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
   

}
