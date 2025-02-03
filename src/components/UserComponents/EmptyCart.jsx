import { useNavigate } from "react-router-dom";
import { emptyCartGif } from "../../assets/images";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <img
          src={emptyCartGif}
          alt="Empty cart gif"
          className="size-64"
          loading="lazy"
        />
        <div className="flex sm:flex-col  justify-around items-center gap-4">
          <h3 className="text-lg font-medium text-gray-400">
            Your cart is feeling lonely
          </h3>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="px-4 py-2 bg-black text-white-A700 font-medium rounded-md shadow-md"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
