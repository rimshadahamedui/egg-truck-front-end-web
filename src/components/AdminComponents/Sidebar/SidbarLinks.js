/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { adminSidebarRoutes } from "../../../constants";

export function SidebarLinks({ handleClick }) {
  let { pathname } = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue("gray.600", "gray.600");
  let activeIcon = useColorModeValue("blue.500", "white");
  let textColor = useColorModeValue("gray.500", "white");
  let brandColor = useColorModeValue("blue.500", "brand.400");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return pathname.includes(routeName);
  };

  return adminSidebarRoutes.map((route, index) => {
    return (
      <NavLink
        key={index}
        to={route.path}
        onClick={() => handleClick && handleClick()}
      >
        <Box gap="3" justifyContent="space-between">
          <HStack
            spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
            py="5px"
            ps="10px"
            className="rounded-md"
            role="group"
            _hover={{
              bg: useColorModeValue("gray.100", "gray.600"),
            }}
          >
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Box
                color={
                  activeRoute(route.path.toLowerCase()) ? activeIcon : textColor
                }
                me="18px"
                _groupHover={{ color: useColorModeValue("blue.500", "none") }}
              >
                {route.icon}
              </Box>
              <Text
                me="auto"
                color={
                  activeRoute(route.path.toLowerCase())
                    ? activeColor
                    : textColor
                }
                fontWeight={
                  activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                }
                _groupHover={{
                  color: useColorModeValue("black", "none"),
                }}
              >
                {route.name}
              </Text>
            </Flex>
            <Box
              h="36px"
              w="4px"
              bg={
                activeRoute(route.path.toLowerCase())
                  ? brandColor
                  : "transparent"
              }
              borderRadius="5px"
            />
          </HStack>
        </Box>
      </NavLink>
    );
  });
}

export default SidebarLinks;
