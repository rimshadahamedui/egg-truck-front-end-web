import React, { useEffect, useMemo } from "react";
import Header from "../../../components/UserComponents/Header";
import {Img} from "../../../components/UserComponents/Img";
import Footer from "../../../components/UserComponents/Footer";




function Aboutus() {

 
  return (
    <>
      <Header />

     
        <section className="bg-gradient-to-r from-thdark to-thlight">
          <div className="container mx-auto">
            <div className="w-3/4 mx-auto py-20">
                <Img src="/images/elite-ico.svg" className="h-[250px] md:h-[100px] mx-auto block mb-5"/>
                <h1 className="font-bold mb-5 text-5xl text-center text-slate-50">Welcome To Elite Digitals</h1>
                <p className="text-center mt-10 text-lg text-slate-50">Elite Digitals is at the forefront of digital transformation, offering comprehensive e-commerce solutions, digital marketing, automation, and AI integration. Our mission is to empower businesses by providing tailored digital services that allow them to thrive in the competitive online marketplace. Whether building a new online store or optimizing an existing one, our team is dedicated to delivering high-quality solutions that are secure, scalable, and user-centric</p>
            </div>
          </div>
        </section>


        <section className="bg-light-f6">
          <div className="container mx-auto py-20">
            <div className="w-3/4 mx-auto">
                <h1 className="font-bold mb-5 text-5xl text-center">Our Approach</h1>
                <p className="text-center mt-10 text-lg">“At Elite Digitals, we pride ourselves on a client-first approach. We understand that each business has unique needs, which is why we provide customizable solutions that fit your brand’s identity and business goals. Our streamlined processes ensure quick turnarounds without compromising on quality, enabling our clients to go live with their digital solutions in as little as <b>7-15 working days</b> .”</p>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto py-20">
            <div className="w-3/4 mx-auto mb-20">
                <h1 className="font-bold mb-5 text-5xl text-center">Cost Structure</h1>
                <p className="text-center mt-10 text-lg">Our pricing is designed to offer flexibility and transparency</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-1 gap-10">
              <div className="bg-light-f6 p-8 flex flex-col">
                <h3 className="text-3xl thdark font-bold mb-3">Development Cost</h3>
                <p>Determined based on the specific needs of your project – To Be Decided.</p>
                <div className="flex justify-end mt-auto">
                  <Img src="images/about/cost-1.jpg"  />
                </div>
              </div>

              <div className="bg-light-f6 p-8 flex flex-col">
                <h3 className="text-3xl thdark font-bold mb-3">Infrastructure Cost</h3>
                <p>Includes hosting, cloud services, and other technical setups, billed directly to the client.</p>
                <div className="flex justify-end mt-auto">
                  <Img src="images/about/cost-2.jpg"  />
                </div>
              </div>

              <div className="bg-light-f6 p-8 flex flex-col">
                <h3 className="text-3xl thdark font-bold mb-3">Additional Services</h3>
                <p>We offer a range of optional services, including full digital setup, social media integration, and more, to ensure your online presence is complete.</p>
                <div className="flex justify-end mt-auto">
                  <Img src="images/about/cost-3.jpg"  />
                </div>
              </div>
            </div>
          </div>
        </section>

     



    

     
      
     
  

      <Footer />
    </>
  );
}

export default Aboutus;
