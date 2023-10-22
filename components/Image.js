"use client";
import Image from "next/image"
import { useState, useEffect } from "react";

export default function ImageWrapper({ className, desktopSrc, mobileSrc, desktopSize, mobileSize, alt, loader, fill, quality, priority, placeholder, style, onLoadingComplete, onLoad, onError, loading, blurDataURL, sizes}) {
    const size = useWindowSize();

    var imgSize, imgSrc
    if ((size && size.width > 1024) || !mobileSize || !mobileSrc) {
      imgSize = desktopSize
      imgSrc = desktopSrc
    } else {
      imgSize = mobileSize
      imgSrc = mobileSrc
    }

    return (
        <Image
            src={imgSrc}
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
            sizes={sizes}
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