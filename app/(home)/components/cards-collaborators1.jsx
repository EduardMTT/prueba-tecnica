const CardCollaborators1 = () => {
  const collaborators = [
    {
      name: 'Laura Gómez',
      role: 'Recepcionista',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Carlos Medina',
      role: 'Gerente General',
      image: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'María Torres',
      role: 'Asistente Administrativa',
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      name: 'Jorge Ramos',
      role: 'Conserje',
      image: 'https://i.pravatar.cc/150?img=4',
    },
    {
      name: 'Patricia Herrera',
      role: 'Supervisora de Recepción',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    {
      name: 'Andrés Vargas',
      role: 'Botones',
      image: 'https://i.pravatar.cc/150?img=6',
    },
    {
      name: 'Verónica Ruiz',
      role: 'Recepcionista',
      image: 'https://i.pravatar.cc/150?img=7',
    },
    {
      name: 'Luis Navarro',
      role: 'Gerente Nocturno',
      image: 'https://i.pravatar.cc/150?img=8',
    },
    {
      name: 'Carmen Silva',
      role: 'Encargada de Reservas',
      image: 'https://i.pravatar.cc/150?img=9',
    },
    {
      name: 'Hugo Pérez',
      role: 'Coordinador de Eventos',
      image: 'https://i.pravatar.cc/150?img=10',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {collaborators.map((collab, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden mb-3 sm:mb-4 border-2 border-gray-100">
              <img
                src={collab.image || '/placeholder.svg'}
                alt={collab.name}
                sizes="(max-width: 640px) 5rem, 6rem"
                className="object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">
              {collab.name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {collab.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCollaborators1;
