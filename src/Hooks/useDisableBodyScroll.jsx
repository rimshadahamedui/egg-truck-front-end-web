import { useEffect } from "react";

// Disbale background scroll when modal is open
const useDisableBodyScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
};

export default useDisableBodyScroll;
