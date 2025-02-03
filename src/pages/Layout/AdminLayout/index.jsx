// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/AdminComponents/Header";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { darkColor } from "../../../constants";
import useSyncDarkMode from "../../../Hooks/useSyncDarkMode";
export default function AdminLayout(props) {
  useSyncDarkMode();

  const { ...rest } = props;
  const bg = useColorModeValue("gray.50", darkColor);

  const [fixed] = useState(false);
  const { onOpen } = useDisclosure();
  return (
    <Box>
      <Box>
        <Sidebar display="none" />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 250px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 250px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
          bg={bg}
        >
          <Portal>
            <Box>
              <AdminNavbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PRO"}
                brandText={"Dashboard"}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
          <Box mt={20}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
