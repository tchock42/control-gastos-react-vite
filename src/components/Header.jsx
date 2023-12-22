import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    presupuesto, 
    setPresupuesto, 
    setGastos,
    isValidPresupuesto, 
    setIsValidPresupuesto,
    gastos 
}) => {
    return (
    <header>
        <h1>Planificador de Gastos</h1>

        {/* Ternario que estable si se despliega el formulario o el Control de presupuesto */}
        {isValidPresupuesto ? ( 
            <ControlPresupuesto
                presupuesto = {presupuesto}
                gastos = {gastos}
                setGastos = {setGastos}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        ) : (
            <NuevoPresupuesto //agrega el formulario de presupuesto
                presupuesto = {presupuesto} 
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        )}

        
    </header>
  )
}

export default Header
