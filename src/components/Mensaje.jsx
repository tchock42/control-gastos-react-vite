import React from 'react'

const Mensaje = ({children, tipo}) => { //recibe el prop tipo y el children de <Mensaje>
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje
