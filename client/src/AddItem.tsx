import { FaArrowLeft } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';

export function AddItem() {
  return (
    <>
      <div className="add-container">
        <div className="row border-bottom align-center d-block">
          <div className="column-half">
            <Link to="/header"><FaArrowLeft size="20" className="padding-5 cursor link"/></Link>
          </div>
          <div className="column-half d-flex justify-center">
            <h3>Add Item</h3>
          </div>
        </div>
        <div className="add-item">
          <div className="row">
            <div className="column-full">
            <p>Take a photo of your item.</p>
            <p>We recommend capturing the item only in a flat-lay position, taken from directly above the item.</p>
            </div>
          </div>
          <div className="row">
            <div className="box">
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex">
              <p>Select Category</p>
              <p className="red">*</p>
            </div>
          </div>

        <form>
            <div className="row">
              <div className="column-full d-flex justify-center">
                <input type="radio" id="layer" name="category" value="Layer"/>
                <label for="">Layer</label>
                <input type="radio" id="top" name="category" value="Top"/>
                <label>Top</label>
                <input type="radio" id="bottom" name="category" value="Bottom"/>
                <label>Bottom</label>
                <input type="radio" id="dress" name="category" value="Dress"/>
                <label>Dress</label>
                <input type="radio" id="shoes" name="category" value="Shoes"/>
                <label>Shoes</label>
                <input type="radio" id="accessory" name="category" value="Accessory"/>
                <label>Accessory</label>
              </div>
            </div>
            <div className="row">
              <div className="column-full">
                <button className="green-button d-flex center margin-top">Add to Closet</button>
              </div>
            </div>
           </form>
          </div>
        </div>
        <Outlet/>
    </>
    )
}
