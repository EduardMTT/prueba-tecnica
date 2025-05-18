const CardCollaborators3 = () => {
  const collaborators = [
    {
      name: 'Alejandra Cruz',
      role: 'Camarista',
      image: 'https://i.pravatar.cc/150?img=21',
    },
    {
      name: 'Diego Núñez',
      role: 'Jefe de Mantenimiento',
      image: 'https://i.pravatar.cc/150?img=22',
    },
    {
      name: 'Paola Jiménez',
      role: 'Supervisora de Piso',
      image: 'https://i.pravatar.cc/150?img=23',
    },
    {
      name: 'Ricardo Molina',
      role: 'Electricista',
      image: 'https://i.pravatar.cc/150?img=24',
    },
    {
      name: 'Daniela Paredes',
      role: 'Plomera',
      image: 'https://i.pravatar.cc/150?img=25',
    },
    {
      name: 'Antonio Castro',
      role: 'Jardinero',
      image: 'https://i.pravatar.cc/150?img=26',
    },
    {
      name: 'Luisa Salazar',
      role: 'Lavandería',
      image: 'https://i.pravatar.cc/150?img=27',
    },
    {
      name: 'Gustavo Reyes',
      role: 'Mantenimiento General',
      image: 'https://i.pravatar.cc/150?img=28',
    },
    {
      name: 'Sandra Lozano',
      role: 'Encargada de Limpieza',
      image: 'https://i.pravatar.cc/150?img=29',
    },
    {
      name: 'Javier Méndez',
      role: 'Técnico de Aire Acondicionado',
      image: 'https://i.pravatar.cc/150?img=30',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {collaborators.map((collab, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 w-72 text-center hover:scale-105 transition-transform duration-300"
        >
          <img
            src={collab.image}
            alt={collab.name}
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">{collab.name}</h3>
          <p className="text-gray-600">{collab.role}</p>
        </div>
      ))}
    </div>
  );
};

export default CardCollaborators3;
