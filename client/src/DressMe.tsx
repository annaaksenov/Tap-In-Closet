import { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
// Should hold an object at a time or nothing at all.
const [currentTop, setCurrentTop] = useState<Item | undefined>();
const [currentBottom, setCurrentBottom] = useState<Item | undefined>();
const [currentLayer, setCurrentLayer] = useState<Item | undefined>();
const [currentDress, setCurrentDress] = useState<Item | undefined>();
const [currentShoes, setCurrentShoes] = useState<Item | undefined>();
const [currentAccessory, setCurrentAccessory] = useState<Item | undefined>();

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
    const { value, checked } = e.target;

// const { value } = e.target;
  // switch (value) {
  //           case 'Layer':
  //             setCurrentLayer(currentLayer);
  //             console.log('currentLayer', currentLayer);
  //             break;
  //           case 'Top':
  //             setCurrentTop(currentTop);
  //             console.log('currentTop', currentTop);
  //             break;
  //           case 'Bottom':
  //             setCurrentBottom(currentBottom);
  //             console.log('currentBottom', currentBottom);
  //             break;
  //           case 'Dress':
  //             setCurrentDress(currentDress);
  //             console.log('currentDress', currentDress);
  //             break;
  //           case 'Shoes':
  //             setCurrentShoes(currentShoes);
  //             console.log('currentShoes', currentShoes);
  //             break;
  //           case 'Accessory':
  //             setCurrentAccessory(currentAccessory);
  //             console.log('currentAccessory', currentAccessory);
  //             break;
  //           default:
  //             break;
  //         }

    // setSelectedCategories((prev) =>
    //   prev.includes(value)
    //     ? prev.filter((category) => category !== value)
    //     : [...prev, value]
    // );
    setSelectedCategories((prev) => checked ? [...prev, value] : prev.filter((category) => category !== value));
      if (!checked) {
    switch (value) {
      case 'Layer':
        setCurrentLayer(undefined);
        break;
      case 'Top':
        setCurrentTop(undefined);
        break;
      case 'Bottom':
        setCurrentBottom(undefined);
        break;
      case 'Dress':
        setCurrentDress(undefined);
        break;
      case 'Shoes':
        setCurrentShoes(undefined);
        break;
        case 'Accessory':
          setCurrentAccessory(undefined);
          break;
      default:
        break;
    }
  }
}

console.log('currentBottom', currentBottom);
 console.log('currentTop:', currentTop);
 console.log('currentLayer:', currentLayer);
 console.log('currDress:', currentDress);
 console.log('currShoes:', currentShoes);

function handleSaveOutfit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

  return (
    <>
      <div className="dressMe-container">
        <form>
          <div className="row">
            <div className="column-full d-flex justify-center">
              {layer.length > 0 && (<input
                type="checkbox"
                name="category"
                value="Layer"
                onChange={handleSelect}
              />)}
              <label className="select-pad" htmlFor="layer">Layer</label>
             {top.length > 0 && (<input
                type="checkbox"
                name="category"
                value="Top"
                onChange={handleSelect}
              />)}
              <label className="select-pad" htmlFor="top">Top</label>
              {bottom.length > 0 && (<input
                type="checkbox"
                name="category"
                value="Bottom"
                onChange={handleSelect}
              />)}
              <label className="select-pad" htmlFor="bottom">Bottom</label>
             {dress.length > 0 && ( <input
                type="checkbox"
                name="category"
                value="Dress"
                onChange={handleSelect}
              />)}
              <label className="select-pad" htmlFor="dress">Dress</label>
              {shoes.length > 0 && (<input
                type="checkbox"
                name="category"
                value="Shoes"
                onChange={handleSelect}
              />)}
              <label className="select-pad" htmlFor="shoes">Shoes</label>
              {accessory.length > 0 && (<input
                type="checkbox"
                name="category"
                value="Accessory"
                onChange={handleSelect}
              />)}
              <label className="select-pad" htmlFor="accessory">Accessory</label>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex justify-center margin-top">
              {(selectedCategories.length > 1) && (<button disabled onSubmit={handleSaveOutfit} className="green-button">Save</button>)}
            </div>
          </div>
        </form>
          <div className="carousel-content">
            <div className="row">
              <div className="column-full d-flex align-center justify-center padding">
                {selectedCategories.includes('Layer') && (<Carousel category={layer} handleIndex={(index) => {setCurrentLayer(layer[index])}}/>)}
                {selectedCategories.includes('Top') && (<Carousel category={top} handleIndex={(index) => {setCurrentTop(top[index])}}/>)}
              </div>
            </div>
            <div className="row">
              <div className="column-full d-flex align-center justify-center padding">
                {selectedCategories.includes('Dress') && (<Carousel category={dress} handleIndex={(index) => {setCurrentDress(dress[index])}}/>)}
                {selectedCategories.includes('Bottom') && (<Carousel category={bottom} handleIndex={(index) => {setCurrentBottom(bottom[index])}}/>)}
              </div>
            </div>
            <div className="row">
              <div className="column-full d-flex align-center justify-center padding">
                {selectedCategories.includes('Shoes') && (<Carousel category={shoes} handleIndex={(index) => {setCurrentShoes(shoes[index])}}/>)}
                {selectedCategories.includes('Accessory') && (<Carousel category={accessory} handleIndex={(index) => {setCurrentAccessory(accessory[index])}}/>)}
              </div>
            </div>
          </div>
      </div>
    <Outlet/>
    </>
  )
}
