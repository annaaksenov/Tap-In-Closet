import {FaRegUserCircle} from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <div className="header-container">
        <div className="row ">
          <div className="column-full d-flex justify-between align-center">
            <h2>Tap-In Closet</h2>
            <FaRegUserCircle size={25}/>
          </div>
        </div>
        <div className="row tabs">
          <div className="column-full d-flex justify-between">
            <p className="tab">Dress me</p>
            <p className="tab selected">Closet</p>
            <p className="tab">Outfits</p>
          </div>
        </div>
       <Outlet />
      </div>
    </>
  )
}
