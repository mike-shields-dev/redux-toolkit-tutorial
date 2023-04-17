import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const CartContainer = () => {
  const { cartItems, amount } = useSelector(store => store.cart);
  
  if(amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <div>
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} {...cartItem} />
      ))}
    </div>
  )
}

export default CartContainer
