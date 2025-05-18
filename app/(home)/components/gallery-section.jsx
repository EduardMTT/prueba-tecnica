import { Flip } from './flip-card';

export function GallerySection() {
  const srcArray = [
    ['/images/Image1.jpg', '/images/Image2.jpg'],
    ['/images/Image3.jpg', '/images/Image4.jpg'],
    ['/images/Image5.jpg', '/images/Image6.jpg'],
    ['/images/Image7.jpg', '/images/Image8.jpg'],
  ];

  return (
    <>
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nuestras Instalaciones
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-sm md:text-base">
            Explora y siente el confort de nuestras instalaciones.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {srcArray.map(([src1, src2], index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-[350px]">
                <Flip srcImage1={src1} srcImage2={src2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
