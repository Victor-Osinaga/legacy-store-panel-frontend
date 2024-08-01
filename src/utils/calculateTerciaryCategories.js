export default function calculateTerciaryCategories (subcategories) {
    let count=0;
    subcategories.forEach(element => {
        count += element.categories.length
    });
    console.log("cantidad de categorias terciarias: ", count);
    return count
}