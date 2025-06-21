import React,  { useEffect, useState } from 'react';
import type { Item } from '../common/types/Items';
import ItemCard from "./ItemCard";


const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setItems)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="text-red-500">Error loading items: {error}</div>;
}
  
  return ( 
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rubbish Items</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item: Item) => (
             <ItemCard key={item.id} item={item} />
            ))}
      </div>
    </div>
  );
};
export default ItemList;