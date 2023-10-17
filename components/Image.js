"use client";
import Image from "next/image"
import { useState, useEffect } from "react";

export default function ImageWrapper({ className, src, desktopSize, mobileSize, alt, loader, fill, quality, priority, placeholder, style, onLoadingComplete, onLoad, onError, loading, blurDataURL}) {
    const size = useWindowSize();

    if ((size && size.width > 1024) || !mobileSize) var imgSize = desktopSize
    else var imgSize = mobileSize

    return (
        <Image
            src={src}
            alt={alt}
            loader={loader}
            fill={fill}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            style={style}
            onLoadingComplete={onLoadingComplete}
            onLoad={onLoad}
            onError={onError}
            loading={loading}
            blurDataURL={blurDataURL}
            width={imgSize[0]}
            height={imgSize[1]}
            className={className}
        />
    )
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      window.addEventListener("resize", handleResize);
       
      handleResize();
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }