import { useParams } from "react-router-dom";
import useStoreContext from "../../../provider/storeProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function EditShipmentDelivery() {
    const { shipmentDeliveryId } = useParams()
    const { toastLoading, toastSuccess, toastError, dismissToast } = useStoreContext()
    const [ loading, setLoading ] = useState(true)

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        defaultValues: {
            province: "",
            shipmentCost: 0
        }
    })

    useEffect(() => {
        setLoading(true)
        fetchShipmentDeliveryById()
        return () => {
            dismissToast()
        }
    }, [shipmentDeliveryId])

    const fetchShipmentDeliveryById = async () => {
        const id = toastLoading("Cargando provincia")
        try {
            // hacer function getShipmentDeliveryById
            const shipmentDeliveryById = await getShipmentDeliveryById
        } catch (error) {
            
        }
    }
}