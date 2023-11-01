 export let cart = [
  {
   product_id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity:2
 },
 {
  product_id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1
 }
];

 
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
export function remove_from_cart(product_id){
   let new_cart = [];
   cart.forEach((cart_item) => {
      if (cart_item.product_id !== product_id){
        new_cart.push(cart_item)
      }
   })

   cart = new_cart
}