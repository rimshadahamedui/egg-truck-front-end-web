// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
import Links from "./SidbarLinks";
import React from "react";

function SidebarContent({ handleClick }) {
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      <div className="size-16 mx-auto mb-5">
        <img
          src="/images/1.png"
          alt="Company logo"
          className="object-cover rounded-md"
        />
      </div>
      <hr className="h-px bg-gray-300 mb-5" />

      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links handleClick={handleClick} />
        </Box>
      </Stack>

      <Box mt="60px" mb="40px" borderRadius="30px"></Box>
    </Flex>
  );
}

export default SidebarContent;
