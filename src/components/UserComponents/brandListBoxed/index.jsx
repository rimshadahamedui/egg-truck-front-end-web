import React from "react";
import { Img } from "../Img";


function BrandListBoxed() {
  return (
   <div className="px-20 my-0">
    <div className="mx-auto">
    <h1 className="text-md font-bold self-center mt-5">Top Brands</h1>

    <div className="flex justify-between gap-5 opacity-75">
        
        <Img src="/images/brands/b-1.svg "  className="h-[100px] my-5" alt="brand-1"/>
        <Img src="/images/brands/b-2.svg "  className="h-[100px] my-5" alt="brand-1"/>
        <Img src="/images/brands/b-3.svg "  className="h-[100px] my-5" alt="brand-1"/>
        <Img src="/images/brands/b-4.svg "  className="h-[100px] my-5" alt="brand-1"/>
        <Img src="/images/brands/b-5.svg "  className="h-[100px] my-5" alt="brand-1"/>
  

    </div>


    </div>
   </div>
  );
}

export default BrandListBoxed;
