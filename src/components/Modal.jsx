import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ( {
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,           //funcion de guardar gasto
    gastoEditar,            //objeto con el gasto para editar
    setGastoEditar          //setear gastoEditar a {} al cerrar modal
}) => {

    const [mensaje, setMensaje] = useState('') //state para la validacion
    //declaracion de states del modal
    const [nombre, setNombre] =useState('')
    const [cantidad, setCantidad] =useState('')
    const [categoria, setCategoria] =useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')
    
    //cargar gasto en el formulario
    useEffect(() => {
        //si contiene keys el objeto gastoEditar
        if( Object.keys(gastoEditar).length > 0 ){
            setNombre(gastoEditar.nombre) //carga los atributos a los values
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha) //carga la fecha al value del form
            setId(gastoEditar.id)
        }
    }, []); //solo ejecuta el useEffect una vez

    //funciones del modal
    const ocultarModal = () =>{ 
        setAnimarModal(false)
        setGastoEditar({}) //borra gastoEditar para liberar state
        setTimeout(() => {
            setModal(false)    
        }, 1000);
    }
    //envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        //validacion del formulario
        if([nombre, categoria, cantidad].includes('')){ 
            setMensaje('Todos los componentes son obligatorios');
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;                              //sale de la funcion handleSubmit
        }
        guardarGasto({nombre, cantidad, categoria, fecha, id})    //se guarda el gasto y pasan los values como un objeto
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="Cerrar modal"
                    onClick={ocultarModal} 
                />
            </div>
            <form 
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            > 
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo = "error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input 
                        type="text" 
                        id='nombre'
                        placeholder='Añade el Nombre del Gasto'    
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number" 
                        id='cantidad'
                        placeholder='Añade la cantidad del Gasto: ej. 300'  
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}  
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="nombre">Categoría</label>
                    <select 
                        name="" 
                        id="categoria"
                        value={categoria} 
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Selecciona --</option> 
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>

                    </select>
                </div>
                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}

export default Modal
