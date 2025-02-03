import React, { useEffect, useMemo } from "react";
import Header from "../../../components/UserComponents/Header";
import {Img} from "../../../components/UserComponents/Img";
import Footer from "../../../components/UserComponents/Footer";




function Ecosystem() {

 
  return (
    <>
      <Header />

     
        <section className="bg-gradient-to-r from-thdark to-thlight">
          <div className="container mx-auto">
            <div className="w-3/4 mx-auto py-20 md:w-full md:py-10"> 
            <Img src="/images/elite-ico.svg" className="h-[250px] md:h-[100px] mx-auto block mb-5"/>
                <h1 className="font-bold mb-5 text-6xl text-center text-slate-50 md:text-4xl">Our Ecosystem</h1>
                <p className="font-bold text-center mt-10 text-3xl text-slate-50 md:text-lg">At Elite Digitals, we offer more than just digital services—we provide an entire ecosystem of support and growth opportunities for our clients.
                </p>
            </div>
          </div>
        </section>


        <section className="">
          <div className="container mx-auto my-20">
            <div className="w-3/4 mx-auto p-20 md:w-full md:py-10 md:px-2">
                <h1 className="font-bold mb-5 text-5xl text-center text-thdark md:text-3xl">Complete Digital Setup</h1>
                <p className=" text-center mt-10 md:mt-4 text-xl my-5 text-gray-600 md:text-sm"> From website development to digital marketing infrastructure, we cover everything to establish a strong online presence:
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-[40px] md:gap-[20px] mb-20 md:p-2">

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/website-dev.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Website Development</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Custom e-commerce platforms and professional websites.</p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/social.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Social Media Setup</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Integration and management of social media platforms.</p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/marketting.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Marketing Infrastructure</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Google Ads setup, SEO, Google Business Profile management, and more.</p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/legal.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Legal Support</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm">Our legal team can assist with business registration in the UAE and India. Additionally, through our partners, we can help streamline bank registration for clients looking to expand their business in Dubai.
                </p>
              </div>

              <div className="p-10 shadow-sm border border-gray-300  rounded-[26px]">
                <Img src="/images/services/tech.svg" className="h-[200px] md:h-[100px] mx-auto block" />
                <h2 className="text-4xl  font-bold text-center mt-4 md:text-2xl">Access to Top-Notch Tech Services</h2>
                <p className="text-center text-lg mt-3 text-gray-600 md:text-sm"> Through our network of agencies and white-labeled solutions, we offer our clients the best rates for various tech services, from cloud hosting to payment gateways
                </p>
              </div>

  
            </div>
          </div>
        </section>


      

     



    

     
      
     
  

      <Footer />
    </>
  );
}

export default Ecosystem;
