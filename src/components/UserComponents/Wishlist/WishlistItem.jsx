import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button, Heading, Img } from "../../../components/UserComponents";
import { getTruncated } from "../../../utils";
const WishlistItem = ({
                        _id,
                        thumbnail,
                        name,
                        price,
                        actualPrice,
                        discount,
                        offer,
                        handleAddtoCart,
                        handleDeleteFromWishlist,
                      }) => {
  return (
      <div key={_id} className=" bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1" >
        <div className="relative h-[270px]  self-center rounded-[16px] bg-gray-50 md:h-auto mb-">

          <img src={thumbnail} alt={name} className="h-full w-full rounded-xl object-cover hover:cursor-pointer"/>

          <button onClick={handleDeleteFromWishlist} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-red-50">
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>

          {offer && (
              <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {discount || 0} % off
          </span>
          )}

        </div>
        <div className="p-4">

          <div className="flex flex-col items-start">
            <div className="flex hover:cursor-pointer">
              <Heading as="h6" className="font-light text-s min-h-12 max-w-[200px]">{name?.length > 32 ? getTruncated(name, 32) : name}</Heading>
            </div>
          </div>


          <div className="flex items-center mb-2">
            <span className="text-lg font-bold  mr-2">${price}</span>
            {price !== actualPrice && (
                <span className="text-sm text-gray-500 line-through">
              ${actualPrice}
            </span>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button onClick={handleAddtoCart} className="min-w-full bg-thdark text-white-A700 gap-2 justify-center flex rounded-[26px] px-5 py-2 font-medium sm:px-5 disabled:opacity-50">
              <ShoppingCart className=" h-6 w-6 text-white-A700 self-center" />
              <span className="self-center">Move to cart</span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default WishlistItem;
