import { useState, useEffect, useRef } from "react";
import styles from "./imageSlider.module.css";

type ImageSliderProps = {
  totalImages: number;
  displayTime?: number;
};

const ImageSlider = ({ totalImages, displayTime = 2500 }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovered = useRef(false);

  const changeImage = (index: number) => {
    setCurrentIndex(() => (index + totalImages) % totalImages);
  };

  const startAutoSlide = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, displayTime);
  };

  const clearSlideTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered.current) {
      startAutoSlide();
    }

    return () => {
      clearSlideTimeout();
    };
  }, [currentIndex, displayTime, totalImages]);

  const goToPrevious = () => {
    clearSlideTimeout();
    changeImage(currentIndex - 1);
    startAutoSlide();
  };

  const goToNext = () => {
    clearSlideTimeout();
    changeImage(currentIndex + 1);
    startAutoSlide();
  };

  const getImageName = (index: number) => {
    return `/assets/images/image${index + 1}.png`;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    clearSlideTimeout();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    startAutoSlide();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    const img = e.currentTarget as HTMLImageElement;
    img.style.transformOrigin = `${(offsetX / width) * 100}% ${(offsetY / height) * 100}%`;
  };

  return (
    <div className={styles.sliderContainer}>
      <button onClick={goToPrevious} className={styles.navButton}>
        Previous
      </button>
      <div className={styles.sliderWrapper}>
        <img
          src={getImageName(currentIndex)}
          alt={`Image ${currentIndex + 1}`}
          className={styles.sliderImage}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <button onClick={goToNext} className={styles.navButton}>
        Next
      </button>
    </div>
  );
};

export default ImageSlider;
