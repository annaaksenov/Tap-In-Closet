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

/*{useEffect(() => {
    const session = sessionStorage.getItem('token');
    const req = {
      method: 'GET',
      headers: {'authorization': `Bearer ${session}`},
    }
    fetch('/api/closet', req)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('data', data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].category === 'Layer') {
          setLayer([...layer, data[i]]);
        } else if (data[i].category === 'Top') {
          setTop([...top, data[i]]);
        } else if (data[i].category === 'Bottom') {
          setBottom([...bottom, data[i]]);
        } else if (data[i].category === 'Dress') {
          setDress([...dress, data[i]]);
        } else if (data[i].category === 'Shoes') {
          setShoes([...shoes, data[i]]);
        } else if (data[i].category === 'Accessory') {
          setAccessory([...accessory, data[i]]);
        }
      }})
    .catch((err) => {
      console.log(err);
  })
}, []);}*/
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
