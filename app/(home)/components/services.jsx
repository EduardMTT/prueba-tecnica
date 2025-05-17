'use client';

import { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import shuffle from 'lodash.shuffle';

function List() {
  const data = [
    {
      id: 1,
      title: 'Spa',
      description: 'Relájate con nuestros tratamientos de spa.',
    },
    {
      id: 2,
      title: 'Gimnasio',
      description: 'Instalaciones para ejercitarte.',
    },
    {
      id: 3,
      title: 'Piscina',
      description: 'Piscina al aire libre con vista panorámica.',
    },
  ];

  const [rows, setRows] = useState(data);

  const itemHeight = 100;

  useEffect(() => {
    const t = setInterval(() => setRows(shuffle), 3000);
    return () => clearInterval(t);
  }, []);

  const transitions = useTransition(
    rows.map((item, index) => ({
      ...item,
      y: index * itemHeight,
    })),
    {
      key: (item) => item.id,
      from: { opacity: 0, height: 0 },
      leave: { opacity: 0, height: 0 },
      enter: (item) => ({ opacity: 1, height: itemHeight, y: item.y }),
      update: (item) => ({ y: item.y }),
      config: { tension: 210, friction: 20 },
    }
  );

  return (
    <div className="relative" style={{ height: rows.length * itemHeight }}>
      {transitions((style, item) => (
        <animated.div
          key={item.id}
          className="absolute w-full bg-white rounded-lg shadow-md p-4"
          style={{
            ...style,
            transform: style.y.to((y) => `translateY(${y}px)`),
          }}
        >
          <div className="text-xl font-semibold">{item.title}</div>
          <p className="text-gray-600">{item.description}</p>
        </animated.div>
      ))}
    </div>
  );
}

export default function ListServices() {
  return <List />;
}
