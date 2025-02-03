import React, { useMemo, useRef, useState } from "react";
import { Heading } from "../Heading";
import { Slider } from "../Slider";
import ProductCard from "../ProductCard";
import { useConfigure, useHits } from "react-instantsearch";
import Skeleton from "../Skeleton";
import QuickViewProduct from "../ProductCard/quickviewproduct";

const FeaturedProducts = () => {
  const [sliderState, setSliderState] = useState(0);
  const sliderRef = useRef(null);
  useConfigure({
    index: "products",
    hitsPerPage: 6,
  });
  const { items } = useHits();

  const top_5Products = useMemo(() => items, [items]);
    const [quickViewOpen, setQuickViewOpen] = React.useState(false);
    const [quickViewId , setQuickViewId] = React.useState(1);
    const [FeatureTab, setFeatureTab] = React.useState('1');

    function checkQwModalState(state , id) {
        setQuickViewOpen(state);
        setQuickViewId(id)
    }

    const loadFeaturedProduct = (tab) => {
        setFeatureTab(tab);
    }
  return (
    <div className="container mt-10 flex flex-col items-start gap-[29px] md:p-5">


        <div className="container mt-20 flex flex-col items-start md:p-5 ">
            <h2 className="text-gray-900 text-5xl text-center font-bold w-full md:text-2xl">Featured Products </h2>

            <div className="flex mx-auto md:flex-wrap my-5 mb-10">
                <a className={`py-2 px-7 md:px-2 text-gray-900 text-xl md:text-sm min-w-[150px] md:min-w-[30%] cursor-pointer ${FeatureTab === '1' ? "font-bold" : ""}`} onClick={() => loadFeaturedProduct('1')}>New Arrivals</a>
                <a className={`py-2 px-7 md:px-2 text-gray-900 text-xl md:text-sm min-w-[150px] md:min-w-[30%] cursor-pointer ${FeatureTab === '2' ? "font-bold" : ""}`} onClick={() => loadFeaturedProduct('2')}>Best Seller</a>
                <a className={`py-2 px-7 md:px-2 text-gray-900 text-xl md:text-sm min-w-[150px] md:min-w-[30%] cursor-pointer ${FeatureTab === '3' ? "font-bold" : ""}`} onClick={() => loadFeaturedProduct('3')}>Sale Items</a>
            </div>

            <div className="grid grid-cols-6 md:grid-cols-3 sm:grid-cols-1 w-full">
                {
                    top_5Products.map((item) => (
                    <ProductCard {...item} key={item._id} showQuick={true} className="my-4" _id={item.id}    qwModalOpenState={checkQwModalState} />
                ))}

                {
                    !top_5Products.length  &&
                    Array.from({length: 6}).map((_, i) => ( <Skeleton key={i}/> ))
                }
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

export default FeaturedProducts;
