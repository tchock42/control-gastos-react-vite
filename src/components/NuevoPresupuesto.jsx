import React, { useState } from 'react'
import Mensaje from './Mensaje';
//Componente de formulario

//importa los props del state presupuesto y setpresupuesto
const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    
    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => { //si se da clic en enviar
        e.preventDefault();
        
        if(!presupuesto || presupuesto <= 0){ //si no hay presupuesto o vale menos que 0
            setMensaje('No es un presupuesto válido');
            return; //sale de la funcoin y ya no ejecuta lo siguiente 
        }
        //Resetear el error
        setMensaje(''); //ya no aparece ni en componentes ni en pantalla
        setIsValidPresupuesto(true) //presupuesto valido        
    }

    return (
        
        <div lassName='contenedor-presupuesto contenedor sombra'>

            <form className='formulario' onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input 
                        type="number" 
                        className='nuevo-presupuesto'
                        placeholder='Añade tu Presupuesto'
                        value = {presupuesto}
                        onChange={ (e) => setPresupuesto(Number(e.target.value))} //al teclear se pasa al state el valor
                    />
                </div>
                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> /** Pasa prop tipo como string */} 
            </form>
        </div>
    )
}

export default NuevoPresupuesto
