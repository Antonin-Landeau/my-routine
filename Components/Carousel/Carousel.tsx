import React, { Children, FC, ReactNode, useRef, useState } from "react";

interface CarouselProps {
  children: ReactNode;
  index: number;
  nextIndex: () => void;
  prevIndex: () => void;
  buttons?: boolean;
}

export const useCarousel = () => {
  const [index, setIndex] = useState<number>(0);

  const nextIndex = () => {
    setIndex((prev) => prev + 1);
  };

  const prevIndex = () => {
    setIndex((prev) => prev - 1);
  };

  return { index, nextIndex, prevIndex };
};

const Carousel: FC<CarouselProps> = ({
  children,
  index,
  nextIndex,
  prevIndex,
  buttons,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="overflow-hidden">
        <div
          ref={itemRef}
          className={`w-full flex transition duration-700 ease bg-transparent`}
          style={{
            transform: `translateX(${
              itemRef.current && -index * itemRef.current.offsetWidth
            }px)`,
          }}
        >
          {children}
        </div>
      </div>
      {buttons && (
        <>
          <button onClick={() => nextIndex()}>Next</button>
          <button onClick={() => prevIndex()}>Prev</button>
        </>
      )}
    </>
  );
};

export { Carousel };
