import { FaTrashAlt } from "react-icons/fa";
import { CgAddR  } from "react-icons/cg";
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Items } from './Items';

type Item = {
  itemId: number;
  image: string;
  category: string;
};
export function Closet() {
const [layer, setLayer] = useState<Item[]>([]);
const [top, setTop] = useState<Item[]>([]);
const [bottom, setBottom] = useState<Item[]>([]);
const [dress, setDress] = useState<Item[]>([]);
const [shoes, setShoes] = useState<Item[]>([]);
const [accessory, setAccessory] = useState<Item[]>([]);

 useEffect(() => {
    const session = sessionStorage.getItem('token');
    const req = {
      method: 'GET',
      headers: { 'authorization': `Bearer ${session}` },
    };

    fetch('/api/closet', req)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        const categorizeItems = (category: string, []) => {
          const categorizedItems = data.filter((item: Item) => item.category === category);
          switch (category) {
            case 'Layer':
              setLayer(categorizedItems);
              break;
            case 'Top':
              setTop(categorizedItems);
              break;
            case 'Bottom':
              setBottom(categorizedItems);
              break;
            case 'Dress':
              setDress(categorizedItems);
              break;
            case 'Shoes':
              setShoes(categorizedItems);
              break;
            case 'Accessory':
              setAccessory(categorizedItems);
              break;
            default:
              break;
          }
        };
        categorizeItems('Layer', layer);
        categorizeItems('Top', top);
        categorizeItems('Bottom', bottom);
        categorizeItems('Dress', dress);
        categorizeItems('Shoes', shoes);
        categorizeItems('Accessory', accessory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//   async function handleDeleteOutfit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, outfitId: string) {
// e.preventDefault();
// try {
// const session = sessionStorage.getItem('token');
//     const req = {
//       method: 'DELETE',
//       headers: {'authorization': `Bearer ${session}`},
//     };
//     const response = await fetch(`/api/delete/${outfitId}`, req);
//     if (response.status === 204) {
//         // Delete was successful, remove the outfit from state
//         setSavedOutfit(savedOutfit.filter(outfit => outfit.outfitId !== Number(outfitId)));
//     } else {
//         console.log('Failed to delete outfit');
//     }
//   } catch(err) {
//     console.error(err);
//   }
// };

  return (
    <>
    <div className="closet-container">
      <div className="row d-flex">
        <div className="column-full d-flex justify-end">
          <FaTrashAlt size="22px" className="padding-5"/>
          <Link to="/add-item"><CgAddR size="22px" className="padding-5 link"/></Link>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Layers</h3>
        </div>
        <div className="cat-row">
            <Items category={layer}/>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Tops</h3>
        </div>
        <div className="cat-row">
          <Items category={top}/>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Bottoms</h3>
        </div>
        <div className="cat-row">
          <Items category={bottom}/>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Dresses</h3>
        </div>
        <div className="cat-row">
          <Items category={dress}/>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Shoes</h3>
        </div>
        <div className="cat-row">
          <Items category={shoes}/>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Accessories</h3>
        </div>
        <div className="cat-row">
          <Items category={accessory}/>
        </div>
      </div>
    </div>
    <Outlet />
    </>
  )
}
