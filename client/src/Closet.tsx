import { FiEdit } from "react-icons/fi";
import { CgAddR  } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";

export function Closet() {
  return (
    <>
    <div className="closet-container">
      <div className="row d-flex">
        <div className="column-full d-flex justify-end">
          <FiEdit size="20px"/>
          <CgAddR size="20px"/>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Layers</h3>
          <TiArrowSortedDown/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Tops</h3>
          <TiArrowSortedDown/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Bottoms</h3>
          <TiArrowSortedDown/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Dresses</h3>
          <TiArrowSortedDown/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Shoes</h3>
          <TiArrowSortedDown/>
        </div>
        <div className="column-half d-flex">
          <ul className="ulist">
          </ul>
        </div>
      </div>
      <div className="row category d-block">
        <div className="column-half d-flex align-center">
          <h3>Accessories</h3>
          <TiArrowSortedDown/>
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
