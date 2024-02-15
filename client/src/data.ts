// import { Item } from './Closet';

// export async function readCloset(): Promise<Item[]> {
//   const req = {
//     method: 'GET',
//     headers: {
//       authorization: `Bearer ${sessionStorage.getItem('token')}`,
//     }
//   };
//   const res = await fetch('/api/closet', req);
//   if (!res.ok) throw new Error(`fetch Error ${res.status}`);
//   return await res.json();
// }
