 export let cart = JSON.parse(localStorage.getItem(`cart`)) || [
  {
   product_id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity:2,
   delivery_options_id: `1`
 },
 {
  product_id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  delivery_options_id: `2`
 }
];

function save_to_storage(){
  localStorage.setItem(`cart`, JSON.stringify(cart))
}

 
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
        quantity: value,
        delivery_options_id: `1`
     }
     )
   }
   save_to_storage()

}
export function remove_from_cart(product_id){
   
   cart.forEach((cart_item, index) => {
      if (cart_item.product_id === product_id){
        cart.splice(index, 1)
      }
   })

  

   save_to_storage()
}
 export function calculate_cart_quantity(){
  let cart_quantity = 0;

  cart.forEach((cart_items) => {
       cart_quantity+= cart_items.quantity
     })
     document.querySelector(`.return-to-home-link`).innerHTML = `${cart_quantity} items`
     
     

  
}


export function update_quantity(product_id, new_value){
  let matching_items;

  cart.forEach((cart_items) => {

    if(cart_items.product_id === product_id){
      matching_items = cart_items
    }
    

  })

  matching_items.quantity = new_value;
  save_to_storage()
}

export function update_delivery_date(product_id, delivery_options_id){

  let matching_items;

  cart.forEach((cart_items) => {

    if(cart_items.product_id === product_id){
      matching_items = cart_items;
    }

  })

  matching_items.delivery_options_id = delivery_options_id
  save_to_storage()

}
export function new_cart(product_id){
  let new_cart = [];
  cart.forEach((cart_items) => {

    if (cart_items.product_id === product_id){
      new_cart.push(cart_items)
    }

  })
  console.log(new_cart)
}
