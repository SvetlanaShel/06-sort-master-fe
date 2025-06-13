import React, { useEffect, useState } from "react";

interface Container {
  id: string;
  color: string;
  name: string;
  description: string;
}

const ContainerList = () => {
  const [containers, setContainers] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    fetch("/api/containers")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setContainers)
      .catch((err) => {
        setError(err.message);
      });  
    }, []);

    const handleDelete = async (id: string) => {
      try {
        const res = await fetch(`/api/containers/${id}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error("Ошибка при удалении контейнера");
        } 

        setContainers((prev) => prev.filter((c) => c.id !== id));
        setMessage(null);
      } catch (err: any) {
        setMessage (err.message || "Не удалось удалить контейнер");
      } 
    }; 

  if (error) {
    return <div className="text-red-500">Error loading containers.</div>;
} 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>

      {message && <div className="text-red-600 mb-4">{message}</div>}

      <ul className="space-y-4">
        {containers.map((container: Container) => (
          <li
            key={container.id}
            className="relative p-4 rounded-lg shadow-md text-white"
            style={{ backgroundColor: container.color }}
          >
            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>

            <button
              onClick={() => handleDelete(container.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
              >
                Remove 
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainerList;


