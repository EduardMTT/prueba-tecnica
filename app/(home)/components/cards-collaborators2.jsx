const CardCollaborators2 = () => {
  const collaborators = [
    {
      name: 'Sofía Martínez',
      role: 'Chef Ejecutiva',
      image: 'https://i.pravatar.cc/150?img=11',
    },
    {
      name: 'Rodrigo Díaz',
      role: 'Cocinero',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    {
      name: 'Isabel Morales',
      role: 'Pastelera',
      image: 'https://i.pravatar.cc/150?img=13',
    },
    {
      name: 'Julián Herrera',
      role: 'Ayudante de Cocina',
      image: 'https://i.pravatar.cc/150?img=14',
    },
    {
      name: 'Lucía Ríos',
      role: 'Hostess',
      image: 'https://i.pravatar.cc/150?img=15',
    },
    {
      name: 'Esteban Ramírez',
      role: 'Mesero',
      image: 'https://i.pravatar.cc/150?img=16',
    },
    {
      name: 'Camila Peña',
      role: 'Capitana de Meseros',
      image: 'https://i.pravatar.cc/150?img=17',
    },
    {
      name: 'Raúl Ortega',
      role: 'Sommelier',
      image: 'https://i.pravatar.cc/150?img=18',
    },
    {
      name: 'Marta Castillo',
      role: 'Encargada de Buffet',
      image: 'https://i.pravatar.cc/150?img=19',
    },
    {
      name: 'Fernando López',
      role: 'Bartender',
      image: 'https://i.pravatar.cc/150?img=20',
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

export default CardCollaborators2;
