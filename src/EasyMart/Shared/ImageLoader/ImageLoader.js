import React, { useState, useRef } from 'react';
import { useIntersection } from './intersectionObserver';
import './imageLoader.css';

const ImageLoader = ({ url, thumb, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };


  return (
    <div
        className="image-loader-container"
        ref={imgRef}
        style={{
          height: '100%'
        }}
      >
        {isInView && (
          <>
            <img
              className={isLoaded ? 'image-loader-img thumb isLoaded' : 'image-loader-img thumb'}
              src={thumb}
              alt=""
            />
            <img
              className={isLoaded ? 'image-loader-img isLoaded' : 'image-loader-img'}
              src={url}
              onLoad={handleOnLoad}
              alt=""
            />
          </>
        )}
    </div>
  );
};

export default ImageLoader;
