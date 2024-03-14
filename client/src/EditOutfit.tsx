import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Carousel } from './Carousel';
type Item = {
  itemId: number;
  image: string;
  category: string;
};
export function EditOutfit() {
const { outfitId } = useParams();
const navigate = useNavigate();
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

const [outfit, setOutfit] = useState<Item[]>([]);
console.log('outfit state', outfit);
const [closet, setCloset] = useState<Item[]>([]);
console.log('closet state', closet);

    useEffect(() => {
    const session = sessionStorage.getItem('token');
    const req = {
      method: 'GET',
      headers: {'authorization': `Bearer ${session}`},
    }
    fetch(`/api/outfitItems/${outfitId}`, req)
    .then((res) => { return res.json() })
    .then((data) => {
      console.log('data.items', data.items);
      setOutfit(data.items);
      const uniqueCategories = new Set<string>();
      for (let i = 0; i < data.items.length; i++) {
        const category = data.items[i].category;
        uniqueCategories.add(category);
        switch (category) {
          case 'Layer':
            setLayer(data.items.filter((item: any) => item.category === 'Layer'));
            break;
          case 'Top':
            setTop(data.items.filter((item: any) => item.category === 'Top'));
            break;
          case 'Bottom':
            setBottom(data.items.filter((item: any) => item.category === 'Bottom'));
            break;
          case 'Dress':
            setDress(data.items.filter((item: any) => item.category === 'Dress'));
            break;
          case 'Shoes':
            setShoes(data.items.filter((item: any) => item.category === 'Shoes'));
            break;
          case 'Accessory':
            setAccessory(data.items.filter((item: any) => item.category === 'Accessory'));
            break;
          default:
            break;
        }
      }
      setSelectedCategories(Array.from(uniqueCategories));
    })

    fetch('/api/closet', req)
    .then((res) => {
      return res.json();
     })
    .then((data) => {
      console.log('data closet', data);
      setCloset(data);
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



function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
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

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  try {
        let toSave: Item[] = [];
    if (currentLayer !== undefined) {
      toSave.push(currentLayer);
    }
    if (currentTop !== undefined) {
      toSave.push(currentTop);
    }
    if (currentBottom !== undefined) {
      toSave.push(currentBottom);
    }
    if (currentDress !== undefined) {
      toSave.push(currentDress);
    }
    if (currentShoes !== undefined) {
      toSave.push(currentShoes);
    }
    if (currentAccessory !== undefined) {
      toSave.push(currentAccessory);
    }

    const session = sessionStorage.getItem('token');
      if (!session) {
        throw new Error('Token not found');
      }
      const req = {
        method: '',
        headers: {'Content-Type': 'application/json', 'authorization': `Bearer ${session}`},
        body: JSON.stringify(toSave),
      };
      const res = await fetch('/api/build/outfits', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const {itemId, image, category} = await res.json();
      if (!itemId || !image || !category) {
        throw new Error(`fetch Error ${res.status}`)
      }
      console.log('itemId:', itemId, 'image:', image, 'category:', category);
  } catch (err) {
    console.error(`Error adding items ${err}`);
    alert('Error building outfit. Please try again.');
  } finally {
    navigate('/header/outfits');
  }
};
  return (
    <>
      <div className="edit-container">
        <div className="row border-bottom align-center d-block">
          <div className="column-half">
            <Link to="/header/outfits"><FaArrowLeft size="20" className="padding-5 cursor link" /></Link>
          </div>
          <div className="column-half d-flex justify-center">
            <h3>Edit Outfit</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="column-full d-flex justify-center">
          {layer.length > 0 && (<input
            type="checkbox"
            name="category"
            value="Layer"
            checked={selectedCategories.includes('Layer')}
            onChange={handleSelect}
          />)}
          <label className="select-pad" htmlFor="layer">Layer</label>
         {top.length > 0 && (<input
            type="checkbox"
            name="category"
            value="Top"
            checked={selectedCategories.includes('Top')}
            onChange={handleSelect}
          />)}
          <label className="select-pad" htmlFor="top">Top</label>
          {bottom.length > 0 && (<input
            type="checkbox"
            name="category"
            value="Bottom"
            checked={selectedCategories.includes('Bottom')}
            onChange={handleSelect}
          />)}
          <label className="select-pad" htmlFor="bottom">Bottom</label>
         {dress.length > 0 && ( <input
            type="checkbox"
            name="category"
            value="Dress"
            checked={selectedCategories.includes('Dress')}
            onChange={handleSelect}
          />)}
          <label className="select-pad" htmlFor="dress">Dress</label>
          {shoes.length > 0 && (<input
            type="checkbox"
            name="category"
            value="Shoes"
            checked={selectedCategories.includes('Shoes')}
            onChange={handleSelect}
          />)}
          <label className="select-pad" htmlFor="shoes">Shoes</label>
          {accessory.length > 0 && (<input
            type="checkbox"
            name="category"
            value="Accessory"
            checked={selectedCategories.includes('Accessory')}
            onChange={handleSelect}
          />)}
          <label className="select-pad" htmlFor="accessory">Accessory</label>
        </div>
      </div>
      <div className="row">
        <div className="column-full d-flex justify-center margin-top">
          {(selectedCategories.length > 1) && (<button type="submit" className="green-button">Save</button>)}
        </div>
      </div>
    </form>
        <div className="edit-items carousel-content">
          <div className="row">
            <div className="column-full d-flex align-center justify-center padding">
              {selectedCategories.includes('Layer') && (<Carousel category={layer} handleIndex={(index: number) => { setCurrentLayer(layer[index]); } } />)}
              {selectedCategories.includes('Top') && (<Carousel category={top} handleIndex={(index: number) => { setCurrentTop(top[index]); } }  />)}
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex align-center justify-center padding">
              {selectedCategories.includes('Dress') && (<Carousel category={dress} handleIndex={(index: number) => { setCurrentDress(dress[index]); } } />)}
              {selectedCategories.includes('Bottom') && (<Carousel category={bottom} handleIndex={(index: number) => { setCurrentBottom(bottom[index]); } } />)}
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex align-center justify-center padding">
              {selectedCategories.includes('Shoes') && (<Carousel category={shoes} handleIndex={(index: number) => { setCurrentShoes(shoes[index]); } } />)}
              {selectedCategories.includes('Accessory') && (<Carousel category={accessory} handleIndex={(index: number) => { setCurrentAccessory(accessory[index]); } } />)}
            </div>
          </div>
        </div>
      </div>
    <Outlet />
    </>
  )
}
