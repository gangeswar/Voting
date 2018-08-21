const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem._id !== item._id);
const cartWithItem = (cart, item) => cart.filter(cartItem => cartItem._id === item._id)[0];

const addToCart = (cart, item) => {
  const cartItem = cartWithItem(cart, item)
  const price = item.price;
  return cartItem === undefined
  ? [ ...cartWithoutItem(cart, item), { ...item, quantity: 1, price: item.price }]
  : [ ...cartWithoutItem(cart, item), { ...cartItem, quantity: cartItem.quantity + 1, price: cartItem.price + price }]
}

const removeFromCart = (cart, item) => {
  const price = item.price;
  return item.quantity === 1
  ? [ ...cartWithoutItem(cart, item) ]
  : [ ...cartWithoutItem(cart, item), { ...item, quantity: item.quantity - 1, price: item.price - price } ]
}

const removeAllFromCart = (cart, item) => {
  return [ ...cartWithoutItem(cart, item) ]
}

const cartReducer = (state=[], action) => {
  switch(action.type) {
    case 'ADD':
      return addToCart(state, action.payload)
      
    case 'REMOVE':
      return removeFromCart(state, action.payload)

    case 'REMOVE_ALL':
      return removeAllFromCart(state, action.payload)
      
    default:
      return state;
  }
}

export default cartReducer;