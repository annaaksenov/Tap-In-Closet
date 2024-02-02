import {FaRegUserCircle} from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { Closet } from './Closet';
//import { AddItem } from './AddItem';

export function Header({setIsAuthenticated}) {

  function handleLogOut() {
    setIsAuthenticated(false);
  };
  return (
    <>
      <div className="header-container">
        <div className="row ">
          <div className="column-full d-flex justify-between align-center">
            <h2>Tap-In Closet</h2>
            <FaRegUserCircle size={25} className="cursor" onClick={handleLogOut}/>
          </div>
        </div>
        <div className="row tabs">
          <div className="column-full d-flex justify-between">
            <p className="tab cursor">Dress me</p>
            <p className="tab cursor selected">Closet</p>
            <p className="tab cursor">Outfits</p>
          </div>
        </div>
      </div>
      <Closet/>
      {/* {<AddItem/>} */}
      <Outlet />
    </>
  )
}
