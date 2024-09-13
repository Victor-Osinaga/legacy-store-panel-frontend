import { useEffect, useState } from "react"
import useStoreContext from "../provider/storeProvider";


export default function useHandlerTable (data = []) {
    const {selectAll} = useStoreContext()

    useEffect(() => {
        setEntity(data);
    }, [data]);
    

    const [entity, setEntity] = useState(data)
    const [allSelected, setAllSelected] = useState(false)
    const [showBtnActions, setShowBtnActions] = useState(false);

    const select = (idEntity) => {
        const newData = entity.map(e =>
            e.id === idEntity
                ? { ...e, selected: !e.selected }
                : e
        )
        setEntity(newData)

        const algunaSeleccionada = newData.some(e => e.selected == true)
        if (algunaSeleccionada) {
            setAllSelected(false)
            setShowBtnActions(true)
        }

        const ningunaSeleccionada = newData.every(e => e.selected == false)
        const todosSeleccionados = newData.every(e => e.selected == true)
        if (ningunaSeleccionada) {
            setAllSelected(false)
            setShowBtnActions(false)
        } else if (todosSeleccionados) {
            setAllSelected(true)
            setShowBtnActions(true)
        }
    }

    const selectAllItems = () => {
        if(allSelected){
            const newData = selectAll(false, entity)
            setAllSelected(false)
            setShowBtnActions(false)
            setEntity(newData)
        }else{
            const newData = selectAll(true, entity)
            setAllSelected(true)
            setShowBtnActions(true)
            setEntity(newData)
        }
    }

    const deleteItemsSelected = () => {
        const itemsSelected = entity.filter(prod => prod.selected)
        const idItemsSelected = itemsSelected.map(i => i.id)
        console.log("itemsSelected seleccionados", itemsSelected);
        console.log("id idItemsSelected", idItemsSelected)
    }

    return {
        // FUNCIONES PARA MODIFICAR EL ESTADO DE LA TABLA
        select,
        selectAllItems,
        deleteItemsSelected,

        // ESTADOS DE LA TABLA
        showBtnActions,
        entity,
        allSelected,
    }
}