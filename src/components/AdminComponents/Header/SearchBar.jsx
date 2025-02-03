import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  //   const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  return (
    <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg="inherit"
            borderRadius="inherit"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon
                className="text-gray-700"
                width="15px"
                height="15px"
              />
            }
          ></IconButton>
        }
      />
      <Input
        variant="search"
        fontSize="sm"
        bg="gray.100"
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "Search..."}
      />
    </InputGroup>
  );
}
