import React from "react";
import contohimg from "@/assets/icons/departments/contohgmbr.jpg";

export const ProkerCard = ({ title, description, image }) => {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-4xl">
      
      {/* IMAGE SECTION */}
      <div className="relative aspect-video">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="customClip">
              <path
                d="
                  M500 294 
                  L500 0 
                  L89.7378 0 
                  C84.3599 0 79.0875 1.55409 74.5664 4.46644 
                  C51.1805 19.5309 35.0719 29.9077 12.8441 44.2262 
                  C4.84246 49.3806 0 58.2516 0 67.7697 
                  L0 294 
                  L256 294 
                  Z
                "
              />
            </clipPath>
          </defs>

          <image
            href={image || contohimg}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#customClip)"
            className="w-full h-full object-cover"
          />
        </svg>

        {/* Overlay (biar mirip desain kamu) */}
        <div className="absolute inset-0 pointer-events-none"></div>
      </div>

      {/* CONTENT */}
      <div className="p-5 px-12 text-green-2 bg-[#F2F2F2] h-full w-full">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-justify">{description}</p>
      </div>
    </div>
  );
};