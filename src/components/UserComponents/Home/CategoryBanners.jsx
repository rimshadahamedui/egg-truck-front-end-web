import React, { useEffect, useRef, useState } from "react";
import { Heading, Slider } from "..";
import useFetchApi from "../../../Hooks/useFetchApi";
import { USER_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

const CategoryBanners = () => {
  const [sliderState, setSliderState] = useState(0);
  const { data } = useFetchApi({ url: USER_URL + "/categories" });
  const sliderRef = useRef(null);

  return (
    <>
      {/* collections section */}
      <div className="container-xs mt-10 flex flex-col items-center gap-[34px] md:p-5">
        <div className="flex self-start">
          <Heading size="lg" as="h1" className="!font-dm-sans">
            <span className="text-gray-900">Start exploring.&nbsp;</span>
            <span className="text-blue_gray_700_cc">
              Good things are waiting for you
            </span>
          </Heading>
        </div>
        <div className="flex flex-col items-center gap-16 self-stretch sm:gap-8">
          <div className="mx-auto flex w-full max-w-[1296px] gap-3 self-stretch md:mx-0 md:flex-col">
            <Slider
              autoPlay
              autoPlayInterval={2000}
              responsive={{
                0: { items: 1 },
                550: { items: 2 },
                1050: { items: 4 },
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
              items={data.map((category) => (
                <CategoryCard {...category} key={category._id} />
              ))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBanners;

const CategoryCard = ({ name, url, image }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[250px] rounded-xl space-y-2 border border-gray-200 bg-white-A700 overflow-y-hidden">
      <div className="flex items-center rounded-md h-60 mb-2  bg-black">
        <img
          src={
            image ||
            "https://s3-alpha-sig.figma.com/img/d157/5026/b4a19949b8a5a72c8a3ec64702a26b54?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nrn4MZuQqruGS1sZPRxeU3Rwn4Ra6EFxeA-Z6ofwQ1rVYdzC9-hMex8XcOZU9Crph-xU7svTNDfq45JuYqsCXOh~9lunVUeSGzXlgZU-SWtRfEFki1Jv~-cE33yRyiO86t6zMc0IxsrShz-vFZuzGMdAtXwXXT6ttLsEgFYascqUaKD7AYbsGXHLSNr2d66PF-mggPWKHIcwzbEuSQw84R0l-tiMKgGgKMfFgx557URLZ1E~zrfbgUsLrzrRqFSpeouSzIT9hb3JqyAeun3gPgCYnLrWyWbBaMoTLBmc~fLjG6Djl3Ki2L7he~SDihpCSWvDuw9RfS2iE~IKE3bJ3g__"
          }
          alt={`Cateory-${name}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold">Explore {name}</h2>
        <p className="text-sm text-gray-500">Starting at $24</p>
        <div className="relative -mt-7 bg-black text-white text-center py-2 w-3/4 h-20 rounded-full transform translate-y-1/2">
          <button
            className="abosolute top-0 text-white-A700 text-sm font-bold"
            onClick={() => navigate(`/shop?q=&category[0]=${name}`)}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};
