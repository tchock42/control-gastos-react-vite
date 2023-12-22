import React from 'react'
import {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import Swal from 'sweetalert2'

const ControlPresupuesto = ({ 
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
    }) => { 

    const [porcentaje, setPorcentaje] = useState(0);    //state de porcentaje
    const [disponible, setDisponible] = useState(0)     //dinero disponible
    const [gastado, setGastado] = useState(0)           //dinero gastado en porcentaje

    //useeffect que espera por cambios en gastos
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0  )//cada iteracion es gasto y acumula en total con valor inical de 0
        const totalDisponible = presupuesto - totalGastado; //calcula el porcentaje del presupuesto usado

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2); //calcula porcentaje
        setTimeout(() => {          //espera 1seg para actualizar la grafica
            setPorcentaje(nuevoPorcentaje)                  //setea el porcentaje con lo calculado
        }, 1000);

        setGastado(totalGastado);
        setDisponible(totalDisponible)
    }, [gastos]);

    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "MXN"
        })
    }

    const handleResetApp = () => {
        Swal.fire({
            title: "Confirma",
            text: "¿Deseas reiniciar presupuesto y gastos?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#DC2626",
            confirmButtonText: "Si, reiniciar"
        }).then(result => {
            if (result.isConfirmed){
                setGastos([])                   //inicializa gastos a vacio
                setPresupuesto(0)               //inicializa presupuesto a 0
                setIsValidPresupuesto(false)    //regresa a pantalla de agregar presupuesto
                Swal.fire({
                    title: "Reiniciado",
                    text: "Tu presupuesto ha sido reiniciado",
                    icon: "success"
                });

            }
        });
        
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({       //estilos
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',   //color del circulo superior
                        trailColor: '#F5F5F5',  //color del circulo inferior
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'   //color del texto central
                    })}
                    value={porcentaje}          //valor del porcentaje
                    text={`${porcentaje}% Gastado`} //texto del centro
                />
                
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
        
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
        
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
