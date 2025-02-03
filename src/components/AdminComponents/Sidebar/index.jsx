import React, { useRef } from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { IoMenuOutline } from "react-icons/io5";
import Content from "./SidebarContent";
import { darkColor } from "../../../constants";

function Sidebar() {
  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", darkColor);
  let sidebarMargins = "0px";

  // SIDEBAR
  return (
    <Box
      display={{ sm: "none", xl: "block" }}
      w="100%"
      position="fixed"
      minH="100%"
    >
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="250px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
        borderRight="1px"
        borderColor="gray.300"
      >
        <Content />
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive() {
  let sidebarBackgroundColor = useColorModeValue("white", darkColor);
  let menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            {" "}
            <Content handleClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
