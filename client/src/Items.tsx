type Item = {
  itemId: number;
  image: string;
  category: string;
};
export function Items({category}: {category?: Item []}) {
  if (!category) {
    return null;
  }
    let listItems = category.map((item: Item) => (
      <li key={item.itemId}>
        <img src={item.image} alt={item.category}/>
      </li>
      ));

  return <ul>{listItems}</ul>
}
