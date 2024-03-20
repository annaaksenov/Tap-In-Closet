import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { EditOutfit } from './EditOutfit';

type Item = {
  itemId: number;
  image: string;
  category: string;
  outfitId: number;
};
export function Outfits() {
  const [savedOutfit, setSavedOutfit] = useState<Item[]>([]);
  const navigate = useNavigate();
console.log('savedOutfit', savedOutfit);
 useEffect(() => {
    const session = sessionStorage.getItem('token');
    const req = {
      method: 'GET',
      headers: {'authorization': `Bearer ${session}`},
    };
    fetch('/api/grab/outfits', req)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      setSavedOutfit(data);
    })
    .catch((err) => {
        console.log(err);
      });
 }, [])
  const groupedOutfits = savedOutfit.reduce((acc, outfit) => {
    const { outfitId } = outfit;
    if (!acc[outfitId]) {
      acc[outfitId] = [];
    }
    acc[outfitId].push(outfit);
    return acc;
  }, {});

//   const handleDeleteOutfit = (outfitId: string) => {
//     const session = sessionStorage.getItem('token');
//     const req = {
//       method: 'DELETE',
//       headers: {'authorization': `Bearer ${session}`},
//     };
//     fetch(`/api/delete/${outfitId}`, req)
//     .then((res) => {
//       if (res.status === 204) {
//         // Delete was successful, remove the outfit from state
//         setSavedOutfit(savedOutfit.filter(outfit => outfit.outfitId !== Number(outfitId)));
//       }
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//  };
async function handleDeleteOutfit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, outfitId: string) {
e.preventDefault();
try {
const session = sessionStorage.getItem('token');
    const req = {
      method: 'DELETE',
      headers: {'authorization': `Bearer ${session}`},
    };
    const response = await fetch(`/api/delete/${outfitId}`, req);
    if (response.status === 204) {
        // Delete was successful, remove the outfit from state
        setSavedOutfit(savedOutfit.filter(outfit => outfit.outfitId !== Number(outfitId)));
    } else {
        console.log('Failed to delete outfit');
    }
  } catch(err) {
    console.error(err);
  }
};

  return (
    <>
      <div className="outfit-container">
        {Object.keys(groupedOutfits).map((outfitId) => (
        <div className="row d-block">
          <div className="column-half d-flex align-center">
            <h3 className="padding-right">Outfit {outfitId}</h3>
            <FaTrashAlt className="padding-right" size="20px" cursor="pointer"
              onClick={(e: any) => handleDeleteOutfit(e, outfitId)}>
              </FaTrashAlt>
            <FiEdit className="padding-right link" size="20px" cursor="pointer"
              onClick={() => navigate(`/edit-outfit/${outfitId}`)}>
              <EditOutfit/>
            </FiEdit>
          </div>
          <div className="column-half">
            <ul className="cat-row">
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
