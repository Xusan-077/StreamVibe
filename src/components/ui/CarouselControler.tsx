import { icons } from "@/constants/icons";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { UseEmblaCarouselType } from "embla-carousel-react"; // Tip uchun

interface Props {
  emblaApi: UseEmblaCarouselType[1];
}

export default function CarouselControler({ emblaApi }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="max-[640px]:w-10 max-[640px]:h-10 cursor-pointer bg-[#1A1A1A] hover:bg-[#262626] active:scale-95 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200"
      >
        <Image
          src={icons.pre}
          alt="previous"
          width={24}
          height={24}
          className="max-[640px]:w-5 max-[640px]:h-5"
        />
      </button>

      <div className="flex items-center max-[640px]:gap-0 gap-1 max-[768px]:hidden">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1 cursor-pointer transition-all duration-300
              ${
                selectedIndex === index
                  ? "w-6 bg-[#E50000]"
                  : "w-4 bg-[#333333]"
              } 
              rounded-full ...`}
          />
        ))}
      </div>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="max-[640px]:w-10 max-[640px]:h-10 cursor-pointer bg-[#1A1A1A] hover:bg-[#262626] active:scale-95 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200"
      >
        <Image
          src={icons.next}
          alt="next"
          width={24}
          height={24}
          className="max-[640px]:w-5 max-[640px]:h-5"
        />
      </button>
    </>
  );
}
