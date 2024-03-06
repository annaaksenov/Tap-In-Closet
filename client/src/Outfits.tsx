import { Outlet } from 'react-router-dom';
export function Outfits() {

  return (
    <>
      <div className="outfit-container">
        <div className="row">
          <div className="column-full">
            <ul></ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}
