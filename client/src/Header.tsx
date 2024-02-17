import {FaRegUserCircle} from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { Closet } from './Closet';
import { DressMe } from './DressMe';
//import { AddItem } from './AddItem';

export function Header({logout}) {
const navigate = useNavigate();
  function handleLogOut() {
    logout();
    navigate('/login');
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
            <p className="tab cursor">Closet</p>
            <p className="tab cursor">Outfits</p>
          </div>
        </div>
      </div>
      <Closet/>
      {/* {<AddItem/>} */}
      {/* <DressMe /> */}
      <Outlet />
    </>
  )
}
