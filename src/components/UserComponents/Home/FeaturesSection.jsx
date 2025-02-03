import React from "react";
import { Img } from "../Img";
import { Heading } from "../Heading";
import { Text } from "../Text";

const FeaturesSection = () => {
  return (
    <div className="container-xs flex items-center justify-center rounded-[16px] border border-solid border-gray-200 bg-white-A700 px-6 pb-[23px] pt-6 md:flex-col md:p-5">
      <div className="flex w-[24%] justify-between gap-5 md:w-full">
        <div className="flex items-center gap-4">
          <Img
            src="images/shipping.svg"
            alt="shipping icon"
            className="h-[24px] w-[24px]"
          />
          <div className="flex flex-col items-start">
            <div className="flex">
              <Heading size="s" as="h2">
                Free shipping
              </Heading>
            </div>
            <Text size="s" as="p">
              On orders over $50.00
            </Text>
          </div>
        </div>
        <div className="h-full w-px bg-gray-200" />
      </div>
      <div className="flex flex-1 items-center gap-[0.5px] md:flex-col md:self-stretch">
        <div className="flex items-center gap-4 pl-8 pr-[57px] md:pr-5 sm:px-5">
          <Img
            src="images/return.svg"
            alt="return icon"
            className="h-[24px] w-[24px]"
          />
          <div className="flex flex-col items-start">
            <div className="flex">
              <Heading size="s" as="h3">
                Very easy to return
              </Heading>
            </div>
            <div className="flex">
              <Text size="s" as="p">
                Just phone number
              </Text>
            </div>
          </div>
        </div>
        <div className="h-[50px] w-px bg-gray-200" />
        <div className="flex items-center gap-4 pl-8 pr-[55px] md:pr-5 sm:px-5">
          <Img
            src="images/worldwide.svg"
            alt="delivery icon"
            className="h-[24px] w-[24px]"
          />
          <div className="flex flex-col items-start">
            <div className="flex">
              <Heading size="s" as="h4">
                Worldwide delivery
              </Heading>
            </div>
            <div className="flex">
              <Text size="s" as="p">
                Fast delivery worldwide
              </Text>
            </div>
          </div>
        </div>
        <div className="h-[50px] w-px bg-gray-200" />
        <div className="flex items-center">
          <div className="h-[50px] w-px bg-gray-200" />
          <div className="flex items-center gap-4 pl-8 pr-6 sm:px-5">
            <Img
              src="images/refund.svg"
              alt="svg"
              className="h-[24px] w-[24px]"
            />
            <div className="flex flex-col items-start">
              <div className="flex">
                <Heading size="s" as="h5">
                  Refunds policy
                </Heading>
              </div>
              <div className="flex">
                <Text size="s" as="p">
                  60 days return for any reason
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
