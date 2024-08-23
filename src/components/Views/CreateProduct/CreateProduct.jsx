import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import './createProduct.css'
import getCategories from '../../../services/categorys/getCategories'
import { nameProductValidator } from '../../../validators/validators.js'
import createProduct from '../../../services/products/createProduct.js';
import { NumericFormat } from 'react-number-format';
import useStoreContext from '../../../provider/storeProvider.jsx';


export default function CreateProduct() {
    const { toastLoading, toastSuccess, toastError, dismissToast } = useStoreContext()

    const [categories, setCategories] = useState(null);

    const { register, handleSubmit, formState: { errors }, watch, reset, getValues, control, setValue } = useForm({
        defaultValues: {
            name: "Remera",
            primaryCategory: "",
            secondaryCategory: "",
            terciaryCategory: "",
            description: "Remera oversize para niños especial para verano",
            price: "1500",
            weight: "500",
            sizes: [
                {
                    id: uuidv4(),
                    name: "S",
                    colors: [
                        {
                            id: uuidv4(),
                            name: "Negro",
                            value: "#0ea70c",
                            stock: "10"
                        }
                    ]
                }
            ]
        }
    })

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
        control,
        name: "sizes"
    });
    const { fields: colorFields, remove: removeColor, append: appendColor } = useFieldArray({
        control,
        name: `sizes[${sizeFields.findIndex(size => size.id)}].colors`
    });

    const [hovered, setHovered] = useState({ id: null, hover: false });
    const [talle, setTalle] = useState([
        {
            id: uuidv4(),
            name: "S",
            colors: [
                {
                    id: uuidv4(),
                    name: "rojo",
                    value: "#FF0000",
                    stock: 15
                },
                {
                    id: uuidv4(),
                    name: "rosado",
                    value: "#FF0000",
                    stock: 15
                }
            ]
        },
        {
            id: uuidv4(),
            name: "M",
            colors: [
                {
                    id: uuidv4(),
                    name: "verde",
                    value: "#FF0000",
                    stock: 10
                }
            ]
        }
    ])

    useEffect(() => {
        fetchCategories()
        return () => {
            dismissToast()
        };
    }, [])

    const fetchCategories = async () => {
        getCategories()
            .then((res) => {
                setCategories(res)
                const currentValues = getValues()
                if (res.length > 0) {
                    // si cambia el valor de primaryCategory va a coincidir con el valor que tenga en el option ("value")
                    reset({
                        ...currentValues,
                        // primaryCategory: res[0].id,
                        // secondaryCategory: res[0].subCategories[0].id,
                        // terciaryCategory: res[0].subCategories[0].categories[0].id
                    });
                }
            })
    }

    const handleAddSize = () => {
        const toastId = toastLoading("Añdiendo talle/tamaño")
        try {
            const newSize = {
                id: uuidv4(),
                name: '',
                colors: [
                    {
                        "id": uuidv4(),
                        "name": "",
                        "value": "#0ea70c",
                        "stock": ""
                    }
                ]
            };
            appendSize(newSize);
            toastSuccess("Talle/número añadido, porfavor completa sus datos", toastId)
        } catch (error) {
            // console.log("error al añadir el talle");
            toastError(
                <div className='text-center'><p className='mb-0'><strong>Error al añadir un talle/tamaño</strong></p></div>,
                toastId
            )
        }
    };

    const handleRemoveSizeById = (sizeId, sizeName) => {
        const toastId = toastLoading("Eliminando talle...")
        const index = sizeFields.findIndex((field) => field.id === sizeId);
        if (index !== -1 && sizeFields.length > 1) {
            removeSize(index);
            return toastSuccess(<>Talle eliminado: <strong>'{sizeName}'</strong> - id: <strong>'{sizeId}'</strong></>, toastId)
        } else {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>Minimo un talle/tamaño</strong></p></div>,
                toastId
            )
        }
    };

    const handleRemoveColorById = (sizeIndex, colorId, colorName) => {
        const toastId = toastLoading("Eliminando color...")

        const sizeColors = getValues(`sizes[${sizeIndex}].colors`);
        const colorIndex = sizeColors.findIndex(color => color.id === colorId);
        if (colorIndex !== -1 && sizeColors.length > 1) {
            sizeColors.splice(colorIndex, 1);
            setValue(`sizes[${sizeIndex}].colors`, sizeColors)
            return toastSuccess(<>Color eliminado: <strong>'{colorName}'</strong> - id: <strong>'{colorId}'</strong></> ,toastId)
        } else {
            toastError(
                <div className='text-center'>
                    <span>Minimo un color para cada talle/número</span>
                </div>,
                toastId
            )
        }
    };

    const handleAddColor = (sizeIndex) => {
        const toastId = toastLoading("Añadiendo color...")

        const sizeColors = getValues(`sizes[${sizeIndex}].colors`);
        sizeColors.push({
            "id": uuidv4(),
            "name": "",
            "value": "#0ea70c",
            "stock": ""
        });
        setValue(`sizes[${sizeIndex}].colors`, sizeColors)


        return toastSuccess("Color añadido, porfavor completa sus datos", toastId)

    };

    // console.log('errors', errors);
    const handlePrimaryCategoryChange = async (e) => {
        const selectedPrimaryCategory = e.target.value;
        // Actualiza el valor de la categoría primaria en React Hook Form
        setValue('primaryCategory', selectedPrimaryCategory);
        // Restablece los valores de las categorías secundarias y terciarias
        reset({
            ...getValues(),
            primaryCategory: selectedPrimaryCategory,
            secondaryCategory: '',
            terciaryCategory: ''
        });
    };

    const onSubmit = async (data) => {
        console.log("data", data);
        const formData = new FormData();
        for (const key in data) {
            if (key == 'image') {
                formData.append(key, data.image[0]);
            } if (key == 'sizes') {
                formData.append(key, JSON.stringify(data.sizes));
            } else {
                formData.append(key, data[key]);
            }
        }

        // Mostrar los datos de FormData en la consola
        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }

        const toastId = toastLoading("Creando producto...")

        try {
            const createdProduct = await createProduct(formData)
            toastSuccess(<>Producto creado: <strong>'{createdProduct.name}'</strong> - cantidad: <strong>'1'</strong></>, toastId)

            // Resetear el formulario si es necesario
            return reset();
        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                toastId
            )
        }
    };

    watch()
    return (
        <>
            <section className='containerViewMain'>
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                        <h3 className='fs-4 mainTitle'>Nuevo Producto</h3>
                    </div>
                </div>

                {/* ESPACIADOR */}
                <div className='btnActionMainsContainer mb-2'></div>

                <div className='container-fluid p-0'>
                    <div className='row justify-content-between p-2 p-md-0 m-0'>
                        <div className='col-12 col-md-7 p-0 pe-md-3 mb-3 mb-md-0'>
                            <form onSubmit={handleSubmit(onSubmit)} className='bg-white border px-4 py-4 rounded'>
                                <div className='row mb-3'>
                                    <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>Información</p>
                                    <div className='row rounded border col-12 mx-auto'>
                                        {/* NOMBRE */}
                                        <div className='col-12 d-flex flex-column mb-2'>
                                            <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                Nombre
                                            </label>
                                            <input type="text" id='nombre' className='form-control fontSM-Custom custom-placeholder' placeholder='Remera oversize' {
                                                ...register('name', {
                                                    required: {
                                                        value: true,
                                                        message: "El 'nombre' es requerido"
                                                    },
                                                    validate: nameProductValidator
                                                })
                                            }
                                            />
                                            {errors.name && <span className='mt-1 fontXS-Custom text-danger'>{errors.name.message} <span className='fw-semibold'>*</span></span>}
                                        </div>

                                        {/* DESCRIPCION */}
                                        <div className='col-12 d-flex flex-column mb-2'>
                                            <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom' >
                                                Descripcion
                                            </label>
                                            <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='Descubre nuestra remera oversize, diseñada para ofrecerte máxima comodidad...'{
                                                ...register('description', {
                                                    required: {
                                                        value: true,
                                                        message: "La 'descripcion' es requerida"
                                                    }
                                                })
                                            } />
                                            {errors.description && <span className='mt-1 fontXS-Custom text-danger'>{errors.description.message} <span className='fw-semibold'>*</span></span>}
                                        </div>

                                        {/* PRECIO Y STOCK */}
                                        {/* <div className='col-12 row mx-auto'> */}
                                            <div className='col-6 d-flex flex-column mb-2'>
                                                <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Precio
                                                </label>
                                                {/* <input type="number" className='form-control fontSM-Custom custom-placeholder' placeholder='$ 1.500' {
                                                    ...register('price', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'precio' es requerido"
                                                        }
                                                    })
                                                } />
                                                {errors.price && <span className='mt-1 fontXS-Custom text-danger'>{errors.price.message} <span className='fw-semibold'>*</span></span>} */}
                                                <Controller
                                                    name="price"
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "El 'precio' es requerido"
                                                        },
                                                        validate: {
                                                            positive: (value) => value > 0 || "El valor debe ser positivo",
                                                            maxLength: (value) => value.toString().length <= 10 || "Maximo 10 digitos"
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <>
                                                            <NumericFormat
                                                                className='form-control fontSM-Custom custom-placeholder'
                                                                placeholder='$ 1.500'
                                                                value={value}
                                                                onValueChange={(values) => {
                                                                    onChange(values.floatValue);
                                                                }}
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false}
                                                                allowLeadingZeros={false}
                                                                valueIsNumericString={true}
                                                                prefix="$"
                                                            />
                                                            {errors.price && <span className='mt-1 fontXS-Custom text-danger'>{errors.price.message} <span className='fw-semibold'>*</span></span>}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            <div className='col-6 d-flex flex-column mb-3'>
                                                <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Peso en gramos
                                                </label>
                                                <input type="number" className='form-control fontSM-Custom custom-placeholder' placeholder='1.500 gr (1.5 Kg)' {
                                                    ...register('weight', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'peso' es requerido"
                                                        }
                                                    })
                                                } />
                                                {errors.weight && <span className='mt-1 fontXS-Custom text-danger'>{errors.weight.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        {/* </div> */}
                                    </div>
                                </div>


                                {/* CATEGORIAS */}
                                <div className='row mb-3'>
                                    <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>Categorias</p>
                                    <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                        <div className='col d-flex flex-column mb-2'>
                                            <label htmlFor="primaryCategory" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                Primaria
                                            </label>

                                            {categories ? (
                                                categories.length > 0 ? (
                                                    <>
                                                        <select onChange={(e) => handlePrimaryCategoryChange(e)} className="form-select fontSM-Custom" aria-label="Default select example" {
                                                            ...register('primaryCategory', {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Requerido'
                                                                },
                                                                validate: (value) => {
                                                                    if (!categories.find(c => c.id == value)) {
                                                                        return "Opcion invalida"
                                                                    }
                                                                }
                                                            })
                                                        }>
                                                            <option selected value="">Opciones</option>
                                                            {
                                                                categories.map((cat, index) => (
                                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {errors.primaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.primaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                    </>
                                                ) : (
                                                    <>
                                                        <select className="form-select fontSM-Custom" disabled aria-label="Disabled select example" {
                                                            ...register('primaryCategory', {
                                                                required: {
                                                                    value: true,
                                                                    message: "Requerido empty1"
                                                                },
                                                                validate: (value) => {
                                                                    if (value == "") {
                                                                        return "Debes crear una categoria"
                                                                    }
                                                                }
                                                            })
                                                        }>
                                                            <option selected value="">Vacio</option>
                                                        </select>
                                                        <span className='mt-1 fontXS-Custom text-danger'>Crea una categoria <span className='fw-semibold'>*</span></span>
                                                        {errors.primaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.primaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <select className="form-select fontSM-Custom" disabled aria-label="Disabled select example" {
                                                        ...register('primaryCategory', {
                                                            required: {
                                                                value: true,
                                                                message: "Requerido1"
                                                            },
                                                            validate: (value) => {
                                                                if (value == "cargando" || value === "") {
                                                                    return "Espera..."
                                                                }
                                                            }
                                                        })
                                                    }>
                                                        <option value='' ></option>
                                                    </select>
                                                    <span className='mt-1 fontXS-Custom text-secondary d-flex align-center justify-center gap-1'>
                                                        <div>Cargando...</div>
                                                        <section className=''>
                                                            <div style={{ width: '10px', height: '10px' }} className="spinner-grow" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </section>
                                                    </span>
                                                    {errors.primaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.primaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                </>
                                            )}
                                        </div>
                                        <div className='col d-flex flex-column mb-2'>
                                            <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                Secundaria
                                            </label>
                                            {categories ? (
                                                categories.length > 0 ? (
                                                    <>
                                                        <select className="form-select fontSM-Custom" aria-label="Default select example" {
                                                            ...register('secondaryCategory', {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Requerido2'
                                                                },
                                                                validate: (value) => {
                                                                    const categorie = categories.find(c => c.id == getValues('primaryCategory'))
                                                                    const subCategories = categorie.subCategories
                                                                    if (!subCategories.find(c => c.id == value)) {
                                                                        return "Opcion invalida"
                                                                    }
                                                                }
                                                            })
                                                        }>
                                                            <option value="">Opciones</option>
                                                            {
                                                                categories.map((cat) => {
                                                                    if (cat.id == getValues('primaryCategory')) {
                                                                        return cat.subCategories.map((sub, index) => (
                                                                            <option key={sub.id} value={sub.id}>
                                                                                {sub.name}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                })
                                                            }
                                                        </select>
                                                        {errors.secondaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.secondaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                    </>
                                                ) : (
                                                    <>
                                                        <select className="form-select fontSM-Custom" disabled aria-label="Disabled select example" {
                                                            ...register('secondaryCategory', {
                                                                required: {
                                                                    value: true,
                                                                    message: "Requerido empty2"
                                                                },
                                                                validate: (value) => {
                                                                    if (value == "") {
                                                                        return "Debes elegir"
                                                                    }
                                                                }
                                                            })
                                                        }>
                                                            <option selected value="">Vacio</option>
                                                        </select>
                                                        <span className='mt-1 fontXS-Custom text-danger'>Crea una categoria <span className='fw-semibold'>*</span></span>
                                                        {errors.secondaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.secondaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <select className="form-select fontSM-Custom" disabled aria-label="Disabled select example"  {
                                                        ...register('secondaryCategory', {
                                                            required: {
                                                                value: true,
                                                                message: "Requerido2"
                                                            },
                                                            validate: (value) => {
                                                                if (value == "cargando" || value == "") {
                                                                    return "Espera..."
                                                                }
                                                            }
                                                        })
                                                    }>
                                                        <option value=''></option>
                                                    </select>
                                                    <span className='mt-1 fontXS-Custom text-secondary d-flex align-center justify-center gap-1'>
                                                        <div>Cargando...</div>
                                                        <section className=''>
                                                            <div style={{ width: '10px', height: '10px' }} className="spinner-grow" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </section>
                                                    </span>
                                                    {errors.secondaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.secondaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                </>
                                            )}
                                        </div>
                                        <div className='col d-flex flex-column mb-2'>
                                            <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                Terciaria
                                            </label>
                                            {
                                                categories ? (
                                                    categories.length > 0 ? (
                                                        <>
                                                            <select className="form-select fontSM-Custom" aria-label="Default select example" {
                                                                ...register('terciaryCategory', {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'Requerido3'
                                                                    },
                                                                    validate: (value) => {
                                                                        // console.log("primary selected id", getValues('primaryCategory'));
                                                                        // console.log("sec selected id", getValues('secondaryCategory'));
                                                                        // console.log("ter selected id", getValues('terciaryCategory'));
                                                                        const categorie = categories.find(c => c.id == getValues('primaryCategory'))
                                                                        console.log("primary", categorie);

                                                                        const subCategorie = categorie.subCategories.find(c => c.id == getValues('secondaryCategory'))
                                                                        console.log("sec", subCategorie);

                                                                        const subsubCategorie = subCategorie.categories.find(c => c.id == getValues('terciaryCategory'))
                                                                        console.log("ter", subsubCategorie);

                                                                        if (!subCategorie.categories.find(c => c.id == value)) {
                                                                            return "Opcion invalida"
                                                                        }
                                                                    }
                                                                })
                                                            }>
                                                                <option value="">Opciones</option>
                                                                {
                                                                    categories.map(cat => {
                                                                        if (cat.id == getValues('primaryCategory')) {
                                                                            return cat.subCategories.map((sub) => {
                                                                                if (sub.id === getValues('secondaryCategory')) {
                                                                                    return sub.categories.map((sub2) => (
                                                                                        <option key={sub2.id} value={sub2.id}>
                                                                                            {sub2.name}
                                                                                        </option>
                                                                                    ))
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            </select>
                                                            {errors.terciaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.terciaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <select className="form-select fontSM-Custom" disabled aria-label="Disabled select example" {
                                                                ...register('terciaryCategory', {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Requerido empty3"
                                                                    },
                                                                    validate: (value) => {
                                                                        if (value == "") {
                                                                            return "Debes elegir"
                                                                        }
                                                                    }
                                                                })
                                                            }>
                                                                <option selected value="">Vacio</option>
                                                            </select>
                                                            <span className='mt-1 fontXS-Custom text-danger'>Crea una categoria <span className='fw-semibold'>*</span></span>
                                                            {errors.terciaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.terciaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                        </>
                                                    )
                                                ) : (
                                                    <>
                                                        <select className="form-select fontSM-Custom" aria-label="Disabled select example" disabled {
                                                            ...register('terciaryCategory', {
                                                                required: {
                                                                    value: true,
                                                                    message: "Requerido3"
                                                                },
                                                                validate: (value) => {
                                                                    if (value == "cargando" || value == "") {
                                                                        return "Espera..."
                                                                    }
                                                                }
                                                            })
                                                        }>
                                                            <option value=''></option>
                                                        </select>
                                                        <span className='mt-1 fontXS-Custom text-secondary d-flex align-center justify-center gap-1'>
                                                            <div>Cargando...</div>
                                                            <section className=''>
                                                                <div style={{ width: '10px', height: '10px' }} className="spinner-grow" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </section>
                                                        </span>
                                                        {errors.terciaryCategory && <span className='mt-1 fontXS-Custom text-danger'>{errors.terciaryCategory.message} <span className='fw-semibold'>*</span></span>}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* TAMAÑOS */}
                                <div className='row mb-3'>
                                    <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>Tamaños</p>
                                    {sizeFields.map((size, sizeIndex) => (
                                        <div key={size.id} id={size.id} className='row rounded border col-12 p-0 py-2 mx-auto mb-2'>
                                            {/* NUMERO */}
                                            <div className='col-12 d-flex flex-column mb-2'>
                                                <label htmlFor="" className='d-flex mb-1 mx-auto fw-semibold textGray-Custom fontSM-Custom'>
                                                    Talle/número - id: '{sizeIndex + 1}'
                                                </label>
                                                <div className='d-flex gap-1'>
                                                    <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='S' {
                                                        ...register(`sizes.${sizeIndex}.name`, {
                                                            required: {
                                                                value: true,
                                                                message: "Debes elegir un 'talle/número'"
                                                            }
                                                        })
                                                    } />
                                                    <button onClick={() => handleRemoveSizeById(size.id, getValues(`sizes.${sizeIndex}.name`))} type="button" className="btn btn-outline-danger btn-sm rounded" title='Eliminar talle'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'inherit' }} className="svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                {/* siempre se condciona el mensaje de error hacia el campo especifico del error  */}
                                                {errors.sizes?.[sizeIndex]?.name && <span className='mt-1 fontXS-Custom text-danger'>{errors.sizes[sizeIndex]?.name?.message} <span className='fw-semibold'>*</span></span>}

                                            </div>

                                            {/* COLOR */}
                                            {watch(`sizes[${sizeIndex}].colors`).map((col, colorIndex) => (
                                                <div key={col.id} className='row col-12 mx-auto'>
                                                    {/* <div className='col-6 d-flex row mb-2 p-0 pe-1'>
                                                        <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                            Color
                                                        </label>
                                                        <div className=' col-9 flex-column align-items-center'>
                                                            <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='Color name'
                                                                {...register(`sizes.${sizeIndex}.colors.${colorIndex}.name`, {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Elige un nombre"
                                                                    }
                                                                })}
                                                            />
                                                            {errors.sizes?.[sizeIndex]?.colors?.[colorIndex]?.name && <span className='mt-1 fontXS-Custom text-danger'>{errors.sizes[sizeIndex]?.colors?.[colorIndex].name.message} <span className='fw-semibold'>*</span></span>}
                                                        </div>
                                                        <div className='col-3  align-items-center'>
                                                            <input type="color" className="form-control form-control-color" id="exampleColorInput" title="Elige un color" {
                                                                ...register(`sizes.${sizeIndex}.colors.${colorIndex}.value`, {
                                                                    required: {
                                                                        value: true,
                                                                        message: "*"
                                                                    }
                                                                })
                                                            } />
                                                            {errors.sizes?.[sizeIndex]?.colors?.[colorIndex]?.value && <span className='mt-1 fontXS-Custom fw-semibold text-danger'>{errors.sizes[sizeIndex]?.colors?.[colorIndex].value.message} </span>}
                                                        </div>
                                                    </div> */}
                                                    <div className='col-6 d-flex flex-column mb-2 p-0 pe-1'>
                                                        <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                            Color
                                                        </label>
                                                        <div className='d-flex gap-1 align-items-center'>
                                                            <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='Azul'
                                                                {...register(`sizes.${sizeIndex}.colors.${colorIndex}.name`, {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Elige un nombre"
                                                                    }
                                                                })}
                                                            />
                                                            <input type="color" className="form-control h-100 form-control-sm form-control-color" id="exampleColorInput" title="Elige un color" {
                                                                ...register(`sizes.${sizeIndex}.colors.${colorIndex}.value`, {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Elige un valor para el color"
                                                                    }
                                                                })
                                                            } />
                                                        </div>
                                                        {errors.sizes?.[sizeIndex]?.colors?.[colorIndex]?.name && <span className='mt-1 fontXS-Custom text-danger'>{errors.sizes[sizeIndex]?.colors?.[colorIndex].name.message} <span className='fw-semibold'>*</span></span>}
                                                        {errors.sizes?.[sizeIndex]?.colors?.[colorIndex]?.value && <span className='mt-1 fontXS-Custom text-danger'>{errors.sizes[sizeIndex]?.colors?.[colorIndex].value.message} <span className='fw-semibold'>*</span></span>}
                                                    </div>
                                                    {/* STOCK */}
                                                    <div className='col-6 d-flex flex-column mb-2 p-0 ps-1'>
                                                        <label htmlFor="" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                            Stock
                                                        </label>
                                                        <div className='d-flex gap-1'>
                                                            <input type="number" className='form-control fontSM-Custom custom-placeholder' placeholder='10' {
                                                                ...register(`sizes.${sizeIndex}.colors.${colorIndex}.stock`, {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Añade un stock"
                                                                    },
                                                                    validate: (value) => {
                                                                        // si llega un valor como 11,11 Number(value) retorna NaN porque solo toma el primer valor osea el primer 11
                                                                        const numberConvert = value.toString().replace(",", ".")
                                                                        const stock = Number(numberConvert)
                                                                        if (/[\.,]$/.test(value)) {
                                                                            return "No puede terminar con un punto o una coma"
                                                                        } else if (!stock) {
                                                                            return "Debe ser un numero"
                                                                        } else if (!Number.isInteger(stock)) {
                                                                            return "Debe ser un numero entero";
                                                                        }
                                                                    }
                                                                })
                                                            } />
                                                            <button type="button" className="btn btn-outline-danger btn-sm rounded" title='Eliminar color'
                                                                onClick={() => handleRemoveColorById(sizeIndex, col.id, getValues(`sizes.${sizeIndex}.colors.${colorIndex}.name`))}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'inherit' }} className="svgSize">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        {errors.sizes?.[sizeIndex]?.colors?.[colorIndex]?.stock && <span className='mt-1 fontXS-Custom text-danger'>{errors.sizes[sizeIndex]?.colors?.[colorIndex].stock.message} <span className='fw-semibold'>*</span></span>}
                                                    </div>

                                                </div>
                                            ))}
                                            {/* BTN AÑADIR COLOR */}
                                            <div className='col-12  mb-2'>
                                                <button type="button" className="btnAddColor btn btn-outline-primary w-100 btn-sm fontSM-Custom"
                                                    onClick={() => handleAddColor(sizeIndex)}
                                                    onMouseEnter={() => {
                                                        document.getElementById(size.id).classList.add('hovered')
                                                    }}
                                                    onMouseLeave={() => {
                                                        document.getElementById(size.id).classList.remove('hovered')
                                                    }}
                                                >
                                                    Añadir color
                                                </button>
                                                {/* <button type="button" className="btn btn-primary w-100 btn-sm fontSM-Custom">Añadir color</button> */}
                                            </div>
                                        </div>
                                    ))}

                                    {/* BTN AÑADIR TALLE */}
                                    <div className='row col-12 mx-auto mb-2'>
                                        <div className='col-6 mx-auto' onClick={handleAddSize}>
                                            <button type="button" className="btn btn-outline-primary w-100 btn-sm fontSM-Custom">Añadir talle</button>
                                            {/* <button type="button" className="btn btn-primary w-100 btn-sm fontSM-Custom">Añadir talle</button> */}
                                        </div>
                                    </div>

                                </div>

                                {/* IMAGEN */}
                                <div className='row mb-3'>
                                    <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>Multimedia</p>
                                    <div className='row rounded border col-12 p-0 py-2 mx-auto mb-2'>
                                        <div className='col-12'>
                                            <label htmlFor="image" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                Imagen
                                            </label>
                                            <input type="file" className="form-control form-control-sm" id="image" {
                                                ...register('image', {
                                                    required: {
                                                        value: true,
                                                        message: "Debes cargar una imagen"
                                                    }
                                                })
                                            } />
                                            {errors.image && <span className='mt-1 fontXS-Custom text-danger'>{errors.image.message} <span className='fw-semibold'>*</span></span>}
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='row col-12 p-0 py-2 mx-auto'>
                                        <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">CREAR PRODUCTO</button>

                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* <div className='col-12 col-md-5 p-0 ps-md-3'>
                            <div className='bg-danger'>
                                <h4>previewProduct</h4>
                                <div>
                                    <pre>
                                        {JSON.stringify(watch(), null, 2)}
                                    </pre>
                                </div>
                                {
                                    categories?.map((cat) => {
                                        if (cat.id == getValues('primaryCategory')) {
                                            return cat.subCategories.map((sub) => (
                                                <>
                                                    <option>
                                                        {sub.name}
                                                    </option>
                                                </>
                                            ))
                                        }
                                    })
                                }
                                {
                                    categories?.map((cat) => {
                                        if (cat.id == getValues('primaryCategory')) {
                                            return cat.subCategories.map((sub) => {
                                                if (sub.id == getValues('secondaryCategory')) {
                                                    return sub.categories.map(sub2 => (
                                                        <option key={sub2.id} value={sub2.id}>
                                                            {sub2.name}
                                                        </option>
                                                    ))
                                                }
                                            })
                                        }
                                    })
                                }
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}