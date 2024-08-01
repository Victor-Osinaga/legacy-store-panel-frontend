import { useEffect, useState } from "react"
import './ActionsInGroup.css'

export default function ActionsInGroup({ handlebtnActionMains, deleteGroup }) {
    
    const [mostrarListAcciones, setMostrarListAcciones] = useState(false)

    const handleSubmit = ()=>{
        deleteGroup()
        setMostrarListAcciones(false)
    }
    return (
        <>
            {handlebtnActionMains ? (
                <div className="btnActionMainsContainer position-relative w-100 d-flex justify-content-end mb-2">
                    <button
                        onClick={() => setMostrarListAcciones(!mostrarListAcciones)}
                        // id="btnAcciones" 
                        className="btnActionMains bg-transparent border border-0 fontSM-Custom"
                    >
                        Acciones
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {mostrarListAcciones ? (
                        <ul className="mt-5 position-absolute">

                            <li className="btnsActionsContainer rounded bg-primary bg-light d-flex flex-column">
                                <button onClick={handleSubmit} className="btnActionMainInGroup fontSM-Custom textGray700-Custom w-100 d-flex ps-4 gap-2 rounded border border-0 justify-content-start align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Eliminar
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div className='btnActionMainsContainer mb-2'></div>
            )}
        </>
    )
}