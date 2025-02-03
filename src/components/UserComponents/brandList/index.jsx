import React from "react";
import { Img } from "../Img";


function BrandList() {
  return (
   <div className="w-full bg-gray-100 py-10 my-0 md:px-5 md:py-5">
    <div className="container mx-auto">
  

    <div className="flex justify-between md:justify-center gap-5 md:flex-wrap">
        <h1 className="text-4xl font-bold self-center md:text-2xl md:min-w-full">Top Brands</h1>
        <Img src="/images/brands/b-1.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>
        <Img src="/images/brands/b-2.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>
        <Img src="/images/brands/b-3.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>
        <Img src="/images/brands/b-4.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>
        <Img src="/images/brands/b-5.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>
        <Img src="/images/brands/b-1.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>
        <Img src="/images/brands/b-2.svg "  className="h-[100px] my-5 md:my-2 md:h-[50px]" alt="brand-1"/>

    </div>


    </div>
   </div>
  );
}

export default BrandList;
