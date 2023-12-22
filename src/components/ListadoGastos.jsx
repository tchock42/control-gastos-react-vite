import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto,
    filtro,
    gastosFiltrados
}) => {
  return (
    <div className='Listado-gastos contenedor'>
      

      {filtro ? ( //si existe filtro, itera sobre gastosFiltrados
        <>
          <h2>{ gastosFiltrados.length ? 'Gastos' : 'No hay Gastos aún' }</h2>
          {gastosFiltrados.map( (gasto) => ( //itera sobre el arreglo gastos para renderizarlo
            <Gasto
              key = {gasto.id} //le pasa el id del gasto iterado
              gasto = {gasto} //pasa el gasto iterado
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{ gastos.length ? 'Gastos' : 'No hay Gastos aún' }</h2>
          {gastos.map( (gasto) => ( //itera sobre el arreglo gastos para renderizarlo
          <Gasto
              key = {gasto.id} //le pasa el id del gasto iterado
              gasto = {gasto} //pasa el gasto iterado
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
            />
          ))}
        </>
      )}

    </div>
  )
}

export default ListadoGastos
