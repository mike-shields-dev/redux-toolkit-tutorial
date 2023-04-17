import { ChevronUp, ChevronDown } from "../icons";
import { removeItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

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
        <button type="button" className="amount-btn">
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button type="button" className="amount-btn">
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
