export default function getTotalProductsByCategoryId (categoryId, products) {
        let acc = 0;
        products.map(p => {
            if(p.categories[0].categoria.id == categoryId){
                acc += 1
            }
        });
        console.log("acc", acc);
        return acc
}