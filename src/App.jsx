import { useState, useEffect} from 'react'
import Header from './components/Header'
import Filtro from './components/Filtro';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';

function App() {
  //declaracion de estados
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0); //cantidad de dinero
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //presupuesto válido
  const [modal, setModal] = useState(false); //apertura del modal para gasto nuevo
  
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ?                //si existen gastos en LS
    JSON.parse(localStorage.getItem('gastos')) : [] //carga gastos como arreglo, si no, carga []
  ) //guarda todos los gastos adel usuario
  const [animarModal, setAnimarModal] = useState(false) //permite se agregue la clase animar

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')      //inicializa state de filtro, es la categoria seleccionada en el form de filtro
  const [gastosFiltrados, setGastosFiltrados] = useState([]) //state de gastos filtrados. No altera gastos
  
  //useeffect para activar modal para editar
  useEffect(() => { //no borra gastoEditar a diferencia de handleNuevoGasto
    if(Object.keys(gastoEditar).length > 0){ //revisa si gastoEditar tiene atributos
      setModal(true) //activa el modal
      setTimeout(() => {
        setAnimarModal(true) //pasados los 3seg, termina el modal activando
      }, 500);
    }
  }, [gastoEditar]); //espera un cambio en gastoEditar
  
  /******LocalStorage*****/
  useEffect(() => {     //revisa presupuesto y lo almacena en localStorage
    localStorage.setItem('presupuesto', presupuesto ?? 0); //guarda presupuesto o 0
  }, [presupuesto]);    //ejecuta ante cambio de presupuesto
  
  useEffect(() => {     //revisa si el presupuesto de LS es valido y se salta a controlPResupuesto
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0){ //Si es un presupuesto válido pasa a ControlPresupuesto
      setIsValidPresupuesto(true)
    }
  }, []);               //lo ejecuta una vez

  useEffect(() => {  //revisa gastos y los guarda en LS
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])  //guarda los gastos en LS
  
  }, [gastos]);                                   //espera cambios en gastos
  /******Termina LocalStorage*/

  /* Filtro */
  useEffect(() => {           //filtro del input select
    if(filtro){
      //filtrar gastos por categoria
      const filtrados = gastos.filter(gasto => gasto.categoria === filtro )

      setGastosFiltrados(filtrados)
    }
  }, [filtro]);               //espera a cambios en el state filtro

  //funcion que activa el modal con el modificador
  const handleNuevoGasto = () =>{
    setModal(true) //comienza la animacion
    setGastoEditar({}) //borra el contenido de gastoEditar para que no se pasen sus atributos a los values

    setTimeout(() => {
      setAnimarModal(true) //pasados los 3seg, termina el modal activando
    }, 500);
  }

  //Guardar gasto en el array de gastos
  const guardarGasto = (gasto) => { //guarda el gasto en el arreglo de gastos, recibe un objeto
    // console.log(gasto) //gasto ya tiene el id al editar
    // return;
    if(gasto.id){ //si el gasto contiene un id significa que es edicion
      //Actualizar | compara y encuentra cual es el gasto a modificar del array gastos y guarda lo actualizado en gastoActualizados
      const gastosActualizados = gastos.map(gastoIterado => gastoIterado.id === gasto.id ? gasto : gastoIterado)
      setGastos(gastosActualizados)   //actualiza el estado de gastos
      setGastoEditar({})              //resetea el state a {}
    }else{
      //Nuevo Gasto
      gasto.id = generarId();         //asigna un id al objeto de gasto
      gasto.fecha = Date.now()        //asigna la fecha 
      setGastos([...gastos, gasto])   //guarda el gasto en el array gastos
    }
    
    setAnimarModal(false) //copia código de Modal.jsx | quita animacion de modal
        setTimeout(() => {  
            setModal(false)   //quita modal   
        }, 500);
  }

  //funcion llamada por el swipe eliminar
  const eliminarGasto = (id) => {
    //realiza un filtrado del array gastos los id que no sean iguales al id a eliminar
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados); //actualiza el array gastos
  }
  return (
    //si existe modal, lo fija al vh de 100 para que cubra la pantalla
    <div className={modal ? 'fijar' : ''}>  
      <Header
        gastos = {gastos} 
        setGastos = {setGastos}
        presupuesto = {presupuesto} 
        setPresupuesto={setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
              />

      {isValidPresupuesto && (                  //Si isValidPresupuesto es true, se renderiza el svg
        //Agrega un boton para agregar un gasto
        <>
          <main>
            <Filtro                             //componente de filtro
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>  
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      ) }
      
      {modal && <Modal  //modal esta por encima de la app
                  setModal = {setModal} 
                  animarModal = {animarModal} 
                  setAnimarModal = {setAnimarModal}
                  guardarGasto = {guardarGasto}
                  gastoEditar = {gastoEditar}
                  setGastoEditar = {setGastoEditar}
                /> /**si modal es true, renderiza el Modal */}

    </div>
  )
}

export default App
