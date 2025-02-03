import React, { useLayoutEffect, useRef } from "react";
import { MIN_TEXT_AREA_HEIGHT } from "../constants";

export default function useDynamicTextArea(value) {
  const textareaRef = useRef(null);
  useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";

    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXT_AREA_HEIGHT
    )}px`;
  }, [value]);
  return { textareaRef };
}
