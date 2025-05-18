'use client';
import React, { useRef, useEffect, useState } from 'react';
import CardCollaborators1 from './cards-collaborators1';
import CardCollaborators2 from './cards-collaborators2';
import CardCollaborators3 from './cards-collaborators3';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const gradientColors = {
  blue: 'title',
};

const Page = ({ offset, gradient, onClick, children }) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className="h-full w-full bg-gradient-to-l from-blue-900 to-blue-950 transform -skew-y-6 md:-skew-y-6" />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div
        className={`h-full w-full transform skew-y-6 md:skew-y-6 ${gradientColors[gradient]}`}
      />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.3}>
      <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"></div>
    </ParallaxLayer>

    {children && (
      <ParallaxLayer offset={offset} speed={0.4}>
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32">{children}</div>
      </ParallaxLayer>
    )}
  </>
);

export default function ParallaxCollaborators() {
  const parallax = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isVertical, setIsVertical] = useState(false);
  useEffect(() => {
    const checkOrientation = () => {
      setIsVertical(window.innerWidth < 768);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  const scroll = (to) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
      setCurrentPage(to);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prev = Math.max(0, currentPage - 1);
    scroll(prev);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const next = Math.min(2, currentPage + 1);
    scroll(next);
  };

  return (
    <div className="bg-white h-[100svh] w-full shadow-2xl relative overflow-hidden">
      <Parallax
        ref={parallax}
        pages={3}
        horizontal={!isVertical}
        className="h-full w-full"
      >
        <Page offset={0} gradient="blue" onClick={() => scroll(1)}>
          <CardCollaborators1 />
        </Page>

        <Page offset={1} gradient="blue" onClick={() => scroll(2)}>
          <CardCollaborators2 />
        </Page>

        <Page offset={2} gradient="blue" onClick={() => scroll(0)}>
          <CardCollaborators3 />
        </Page>
      </Parallax>
      <div
        className={`absolute ${
          isVertical
            ? 'bottom-4 left-0 right-0 flex justify-center space-x-4'
            : 'top-1/2 -translate-y-1/2 w-full flex justify-between px-4'
        }`}
      >
        <button
          onClick={handlePrev}
          className="bg-white/20 hover:bg-white/30 text-black rounded-full p-2 backdrop-blur-sm transition-all"
          aria-label="Anterior"
        >
          {isVertical ? <ChevronLeft size={24} /> : <ChevronLeft size={28} />}
        </button>

        <button
          onClick={handleNext}
          className="bg-white/20 hover:bg-white/30  text-black rounded-full p-2 backdrop-blur-sm transition-all"
          aria-label="Siguiente"
        >
          {isVertical ? <ChevronRight size={24} /> : <ChevronRight size={28} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {[0, 1, 2].map((page) => (
          <button
            key={page}
            onClick={() => scroll(page)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentPage === page
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a página ${page + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
