import Button from "@/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PhotoGallery = ({ imgs }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartXRef = useRef(0);

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < imgs.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchDifference = touchStartXRef.current - touchEndX;
        // If the difference is positive, the user swiped left, if negative, the user swiped right
        if (touchDifference > 50) {
            handleNextClick(); // Go to the next image
        } else if (touchDifference < -50) {
            handlePrevClick(); // Go to the previous image
        }
    };
    return (
        <div className="flex flex-col items-center">
            <div className="carousel relative">
                {imgs.map((item, index) => (
                    <div
                        id={index}
                        className="carousel-item relative w-full"
                        key={item}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}>
                        <img src={item} alt={`Product image ${index + 1}`} />
                        <div>
                            {imgs.length >= 2 && (
                                <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a
                                        onClick={handlePrevClick}
                                        disabled={index === 0}
                                        href={`#${index - 1}`}
                                        className="btn btn-circle bg-inherit border-yellow-500 hover:border-red-500 ">
                                        <ChevronLeft />
                                    </a>
                                    <a
                                        onClick={handleNextClick}
                                        href={`#${index + 1}`}
                                        disabled={index === imgs.length - 1}
                                        className="btn btn-circle bg-inherit border-yellow-500 hover:border-red-500 ">
                                        <ChevronRight />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                {imgs.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 md:h-3 md:w-3 rounded-full ${
                            currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
