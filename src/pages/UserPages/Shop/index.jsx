import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../../../components/UserComponents";
import Footer from "../../../components/UserComponents/Footer";
import Header from "../../../components/UserComponents/Header";
import ProductCard from "../../../components/UserComponents/ProductCard";
import Skeleton from "../../../components/UserComponents/Skeleton";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  RefinementList,
  useHits,
  useInstantSearch,
  usePagination,
} from "react-instantsearch";
import PriceRangeInput from "../../../components/UserComponents/Shop/PriceRangeInput";
import SortInput from "../../../components/UserComponents/Shop/SortInput";
import env from "../../../utils/config/env";
import ClearFilters from "../../../components/UserComponents/Shop/ClearFilters";
import { transformItems } from "../../../utils";
// import Pagination from "../../../components/UserComponents/Pagination";

export default function ShoppageDesktopPage() {
  const { setUiState } = useInstantSearch();
  const [params] = useSearchParams();
  // useConfigure({ query: params.get("q") });
  const { items } = useHits({ transformItems });
  // const {nbHits,nbPages,pages,refine,} = usePagination()

  const filteredProducts = useMemo(() => items, [items]);
  const { status } = useInstantSearch();

  useEffect(() => {
    const category = params.get("category[0]");
    const q = params.get("q");
    const subcategory = params.get("subcategory[0]");
    if (!q) {
      params.set("q", "");
    }
    if (category || subcategory)
      setUiState((prevUiState) => {
        const { refinementList } = prevUiState[env.ALGOLIA_INDEX_NAME];
        return {
          ...prevUiState,
          [env.ALGOLIA_INDEX_NAME]: {
            ...prevUiState[env.ALGOLIA_INDEX_NAME],
            refinementList: {
              ...prevUiState[env.ALGOLIA_INDEX_NAME]?.refinementList,
              "category.name": (() => {
                const existingCategories =
                  refinementList?.["category.name"] || [];

                if (category) {
                  // If category exists, add it to the existing categories if not already present
                  return existingCategories.includes(category)
                    ? existingCategories // Keep existing if already included
                    : [...existingCategories, category]; // Append the new category
                }

                return existingCategories; // Return existing categories if no new category
              })(),
              "subcategory.name": (() => {
                const existingSubcategories =
                  refinementList?.["subcategory.name"] || [];

                if (subcategory) {
                  return existingSubcategories.includes(subcategory)
                    ? existingSubcategories
                    : [...existingSubcategories, subcategory];
                }

                return existingSubcategories;
              })(),
            },
          },
        };
      });
  }, [params]);
  return (
    <>
      <Helmet>
        <title>
          Shop the Latest Fashion and Accessories - Elite Digital
        </title>
        <meta
          name="description"
          content="Discover the latest in men's and women's fashion, kids' toys, and accessories at Elite Digitals. Find your style with our range of products, from affordable to luxury items. Shop now for the best deals!"
        />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-14 bg-white-A700 sm:gap-7">
        {/* header section */}
        <Header className="self-stretch" />

        {/* sidebar section */}
        <div className="container">
          <div className="relative  flex items-start gap-4 md:flex-col">
            <div className="flex w-[18%] flex-col gap-8 md:w-full">
              {/* categoris */}
              <div className="flex flex-col items-start gap-[23px] border-b border-solid border-gray-200 pb-10 sm:pb-5">
                <div className="flex">
                  <Heading size="s" as="h1">
                    Categories
                  </Heading>
                </div>
                <div className="flex flex-col gap-[15px] md:w-full">
                  <RefinementList attribute="category.name" />
                  <h3 className="text-lg font-medium">Sub Categories</h3>
                  <RefinementList attribute="subcategory.name" />
                </div>
              </div>

              <div className=" border-b border-solid border-gray-200 pb-10 sm:pb-5">
                <div className="flex">
                  <Heading size="s" as="h2">
                    Price range
                  </Heading>
                </div>
                <div className="flex flex-col gap-5">
                  <PriceRangeInput />
                </div>
              </div>
              <div className="flex flex-col items-start gap-6 pb-[15px]">
                <div className="flex">
                  <Heading size="s" as="h3">
                    Sort order
                  </Heading>
                </div>
                <SortInput />
              </div>
              <ClearFilters />
            </div>

            {/* products grid section */}
            <div className="sm:mt-5 flex flex-1 flex-col items-center  md:self-stretch">
              <div className="grid w-full grid-cols-5 md:grid-cols-2 sm:grid-cols-1  place-content-center ">
                {status === "loading" || status === "stalled" ? (
                  Array.from({ length: 15 }).map((_, i) => <Skeleton key={i} />)
                ) : (
                  <>
                    {filteredProducts.length ? (
                      filteredProducts.map((item) => (
                        <ProductCard
                          {...item}
                          key={item._id || item.id}
                          _id={item.id}
                          showWishlistIcon={false}
                        />
                      ))
                    ) : (
                      <h1 className="text-lg font-medium text-center text-gray-500">
                        No products found
                      </h1>
                    )}
                  </>
                )}
              </div>
              {/* pagination section */}

              <Pagination totalPages={5} padding={2} />
              {/* <Pagination /> */}

              {/* <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Img
                    src="images/rightarrow.svg"
                    alt="left arrow"
                    className="h-[26px] transform -scale-x-100 "
                  />
                  <Button
                    color="gray_200_7f"
                    size="sm"
                    shape="round"
                    className="min-w-[36px]"
                  >
                    1
                  </Button>
                  <div className="ml-[17px] flex flex-col pt-px">
                    <Text as="p">2</Text>
                  </div>
                  <div className="ml-[30px] flex flex-col pt-px">
                    <Text as="p">3</Text>
                  </div>
                  <div className="ml-[29px] flex flex-col pt-px">
                    <Text as="p">4</Text>
                  </div>
                  <div className="ml-[29px] flex flex-col pt-px">
                    <Text as="p">5</Text>
                  </div>
                </div>
                <Img
                  src="images/rightarrow.svg"
                  alt="right arrow"
                  className="h-[26px]"
                />
              </div> */}
            </div>
          </div>
        </div>
        <Footer className="self-stretch" />
      </div>
    </>
  );
}
