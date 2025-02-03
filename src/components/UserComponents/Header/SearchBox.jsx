import React, { useEffect, useRef, useState } from "react";
import { useSearchBox } from "react-instantsearch";
import { Input } from "../Input";
import { Img } from "../Img";
import { CloseSVG } from "../../../assets/images";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBox = () => {
    const { refine, clear } = useSearchBox();
    const { pathname } = useLocation();
    const [params] = useSearchParams();
    const [value, setValue] = useState();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const setQuery = (newQuery) => {
        if (!newQuery) clear();
        if (pathname === "/shop") refine(newQuery);
        setValue(newQuery);
    };
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams();
            params.set("q", value);
            navigate(`/shop?${params.toString()}`);
            //   refine(value);
        }
    };
    useEffect(() => {
        if (pathname === "/shop") {
            const query = params.get("q");
            setValue(query);
        } else setQuery("");
    }, [pathname, params]);

    return (
        <Input
            color="gray_50_01"
            name="Search Bar"
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={512}
            placeholder={`What are you looking for ?`}
            value={value}
            onChange={(value) =>
                pathname === "/shop" ? setQuery(value) : setValue(value)
            }
            onKeyDown={handleEnter}
            prefix={
                <Img
                    src="/images/search.svg"
                    alt="svg"
                    className="h-[20px] w-[20px] cursor-pointer self-center"
                    //   onClick={() => navigate("/shop")}
                />
            }
            suffix={
                value?.length > 0 ? (
                    <CloseSVG
                        className="cursor-pointer self-center"
                        onClick={() => {
                            clear();
                            setQuery("");
                        }}
                        fillColor="#4b5563ff"
                    />
                ) : null
            }
            className="order-2 md:order-3 gap-2.5 rounded-[26px] text-blue_gray-700 md:w-full sm:px-5 w-full md:min-w-full"
        />
    );
};

export default SearchBox;
