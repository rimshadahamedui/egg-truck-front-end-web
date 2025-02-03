import React from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../../components/UserComponents";
import Footer from "../../../components/UserComponents/Footer";
import Header from "../../../components/UserComponents/Header";
import { backgroundPng } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import CategoryBanners from "../../../components/UserComponents/Home/CategoryBanners";
import TopProducts from "../../../components/UserComponents/Home/TopProducts";
import LatestProducts from "../../../components/UserComponents/Home/LatestProducts";
import HeroSection from "../../../components/UserComponents/Home/Hero/HeroSection";
import FeaturesSection from "../../../components/UserComponents/Home/FeaturesSection";
import BrandList from "../../../components/UserComponents/brandList";
import FeaturedProducts from "../../../components/UserComponents/Home/FeaturedProducts";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>
          Shop the Latest Fashion and Accessories - Home | Elite Digitals
        </title>
        <meta
          name="description"
          content="Discover our exclusive collection with free shipping on orders over $50. Explore best sellers and new arrivals in fashion and accessories. Start your shopping journey with Elite Digitals."
        />
      </Helmet>
      <div className="w-full bg-white-A700">
        {/* header section */}
        <Header />
        <div className="flex flex-col pb-[52px] md:pb-5">
          {/* hero slider section */}
          <HeroSection />
          <BrandList/>

          <div className="flex flex-col items-center">

            {/* Category section  */}
           {/* <CategoryBanners />*/}

            <FeaturedProducts/>

            {/* banner section */}
            <div className="container relative mt-[52px] h-[437px] rounded-[24px] bg-gray-100 md:p-5">
              <Img
                  src={backgroundPng}
                  alt="backgroundimage"
                  className=" absolute bottom-0 right-[0.00px]  top-0 my-auto h-[437px] w-[57%] object-cover "
              />
              <div className="absolute bottom-0 left-[0.00px] top-0 my-auto flex h-max w-[75%] py-[93px] pl-[120px] pr-14 md:p-5">
                <div className="flex w-[69%] flex-col items-start gap-[23px] md:w-full">
                  <div className="flex w-[66%] flex-col gap-3 md:w-full">
                    <div className="flex">
                      <Text size="lg" as="p">
                        100% Original Products
                      </Text>
                    </div>
                    <Heading size="lg" as="h1" className="leading-10">
                      <>
                        The All New Fashion
                        <br />
                        Collection Items
                      </>
                    </Heading>
                  </div>
                  <div className="flex">
                    <Text size="lg" as="p">
                      Starting from: $59.99
                    </Text>
                  </div>
                  <Button
                      color="gray_900"
                      size="md"
                      shape="round"
                      className="min-w-[144px] font-medium sm:px-5"
                      onClick={() => navigate("/shop?q=")}
                  >
                    Shop now
                  </Button>
                </div>
              </div>
            </div>

            {/* Latest Products */}
            <LatestProducts />

            {/* bestsellers section */}
            <TopProducts />


          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
