import React from 'react';
import ReactDOM from 'react-dom';
import './modalDelete.css'
import WarningIcon from '../../Icons/WarningIcon/WarningIcon';

export default function ModalDelete({ id, closeModal, name, functionDelete, entity }) {
    const deleteCategoryById = <div>
        <p>¿Estás seguro que deseas eliminar esta categoria ?</p>
        <p>Los productos relacionados se moveran a una categoria <span className='text-danger text-uppercase fw-bold'>'uncategorized'</span></p>
        <p>Nombre: <strong>'{name}'</strong> - ID <strong>'{id}'</strong></p>
    </div>
    const deleteProductById = <div>
        <p>¿Estás seguro que deseas eliminar este producto ?</p>
        <p>Tambien se eliminaran los datos asociados a este</p>
        <p>Nombre: <strong>'{name}'</strong> - ID <strong>'{id}'</strong></p>
    </div>
    
    const deleteShipmentLocalById = <div>
        <p>¿Estás seguro que deseas eliminar esta sucursal de retiro ?</p>
        <p>Si no tienes ninguna creada no podras ofrecer retiro de producto en tu local</p>
        <p>Nombre: <strong>'{name}'</strong> - ID <strong>'{id}'</strong></p>
    </div>
    
    return ReactDOM.createPortal(
        <div className="modalDeleteContainer">
            <div className='modalDelete'>
                <WarningIcon></WarningIcon>
                <h5>Confirmar eliminación</h5>
                {entity == "category" && (deleteCategoryById)}
                {entity == "product" && (deleteProductById)}
                {entity == "shipmentLocal" && (deleteShipmentLocalById)}
                <p className='text-danger text-uppercase fw-bold'>Esta acción es irreversible</p>
                <div className="modalButtons">
                    <button onClick={closeModal}>Cancelar</button>
                    <button onClick={()=>functionDelete(id, name)}>Eliminar</button>
                </div>
            </div>
        </div>,
        document.getElementById('root')
    );
};