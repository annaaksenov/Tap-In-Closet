type Item = {
  itemId: number;
  image: string;
  category: string;
};
export function Items({category}: {category?: Item []}) {
  if (!category) {
    return null;
  }
    const listItems = category.map((item: Item) => (
      <li key={item.itemId}>
        <img src={item.image} alt={item.category} className="item-img"/>
      </li>
      ));
  //   const listItems = category.map((item: Item) => (
  //   <li key={item.itemId}>
  //     <img src={URL.createObjectURL(new Blob([item.image], { type: 'image/jpeg' }))} alt={item.category} />
  //   </li>
  // ))

  return <ul className="cat-row">{listItems}</ul>
}
