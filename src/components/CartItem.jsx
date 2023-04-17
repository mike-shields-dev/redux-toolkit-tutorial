import { ChevronUp, ChevronDown } from "../icons";
import { decrease, increase, removeItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if(amount > 1) {
      return dispatch(decrease(id))
    } 
    dispatch(removeItem(id))
  }

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <header>
        <h4>{title}</h4>
        <h4 className="item-price">£{price}</h4>
        <button
          type="button"
          className="remove-btn"
          onClick={() => dispatch(removeItem(id))}
        >
          remove
        </button>
      </header>
      <div>
        <button
          type="button"
          className="amount-btn"
          onClick={() => dispatch(increase(id))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          type="button"
          className="amount-btn"
          onClick={handleDecrease}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
