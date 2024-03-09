import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { FiEdit } from "react-icons/fi";
type Item = {
  itemId: number;
  image: string;
  category: string;
  outfitId: number;
};
export function Outfits() {
  const [savedOutfit, setSavedOutfit] = useState<Item[]>([]);

 useEffect(() => {
    const session = sessionStorage.getItem('token');
    const req = {
      method: 'GET',
      headers: {'authorization': `Bearer ${session}`},
    };
    fetch('/api/grab/outfits', req)
    .then((res) => res.json())
    .then((data) => {
      //console.log('/api/grab/outfits data:', data);
      setSavedOutfit(data);
    })
 }, [])
//console.log('savedOutfit:', savedOutfit);
  const groupedOutfits = savedOutfit.reduce((acc, outfit) => {
    const { outfitId } = outfit;
    if (!acc[outfitId]) {
      acc[outfitId] = [];
    }
    acc[outfitId].push(outfit);
    return acc;
  }, {});
  return (
    <>
      <div className="outfit-container">
        {Object.keys(groupedOutfits).map((outfitId) => (
        <div className="row">
          <div className="column-full">
            <h3>Outfit: {outfitId}</h3>
            <ul key={outfitId} className="cat-row">
              {groupedOutfits[outfitId].map((outfit: object, index: number) => (
                <li key={index}>
                  <img src={outfit.image} alt={outfit.category} className="item-img"/>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      </div>
      <Outlet />
    </>
  )
}
