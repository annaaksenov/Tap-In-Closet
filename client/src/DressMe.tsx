import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export function DressMe() {

  return (
    <>
      <div className="dressMe-container">
        <div className="row d-flex">
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
          </div>
        </div>
      </div>
    </>
  )
}
