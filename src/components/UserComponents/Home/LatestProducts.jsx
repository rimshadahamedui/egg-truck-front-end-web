import React, { useEffect, useMemo, useRef, useState } from "react";
import { Heading } from "../Heading";
import { Slider } from "../Slider";
import ProductCard from "../ProductCard";
import { useConfigure, useHits } from "react-instantsearch";
import Skeleton from "../Skeleton";
import { useSelector } from "react-redux";
import { getProductsWithWishlistStatus } from "../../../utils/api/products";
import QuickViewProduct from "../ProductCard/quickviewproduct";

const LatestProducts = () => {
  const [sliderState, setSliderState] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);
  const sliderRef = useRef(null);
  useConfigure({
    index: "products",
    hitsPerPage: 6,
  });
  const { items } = useHits();
  const { user } = useSelector((state) => state.user);

  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const [quickViewId , setQuickViewId] = React.useState(1);


  useEffect(() => {
    async function updateProductWithwishlist() {
      // updates the products list with wishlist status when user is logged in
      if (user.isAuthenticated && user.role !== "admin") {
        const updatedProductList = await getProductsWithWishlistStatus(items);
        setNewArrivals(updatedProductList);
        return;
      }
      setNewArrivals(items);
    }
    updateProductWithwishlist();
  }, [items, user]);

  function checkQwModalState(state , id) {
    setQuickViewOpen(state);
    setQuickViewId(id)
  }
  return (
    <div className="container mt-10 flex flex-col items-start gap-[29px] md:p-5">
      <Heading size="mdx" as="h1">
        <span className="text-gray-900">Latest.&nbsp;</span>
        <span className="thlight"> Check out the newest arrivals just for you</span>
      </Heading>

      {!newArrivals.length ? (
        <div className="grid grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-6 mx-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : null}
      <div className="flex flex-col items-center gap-16 self-stretch sm:gap-8 mt-5">
        <div className="mx-2.5 flex w-full max-w-[1440px] gap-5 self-stretch md:mx-0 md:flex-col">
          <Slider
            autoPlay
            autoPlayInterval={3000}
            responsive={{
              0: { items: 1 },
              550: { items: 2 },
              1050: { items: 4 },
              1200: { items: 6 },
            }}
            renderDotsItem={(props) => {
              return props?.isActive ? (
                <div className="mr-1.5 h-[6px] w-[6px] rounded-[3px] bg-gray_900_cc" />
              ) : (
                <div className="mr-1.5 h-[6px] w-[6px] rounded-[3px] bg-gray_900_66" />
              );
            }}
            activeIndex={sliderState}
            onSlideChanged={(e) => {
              setSliderState(e?.item);
            }}
            ref={sliderRef}
            items={newArrivals.map((item) => (
              <ProductCard {...item} key={item._id} _id={item.id} {...item} showQuick={true} qwModalOpenState={checkQwModalState} />
            ))}
          />
        </div>
      </div>
      {
        quickViewOpen ?
            <QuickViewProduct pid={quickViewId} key={quickViewId} closeHandle={()=> setQuickViewOpen(false)}/>
            : <></>
      }
    </div>
  );
};

export default LatestProducts;
