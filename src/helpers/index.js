export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

//funcion para formatear fecha. 
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha); //crea una instancia de tipo fecha
    const opciones = { // objeto de configuracion
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}