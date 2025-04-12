import { useState } from "react";
import { useLocation } from "react-router-dom";
import updatePrimaryById from "../../../services/categorys/updatePrimaryById.js";
import useStoreContext from "../../../provider/storeProvider.jsx";
import "./editCategory.css";

const CategoryItem = ({ category, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    onUpdate(category.id, editedName);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedName(category.name);
    setIsEditing(false);
  };

  return (
    <>
      <div
        className={
          category.level == "primary"
            ? "mb-3 border p-2 rounded"
            : "mb-3 border p-2 rounded"
        }
      >
        {category.level === "primary" ? (
          <>
            <p className="mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom">
              Categoria {category.level}
            </p>
          </>
        ) : null}

        <div
          className={
            category.level === "primary"
              ? "d-flex flex-column rounded border px-3 py-3 mx-auto"
              : "d-flex flex-column px-3 py-3 mx-auto"
          }
        >
          <label
            className="mb-2 fw-semibold textGray500-Custom fontSM-Custom"
            htmlFor="name"
          >
            Nombre - Categoria {category.level}
          </label>
          {isEditing ? (
            <div className="d-flex gap-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="form-control fontSM-Custom custom-placeholder"
                required="true"
              />
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary w-100 btn-sm fontSM-Custom"
                  onClick={handleSave}
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline-primary w-100 btn-sm fontSM-Custom"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex gap-2">
                <input
                  className="form-control fontSM-Custom flex-grow-1"
                  // placeholder={watch("name")}
                  placeholder={category.name}
                  disabled
                />
                <button
                  onClick={handleEdit}
                  className="btn btn-primary btn-sm fontSM-Custom"
                >
                  Editar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className=" mb-3">
        {category.children.map((child) => (
          <CategoryItem key={child.id} category={child} onUpdate={onUpdate} />
        ))}
      </div>
    </>
  );
};

export default function EditCategory() {
  const { toastSuccess, toastError, toastLoading } = useStoreContext();
  const location = useLocation();
  const categoria = location.state?.categoria;

  const [categoryData, setCategoryData] = useState(categoria);

  const updateCategory = async (id, newName) => {
    const toastId = toastLoading("Actualizando categoría...");
    try {
      await updatePrimaryById(id, newName);
      setTimeout(() => {
        toastSuccess("Categoría actualizada", toastId);

        // Función recursiva para actualizar el nombre dentro de los hijos
        const updateCategoryRecursive = (category) => {
          if (category.id === id) {
            return { ...category, name: newName };
          }
          return {
            ...category,
            children: category.children.map(updateCategoryRecursive),
          };
        };

        setCategoryData(updateCategoryRecursive(categoryData));
      }, 500);
    } catch (error) {
      toastError(`Error al actualizar la categoría: ${error}`, toastId);
    }
  };

  return (
    <section className="containerViewMain">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div>
          <h3 className="fs-4 mainTitle">Editar Categoria</h3>
        </div>
      </div>

      {/* ESPACIADOR */}
      <div className="btnActionMainsContainer mb-2"></div>
      <div className="w-50">
        <CategoryItem category={categoryData} onUpdate={updateCategory} />
      </div>
    </section>
  );
}

// __________________________________________________________________________________

// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import updatePrimaryById from "../../../services/categorys/updatePrimaryById.js";
// import useStoreContext from "../../../provider/storeProvider.jsx";
// import "./editCategory.css";

// export default function EditCategory() {
//   const { toastSuccess, toastError, toastLoading } = useStoreContext();

//   const location = useLocation();
//   const categoria = location.state?.categoria;
//   const [category, setCategory] = useState(categoria);
//   const [editName, setEditName] = useState(false);

//   const { register, handleSubmit, setValue, watch } = useForm({
//     defaultValues: {
//       name: categoria.name || "",
//       id: categoria.id,
//     },
//   });
//   console.log("categoria desde location.state: ", categoria);
//   watch("name");

//   const onSubmitName = async (data) => {
//     const toastId = toastLoading("Actualizando categoria primaria");
//     try {
//       console.log("Datos enviados: ", data);

//       const response = await updatePrimaryById(data.id, data.name);
//       setTimeout(() => {
//         toastSuccess("Categoria primaria actualizada", toastId);
//         setCategory(response);
//         console.log("response desde componente");
//         setEditName(false);
//       }, 500);
//     } catch (error) {
//       toastError(
//         <div className="text-center">
//           <p className="mb-0">
//             <strong>Error al actualizar categoria primaria</strong>
//           </p>
//         </div>,
//         toastId
//       );
//     }
//   };

//   return (
//     <>
//       <section className="containerViewMain">
//         <div className="d-flex justify-content-between align-items-center w-100">
//           <div>
//             <h3 className="fs-4 mainTitle">Editar Categoria</h3>
//           </div>
//         </div>

//         {/* ESPACIADOR */}
//         <div className="btnActionMainsContainer mb-2"></div>

//         <div className="w-50">
//           <form onSubmit={handleSubmit(onSubmitName)}>
//             {/* Categoria primaria */}
//             <div>
//               <p className="mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom">
//                 Categoria primaria
//               </p>
//               <div className="d-flex flex-column rounded border px-3 py-2 mx-auto">
//                 <label className="mb-2" htmlFor="name">
//                   Nombre - Categoria primaria
//                 </label>
//                 {editName ? (
//                   <>
//                     <input
//                       type="text"
//                       {...register("name")}
//                       className="mb-2 form-control fontSM-Custom custom-placeholder"
//                     />
//                     <div className="d-flex gap-2">
//                       <button
//                         className="btn btn-primary w-100 btn-sm fontSM-Custom"
//                         type="submit"
//                       >
//                         Guardar
//                       </button>
//                       <button
//                         onClick={() => {
//                           setEditName(!editName);
//                           setValue("name", category.name);
//                         }}
//                         className="btn btn-outline-primary w-100 btn-sm fontSM-Custom"
//                       >
//                         Cancelar
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       className="mb-2 form-control fontSM-Custom"
//                       placeholder={watch("name")}
//                       disabled
//                     />

//                     {/* {category.name} */}
//                     <button
//                       onClick={() => setEditName(!editName)}
//                       className="btn btn-primary w-100 btn-sm fontSM-Custom"
//                     >
//                       Editar
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// __________________________________________________________________________

// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import updatePrimaryById from "../../../services/categorys/updatePrimaryById.js";
// import useStoreContext from "../../../provider/storeProvider.jsx";
// import "./editCategory.css";

// const CategoryItem = ({ category, onUpdate }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState(category.name);

//   const handleEdit = () => setIsEditing(true);
//   const handleSave = () => {
//     onUpdate(category.id, editedName); // Actualiza el nombre
//     setIsEditing(false);
//   };
//   const handleCancel = () => {
//     setEditedName(category.name); // Restaura el nombre original
//     setIsEditing(false);
//   };

//   return (
//     <div className="category-item" data-level={category.level}>
//       <div className="category-header d-flex mb-3">
//         {category.children.length > 0 && (
//           <button
//             className="toggle-btn"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             {isExpanded ? "▼" : "►"}
//           </button>
//         )}
//         {isEditing ? (
//           <div className="edit-container">
//             <input
//               type="text"
//               value={editedName}
//               onChange={(e) => setEditedName(e.target.value)}
//               className="edit-input"
//             />
//             <button className="save-btn" onClick={handleSave}>
//               ✓
//             </button>
//             <button className="cancel-btn" onClick={handleCancel}>
//               ✕
//             </button>
//           </div>
//         ) : (
//           <>
//             <span className="category-name">{category.name}</span>
//             <button className="edit-btn" onClick={handleEdit}>
//               ✎
//             </button>
//           </>
//         )}
//       </div>

//       {isExpanded && category.children.length > 0 && (
//         <div className="category-children">
//           {category.children.map((child) => (
//             <CategoryItem key={child.id} category={child} onUpdate={onUpdate} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default function EditCategory() {
//   const { toastSuccess, toastError, toastLoading } = useStoreContext();
//   const location = useLocation();
//   const categoria = location.state?.categoria;

//   const [categoryData, setCategoryData] = useState(categoria);

//   const updateCategory = async (id, newName) => {
//     try {
//       const toastId = toastLoading("Actualizando categoría...");
//       const response = await updatePrimaryById(id, newName);
//       setTimeout(() => {
//         toastSuccess("Categoría actualizada", toastId);

//         // Función recursiva para actualizar el nombre dentro de los hijos
//         const updateCategoryRecursive = (category) => {
//           if (category.id === id) {
//             return { ...category, name: newName };
//           }
//           return {
//             ...category,
//             children: category.children.map(updateCategoryRecursive),
//           };
//         };

//         setCategoryData(updateCategoryRecursive(categoryData));
//       }, 500);
//     } catch (error) {
//       toastError("Error al actualizar la categoría.");
//     }
//   };

//   return (
//     <div className="category-editor">
//       <h1>Editar Categoría</h1>
//       <CategoryItem category={categoryData} onUpdate={updateCategory} />
//     </div>
//   );
// }
