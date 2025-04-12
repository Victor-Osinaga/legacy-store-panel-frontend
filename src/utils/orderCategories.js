function orderCategories(categories) {
  const map = new Map();

  // Crear un mapa con cada categoría por su id
  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  const result = [];

  categories.forEach((category) => {
    if (category.parentId) {
      // Agregar la categoría como hijo del padre correspondiente
      const parent = map.get(category.parentId);
      if (parent) {
        parent.children.push(map.get(category.id));
      }
    } else {
      // Si no tiene padre, es un nodo raíz
      result.push(map.get(category.id));
    }
  });

  console.log("roots: ", result);

  return result;
}

export { orderCategories };
