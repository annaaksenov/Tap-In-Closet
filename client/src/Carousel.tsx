import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react"

type Item = {
  itemId: number;
  image: string;
  category: string;
};

  export function Carousel({category, handleIndex}: {category?: Item[]; handleIndex: (index: number) => void }) {
  const [count, setCount] = useState(0);

  if (!category || category.length === 0) {
    return undefined;
  }
  // console.log('carousel category:', category);
   let imgCount: number = category.length;
    function prev() {
    if (imgCount > 0) {
      setCount((count) => (count > 0 ? count - 1 : imgCount - 1));
    }
  }

  function next() {
    if (imgCount > 0) {
      setCount((count) => (count < imgCount - 1 ? count + 1 : 0));
    }
  }
  handleIndex(count);
  return (
    <>
      {category.length > 1 && <FaChevronLeft size="20px" cursor="pointer" onClick={prev} />}
      {<img src={category[count].image} alt={category[count].category} className="item-img"/> }
      {category.length > 1 && <FaChevronRight size="20px" cursor="pointer" onClick={next} />}
    </>
  )
  }
