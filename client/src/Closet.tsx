import { FiEdit } from "react-icons/fi";
import { CgAddR  } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, Outlet } from 'react-router-dom';
/*{import { useEffect, useState } from "react";
import { readCloset } from "./data";
import { TiArrowSortedUp } from "react-icons/ti";

export type UnsavedItem = {
  image: string;
  category: string;
};
export type Item = UnsavedItem & {
  itemId: number;
};
type Props = {
  onCreate: () => void;
  onEdit: (item: Item) => void;
};}*/

export function Closet() {
/*{parameter ({ onCreate, onEdit }: Props)
const [isLoading, setIsLoading] = useState<boolean>();
const [layer, setLayer] = useState<Item[]>();
const [top, setTop] = useState<Item[]>();
const [bottom, setBottom] = useState<Item[]>();
const [dress, setDress] = useState<Item[]>();
const [shoe, setShoe] = useState<Item[]>();
const [accessory, setAccessory] = useState<Item[]>();
const [error, setError] = useState<unknown>();

useEffect(() => {
  async function load() {
    setIsLoading(true);
    try {
      const items = await readCloset();
      setLayer(items);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading === undefined) load();
}, [isLoading]);

if (isLoading) return <div>Loading...</div>;
if (error)
  return (
    <div>
      Error loading items:
      {error instanceof Error ? error.message : 'Unknown Error'}
    </div>
  );
if (!layer || !top || !bottom || !dress || !shoe || !accessory) return null;}*/

  return (
    <>
    <div className="closet-container">
      <div className="row d-flex">
        <div className="column-full d-flex justify-end">
          <FiEdit size="22px" className="padding-5"/>
          <Link to="/add-item"><CgAddR size="22px" className="padding-5 link"/></Link>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Layers</h3>
          <TiArrowSortedDown className="cursor"/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Tops</h3>
          <TiArrowSortedDown className="cursor"/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Bottoms</h3>
          <TiArrowSortedDown className="cursor"/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Dresses</h3>
          <TiArrowSortedDown className="cursor"/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Shoes</h3>
          <TiArrowSortedDown className="cursor"/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Accessories</h3>
          <TiArrowSortedDown className="cursor"/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
