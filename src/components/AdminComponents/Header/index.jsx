import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";
import { useLocation } from "react-router-dom";
import { adminSidebarRoutes } from "../../../constants";
import { capitalize } from "../../../utils";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const [currentPageTitle, setCurrentPageTitle] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      const title =
        adminSidebarRoutes.find((route) => route.path === pathname)?.name ||
        null;
      setCurrentPageTitle(capitalize(title));
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, []);

  const { secondary, message } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  const mainText = useColorModeValue("navy.700", "white");
  const secondaryText = useColorModeValue("gray.700", "white");
  const navbarPosition = "fixed";
  const navbarFilter = "none";
  const navbarBackdrop = "blur(20px)";
  const navbarShadow = "none";
  const navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  const navbarBorder = "transparent";
  const secondaryMargin = "0px";
  const paddingX = "15px";
  const gap = "10px";

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", lg: "20px", xl: "20px" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 300px)",
        "2xl": "calc(100vw - 365px)",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        gap={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          {currentPageTitle && (
            <Breadcrumb>
              <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
                <BreadcrumbLink href="/admin" color={secondaryText}>
                  admin
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
                <Text color={secondaryText} className="hover:no-underline">
                  {currentPageTitle.toLocaleLowerCase()}
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
          {/* Here we create navbar brand, based on route name */}
          <Text
            color={mainText}
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="34px"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            className="font-dm-sans"
          >
            {currentPageTitle}
          </Text>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}
