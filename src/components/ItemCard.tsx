import type { Item } from "../common/types/Items";
import CreateItemForm from "./CreateItemForm";


interface Props {
    item: Item;
  }
  export default function ItemCard({ item }: Props) {
    return (
        <li
        className="p-4 rounded-lg shadow-md text-white text-black border"
      >
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-700">{item.description}</p>
        <p className="text-sm text-gray-500">Container ID: {item.containerId}</p>
        <CreateItemForm itemId={item.id}/>
      </li>
    );
  }
   