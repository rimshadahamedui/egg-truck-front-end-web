import React, { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import { axiosPublicInstance } from "../../../../utils/api/axiosInstance";
import { USER_URL } from "../../../../constants";
import { useSelector } from "react-redux";
import showToast from "../../../../utils/showToast";
import { Slider } from "../../Slider";

const HeroSection = () => {
  const [sliderState, setSliderState] = useState(0);
  const [banners, setBanners] = useState([]);
  const sliderRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data: banners } = await axiosPublicInstance(
          USER_URL + "/banners"
        );
        setBanners(
          user?.isB2B ? banners.data.filter((item) => item.isB2B) : banners.data
        );
      } catch (error) {
        showToast(error.message, "dark");
      }
    };
    fetchBanners();
  }, [user]);

  return (
    <div className="flex flex-col items-center hero-sl">
      <div className="max-w-screen-2xl flex w-full self-stretch">
        <Slider
          autoPlay
          autoPlayInterval={2000}
          responsive={{
            0: { items: 1 },
            550: { items: 1 },
            1050: { items: 1 },
          }}
          renderDotsItem={(props) => {
            return props?.isActive ? (
              <div className="mr-3 h-[8px] w-[40px] rounded bg-gray-900" />
            ) : (
              <div className="mr-3 h-[8px] w-[8px] rounded bg-gray_900_cc" />
            );
          }}
          activeIndex={sliderState}
          onSlideChanged={(e) => {
            setSliderState(e?.item);
          }}
          ref={sliderRef}
          items={
            banners.length
              ? [banners[1]].map((item) => <Banner {...item} key={item._id} />)
              : [<Banner />]
          }
        />
      </div>
    </div>
  );
};

export default HeroSection;
