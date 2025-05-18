import ParallaxCollaborators from './parallax-collaborators';
import CardCollaborators1 from './cards-collaborators1';

export function CollaboratorsSection() {
  return (
    <>
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Conoce a nuestros colaboradores
          </h2>
        </div>
      </section>

      <div className="block lg:hidden">
        <CardCollaborators1 />
      </div>

      <div className="hidden lg:block">
        <ParallaxCollaborators />
      </div>
    </>
  );
}
