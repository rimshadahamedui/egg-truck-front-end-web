import React, { useEffect, useMemo } from "react";
import Header from "../../../components/UserComponents/Header";
import {Img} from "../../../components/UserComponents/Img";
import Footer from "../../../components/UserComponents/Footer";




function AiFeatures() {

 
  return (
    <>
      <Header />

     
      <section className="bg-gradient-to-r from-thdark to-thlight">
          <div className="container mx-auto">
            <div className="w-3/4 mx-auto py-20 md:w-full md:py-10"> 
            <Img src="/images/elite-ico.svg" className="h-[250px] md:h-[100px] mx-auto block mb-5"/>
                <h1 className="font-bold mb-5 text-6xl text-center text-slate-50 md:text-4xl">AI & Digital Transformation</h1>
                <p className="font-bold text-center mt-10 text-3xl text-slate-50 md:text-lg">keep your business ahead of the curve. Here’s a glimpse of what’s on the horizon.
                </p>
            </div>
          </div>
        </section>


        <section className="">
          <div className="container mx-auto my-20">
            <div className="w-full mx-auto p-20 md:w-full md:py-10 md:px-2">
                <h1 className="font-bold mb-5 text-5xl text-center text-thdark md:text-3xl">What we offer ?</h1>
                <p className=" text-center mt-10 md:mt-4 text-xl my-5 text-gray-600 md:text-sm"> We harness the power of AI to deliver cutting-edge features that elevate your e-commerce experience.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-[40px] md:gap-[20px] mb-20 md:p-2">

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/support.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Automated Customer Support</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">With intelligent chatbots, your customers receive instant answers, reducing the need for manual support.
                </p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/text-to.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Speech-to-Text & Text-to-Speech</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Enhance accessibility and engagement with integrated voice features, making interactions easier for all users.
                </p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/analytics.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Predictive Analytics</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Stay ahead of market trends with AI-driven insights into customer behavior and sales forecasts.</p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/ai-marketting.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Personalization at Scale</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Create tailored shopping experiences through dynamic product recommendations and personalized marketing. </p>
              </div>

            

  
            </div>
          </div>
        </section>



      

     



    

     
      
     
  

      <Footer />
    </>
  );
}

export default AiFeatures;
