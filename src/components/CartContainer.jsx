import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/helpers";

const CartContainer = () => {
  const { cartItems, amount, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <section className="cart">
      <header>
        <h2>your cart</h2>
        {amount < 1 && <h4 className="empty-cart">is empty</h4>}
      </header>

      {amount > 0 && (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
      )}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Total <span>{formatPrice(total)}</span>
          </h4>
        </div>
        <button
          type="button"
          className="btn clear-btn"
          onClick={() => dispatch(clearCart())}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
