import React from "react";
import {Img} from "../Img";
import {Heading} from "../Heading";
import {Text} from "../Text";


const PolicyListVerticle = () => {
  return (
    <>
    <div className="p-6 flex rounded-[16px]">

           


              <div className="flex flex-col justify-normal gap-8">

              <div className="flex justify-between gap-5 md:w-full ">
                <div className="flex items-center gap-4 px-5 text-nowrap">
                  <Img src="/images/shipping.svg" alt="shipping icon" className="h-[24px] w-[24px]" />
                  <div className="flex flex-col items-start">
                    <div className="flex">
                      <Heading size="s" as="h2">Free shipping</Heading>
                    </div>
                    <Text size="s" as="p">On orders over $50.00</Text>
                  </div>
                </div>
              </div>


                <div className="flex items-center gap-4 px-5">
                  <Img src="/images/return.svg" alt="return icon" className="h-[24px] w-[24px]"/>
                  <div className="flex flex-col items-start">
                    <div className="flex">
                      <Heading size="s" as="h3"> Easy to return</Heading>
                    </div>
                    <div className="flex">
                      <Text size="s" as="p">Hassle-Free Shopping</Text>
                    </div>
                  </div>
                </div>

            

                <div className="flex items-center gap-4 px-5">
                  <Img src="/images/worldwide.svg" alt="delivery icon" className="h-[24px] w-[24px]"/>
                  <div className="flex flex-col items-start">
                    <div className="flex">
                      <Heading size="s" as="h4">Worldwide delivery</Heading>
                    </div>
                    <div className="flex">
                      <Text size="s" as="p">Fast delivery worldwide</Text>
                    </div>
                  </div>
                </div>


                <div className="flex items-center">
                  <div className="flex items-center gap-4 px-5">
                    <Img src="/images/refund.svg" alt="svg" className="h-[24px] w-[24px]"/>
                    <div className="flex flex-col items-start">
                      <div className="flex">
                        <Heading size="s" as="h5">Refunds policy</Heading>
                      </div>
                      <div className="flex">
                        <Text size="s" as="p">60 days return for any reason</Text>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              </div>
    </>
  );
}

export default PolicyListVerticle;
