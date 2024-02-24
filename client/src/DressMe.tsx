import { useEffect, useState, ChangeEvent } from "react";
import { Carousel } from "./Carousel";
import { Outlet } from 'react-router-dom';

type Item = {
  itemId: number;
  image: string;
  category: string;
};
export function DressMe() {
const [layer, setLayer] = useState<Item[]>([]);
const [top, setTop] = useState<Item[]>([]);
const [bottom, setBottom] = useState<Item[]>([]);
const [dress, setDress] = useState<Item[]>([]);
const [shoes, setShoes] = useState<Item[]>([]);
const [accessory, setAccessory] = useState<Item[]>([]);
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

useEffect(() => {
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
        const categorizeItems = (category: string, items: Item[]) => {
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

function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
}

// function saveOutfit(event: FormEvent<HTMLFormElement>) {
//   e.preventDefault();
// }onClick={saveOutfit}

  return (
    <>
      <div className="dressMe-container">
        <form>
          <div className="row">
            <div className="column-full d-flex justify-center">
              <input
                type="checkbox"
                name="category"
                value="Layer"
                onChange={handleSelect}
              />
              <label htmlFor="layer">Layer</label>
              <input
                type="checkbox"
                name="category"
                value="Top"
                onChange={handleSelect}
              />
              <label htmlFor="top">Top</label>
              <input
                type="checkbox"
                name="category"
                value="Bottom"
                onChange={handleSelect}
              />
              <label htmlFor="bottom">Bottom</label>
              <input
                type="checkbox"
                name="category"
                value="Dress"
                onChange={handleSelect}
              />
              <label htmlFor="dress">Dress</label>
              <input
                type="checkbox"
                name="category"
                value="Shoes"
                onChange={handleSelect}
              />
              <label htmlFor="shoes">Shoes</label>
              <input
                type="checkbox"
                name="category"
                value="Accessory"
                onChange={handleSelect}
              />
              <label htmlFor="accessory">Accessory</label>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex justify-center padding">
              {(selectedCategories.length > 1) && (<button className="green-button">Save</button>)}
            </div>
          </div>
        </form>
          <div className="carousel-content">
            <div className="row">
              <div className="column-full d-flex align-center justify-center padding">
                {selectedCategories.includes('Layer') && (<Carousel category={layer}/>)}
                {selectedCategories.includes('Top') && (<Carousel category={top}/>)}
              </div>
            </div>
            <div className="row">
              <div className="column-full d-flex align-center justify-center padding">
                {selectedCategories.includes('Dress') && (<Carousel category={dress}/>)}
                {selectedCategories.includes('Bottom') && (<Carousel category={bottom}/>)}
              </div>
            </div>
            <div className="row">
              <div className="column-full d-flex align-center justify-center padding">
                {selectedCategories.includes('Shoes') && (<Carousel category={shoes}/>)}
                {selectedCategories.includes('Accessory') && (<Carousel category={accessory}/>)}
              </div>
            </div>
          </div>
      </div>
    <Outlet/>
    </>
  )
}
