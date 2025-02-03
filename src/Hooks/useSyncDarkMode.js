import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const useSyncDarkMode = () => {
  const { colorMode } = useColorMode();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode, user]);
};

export default useSyncDarkMode;
