import { FormEvent} from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';

export function AddItem() {
  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const session = sessionStorage.getItem('token');
      if (!session) {
        throw new Error('Token not found');
      }
      const req = {
        method: 'POST',
        headers: {'authorization': `Bearer ${session}`},
        body: formData,
      };
      const res = await fetch('/api/upload/closet', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const {image, category} = await res.json();
      console.log('image', image, 'category', category);
  } catch (err) {
    alert(`Error adding item ${err}`)
  } finally {
    navigate('/header');
  }
}

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
            <img className="box d-block"/>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column-full">
              <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif"/>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex">
              <p>Select Category</p>
              <p className="red">*</p>
            </div>
          </div>
            <div className="row">
              <div className="column-full d-flex justify-center">
                <input type="radio" name="category" value="Layer"/>
                <label htmlFor="layer">Layer</label>
                <input type="radio" name="category" value="Top"/>
                <label htmlFor="top">Top</label>
                <input type="radio" name="category" value="Bottom"/>
                <label htmlFor="bottom">Bottom</label>
                <input type="radio" name="category" value="Dress"/>
                <label htmlFor="dress">Dress</label>
                <input type="radio" name="category" value="Shoes"/>
                <label htmlFor="shoes">Shoes</label>
                <input type="radio" name="category" value="Accessory"/>
                <label htmlFor="accessory">Accessory</label>
              </div>
            </div>
            <div className="row">
              <div className="column-full">
                <button type="submit" className="green-button d-flex center margin-top">Add to Closet</button>
              </div>
            </div>
           </form>
          </div>
        </div>
        <Outlet/>
    </>
    )
}
