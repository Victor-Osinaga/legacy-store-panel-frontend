export default function calculateTerciaryCategories(categorie) {
  let count = 0;
  categorie.forEach((element) => {
    count += element.children.length;
  });
  console.log("cantidad de categorias terciarias: ", count);
  return count;
}
