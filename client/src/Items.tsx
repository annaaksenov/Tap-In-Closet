type Item = {
  itemId: number;
  image: string;
  category: string;
};
export function Items({category}) {
/*{    const listItems = category.map((item: Item) => <ListItem key={item.itemId} value={item.image}/>);
    const listItems = category.map((item: Item) => {
      console.log(item.image);
      { <li key={item.itemId}>
        <img src={item.image} alt={item.category}/>
      </li>}
    <ul>{listItems}</ul>
    `server/public${item.image}`
    })}*/
  return (
      <>
        <ul>
        {category.map((item: Item) => {
            console.log('itemMap:', item);
           return (<li key={item.itemId}>
            <img src={item.image} alt={item.category} />
          </li>)
        })}
     </ul>
     </>
  );
}
