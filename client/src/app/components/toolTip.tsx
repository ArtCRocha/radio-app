import React, { useState } from "react";
import { TooltipProps } from "../types/toolTip";

export default function ToolTip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-white bg-[#1267fc] rounded-md text-sm shadow-lg">
          {text}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#1267fc] rotate-45"></div>
        </div>
      )}
    </div>
  );
}
