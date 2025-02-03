import React from "react";
import { Img } from "../Img";
import ProductCard from "../ProductCard";
import Skeleton from "../Skeleton";


function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [featuredProductsLoading, setFeaturedProductsLoading] = React.useState(false);
  const [FeatureTab, setFeatureTab] = React.useState('1');
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const [quickViewId , setQuickViewId] = React.useState(1);


  const HandleGetFeaturedProducts = async () => {
    setFeaturedProducts([]);
    setFeaturedProductsLoading(true);

    try {
      const { data } = await getFeaturedProducts();
      setFeaturedProducts(data);
      setFeaturedProductsLoading(false);
    } catch (error) {
      showToast("🧑‍💻️ Server error. Please check your internet.", "dark");
    }
  }

  useEffect(() => {
    HandleGetFeaturedProducts();
  }, []);


  const loadFeaturedProduct = (tab) => {
    HandleGetFeaturedProducts();
    setFeatureTab(tab);
  }

  function checkQwModalState(state , id) {
    setQuickViewOpen(state);
    setQuickViewId(id)
  }

  return (
      <div className="container mt-20 flex flex-col items-start md:p-5 ">
        <h2 className="text-gray-900 text-5xl text-center font-bold w-full md:text-2xl">Featured Products </h2>
        <div className="flex mx-auto md:flex-wrap my-5 mb-10">
          <a className={`py-2 px-7 md:px-2 text-gray-900 text-xl md:text-sm min-w-[150px] md:min-w-[30%] cursor-pointer ${FeatureTab === '1' ? "font-bold" : ""}`} onClick={() => loadFeaturedProduct('1')}>New Arrivals</a>
          <a className={`py-2 px-7 md:px-2 text-gray-900 text-xl md:text-sm min-w-[150px] md:min-w-[30%] cursor-pointer ${FeatureTab === '2' ? "font-bold" : ""}`} onClick={() => loadFeaturedProduct('2')}>Best Seller</a>
          <a className={`py-2 px-7 md:px-2 text-gray-900 text-xl md:text-sm min-w-[150px] md:min-w-[30%] cursor-pointer ${FeatureTab === '3' ? "font-bold" : ""}`} onClick={() => loadFeaturedProduct('3')}>Sale Items</a>
        </div>

        <div className="grid grid-cols-6 md:grid-cols-1 gap-5 w-full">
          {featuredProducts.map((item) => (
              <ProductCard {...item} key={item._id} showQuick={true} className="my-4"   qwModalOpenState={checkQwModalState} />
          ))}


          {!featuredProductsLoading &&
          Array.from({length: 6}).map((_, i) => (
              <Skeleton key={i}/>
          ))
          }
        </div>
      </div>
  );
}

export default FeaturedProducts;
