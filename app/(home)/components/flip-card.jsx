'use client';
import { useState } from 'react';
import { useSpring, a } from '@react-spring/web';
import Image from 'next/image';

export function Flip({ srcImage1, srcImage2, aspectRatio = '16/10' }) {
  const [flipped, set] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className="relative w-full min-w-[280px] min-h-[175px] mx-auto cursor-pointer"
      style={{ aspectRatio }}
      onClick={() => set((state) => !state)}
    >
      <a.div
        className="absolute inset-0 w-full h-full rounded-lg shadow-md overflow-hidden"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          backfaceVisibility: 'hidden',
        }}
      >
        <Image
          src={srcImage1 || '/placeholder.svg'}
          alt="Frontal"
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
          className="object-cover"
          priority
        />
      </a.div>

      <a.div
        className="absolute inset-0 w-full h-full rounded-lg shadow-md overflow-hidden"
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateX(180deg)`),
          backfaceVisibility: 'hidden',
        }}
      >
        <Image
          src={srcImage2 || '/placeholder.svg'}
          alt="Trasera"
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
          className="object-cover"
        />
      </a.div>
    </div>
  );
}
