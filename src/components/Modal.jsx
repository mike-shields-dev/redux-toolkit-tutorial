import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(closeModal());
    dispatch(clearCart());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h4>remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            type="button"
            onClick={handleConfirm}
          >
            confirm
          </button>
          <button
            className="btn clear-btn"
            type="button"
            onClick={handleCancel}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
