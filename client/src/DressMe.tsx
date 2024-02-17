import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";

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
      console.log('data:', data);
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
      }
    })
    .catch((err) => {
      console.log(err);
  })
}, []);

function handleSelect(e) {
    const { value } = e.target;
    // Toggle selected category
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  }

  return (
    <>
<div className="dressMe-container">
        <form onSelect={handleSelect}>
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
        </form>

        <div>
          {selectedCategories.includes('Layer') &&
            layer.map((item) => (
              <img key={item.itemId} src={item.image} alt={item.category} />
            ))}
          {selectedCategories.includes('Top') &&
            top.map((item) => (
              <img key={item.itemId} src={item.image} alt={item.category} />
            ))}
          {selectedCategories.includes('Bottom') &&
            bottom.map((item) => (
              <img key={item.itemId} src={item.image} alt={item.category} />
            ))}
          {selectedCategories.includes('Dress') &&
            dress.map((item) => (
              <img key={item.itemId} src={item.image} alt={item.category} />
            ))}
          {selectedCategories.includes('Shoes') &&
            shoes.map((item) => (
              <img key={item.itemId} src={item.image} alt={item.category} />
            ))}
          {selectedCategories.includes('Accessory') &&
            accessory.map((item) => (
              <img key={item.itemId} src={item.image} alt={item.category} />
            ))}
        </div>
      </div>
    </>
  )
}
      /* <div className="dressMe-container">
          <form onSelect={handleSelect}>
             <div className="row">
              <div className="column-full d-flex justify-center">
                <input type="checkbox" name="category" value="Layer"/>
                <label htmlFor="layer">Layer</label>
                <input type="checkbox" name="category" value="Top"/>
                <label htmlFor="top">Top</label>
                <input type="checkbox" name="category" value="Bottom"/>
                <label htmlFor="bottom">Bottom</label>
                <input type="checkbox" name="category" value="Dress"/>
                <label htmlFor="dress">Dress</label>
                <input type="checkbox" name="category" value="Shoes"/>
                <label htmlFor="shoes">Shoes</label>
                <input type="checkbox" name="category" value="Accessory"/>
                <label htmlFor="accessory">Accessory</label>
              </div>
            </div>
          </form>
        </div> */

        /* { <div className="row d-flex">
          <Carousel />
          <div className="column-full">
            <button className="green-button d-flex center padding">Save</button>
          </div>
        </div>
        <div className="row card ">
          <div className="column-half align-center d-flex padding">
            <FaChevronLeft cursor="pointer"/>
            <img src="images/placeholder-image-square.jpg" className="cat-img"/>
            <FaChevronRight cursor="pointer"/>
          </div>
          <div className="column-half align-center d-flex  padding">
            <FaChevronLeft cursor="pointer"/>
            <img src="images/placeholder-image-square.jpg" className="cat-img"/>
            <FaChevronRight cursor="pointer"/>
          </div>
        </div>

        <div className="row card">
          <div className="column-half align-center d-flex  padding">
            <FaChevronLeft cursor="pointer"/>
            <img src="images/placeholder-image-square.jpg" className="cat-img"/>
            <FaChevronRight cursor="pointer"/>
          </div>
          <div className="column-half align-center d-flex  padding">
            <FaChevronLeft cursor="pointer"/>
            <img src="images/placeholder-image-square.jpg" className="cat-img"/>
            <FaChevronRight cursor="pointer"/>
          </div>
        </div>

        <div className="row card">
          <div className="column-half align-center d-flex  padding">
            <FaChevronLeft cursor="pointer"/>
            <img src="images/placeholder-image-square.jpg" className="cat-img"/>
            <FaChevronRight cursor="pointer"/>
          </div>
          <div className="column-half align-center d-flex  padding">
            <FaChevronLeft cursor="pointer"/>
            <img src="images/placeholder-image-square.jpg" className="cat-img"/>
            <FaChevronRight cursor="pointer"/>
          </div}>
          </div>*/
