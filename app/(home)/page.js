export default function LandingPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-8 z-20">
        <FrontPage />
      </main>
    </>
  );
}

function FrontPage() {
  return (
    <>
      <div className="bg-[url(/images/Portada.jpg)] bg-cover bg-center w-full min-h-[600px] flex flex-col sm:flex-row sm:h-[2px] justify-between shadow-lg shadow-black/50">
        <div className="text-white px-6 py-10 sm:px-10 lg:px-20 w-full sm:w-1/2 text-3xl sm:text-5xl md:text-6xl lg:text-[85px] italic bg-zinc-500/20 backdrop-brightness-50 flex items-center">
          Tu descanso comienza aqui
        </div>
      </div>
    </>
  );
}
