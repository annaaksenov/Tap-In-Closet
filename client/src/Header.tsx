import {FaRegUserCircle} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

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
          <Link to="/header/dress-me" className="cursor">
              Dress me
            </Link>
            <Link to="" className="cursor">
              Closet
            </Link>
            {/* <Link to="/header/outfits" className="cursor">
              Outfits
            </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}
