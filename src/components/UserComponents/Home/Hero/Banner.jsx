import React from "react";
import { Heading } from "../../Heading";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../Button";

const Banners = ({
  name = " Starting from: $49.99",
  description = `Exclusive collection for everyone`,
  url,
  image = "/images/music-bg.jpg",
}) => {
  return (
    // <div
    //   className="flex h-[600px] items-center  bg-cover bg-no-repeat py-[148px] md:h-auto md:py-5"
    //   style={{ backgroundImage: `url(${image})` }}
    // >
    //   <div className="container-xs flex md:p-5">
    //     <div className="flex w-[49%] flex-col items-start gap-[23px] pb-5 md:w-full pl-5">
    //       <div className="flex">
    //         <Heading size="xl" as="h1" className="text-white-A700">
    //           {/* {name} */}
    //         </Heading>
    //       </div>
    //       <Heading
    //         size="md"
    //         as="h1"
    //         className="w-full !font-semibold   text-white-A700"
    //       >
    //         {description}
    //       </Heading>
    //       <Link to={url || "/shop?q="}>
    //         <Button
    //           color="gray_900"
    //           size="lg"
    //           rightIcon={<Search className="size-5 text-white-A700 ml-2" />}
    //           className="min-w-[198px] gap-px rounded-[32px] font-medium sm:px-5"
    //         >
    //           Explore now
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="flex h-[470px] items-center  bg-cover bg-no-repeat py-[148px] md:h-auto md:py-5" style={{ backgroundImage: `url(${image})` }}>
      <div className="container mx-auto flex md:p-2">
        <div className="flex w-[49%] flex-col items-start gap-[23px] md:gap-[10px] pb-5 md:w-full pl-5">
          <div className="flex">
            <p className="text-lg font-semibold text-gray-500 md:text-sm">{name}</p>
          </div>
          <h1 className="w-full font-bold text-6xl md:text-2xl">
            {description}
          </h1>
          <Link to={url || "/shop?q="}>
            <button className="bg-thdark px-10 text-xl font-bold rounded-full text-slate-50 py-5 flex md:text-sm md:py-2 ms:px-3">
              <Search className="size-5 text-white-A700 me-2 self-center" />
              Explore now</button>
          </Link>
        </div>
      </div>
    </div>

    // <section
    //   className="relative h-[600px]
    //  bg-cover bg-center bg-no-repeat"
    //   style={{ backgroundImage: `url(${image})` }}
    // >
    //   <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" />
    //   <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
    //     <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
    //       <h1 className="text-3xl font-extrabold sm:text-5xl">
    //         Let us find your
    //         <strong className="block font-extrabold text-rose-700">
    //           {" "}
    //           Forever Home.{" "}
    //         </strong>
    //       </h1>
    //       <p className="mt-4 max-w-lg sm:text-xl/relaxed">
    //         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
    //         illo tenetur fuga ducimus numquam ea!
    //       </p>
    //       <div className="mt-8 flex flex-wrap gap-4 text-center">
    //         <a
    //           href="#"
    //           className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
    //         >
    //           Get Started
    //         </a>
    //         <a
    //           href="#"
    //           className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
    //         >
    //           Learn More
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Banners;
