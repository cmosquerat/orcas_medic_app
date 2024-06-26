import React from 'react'
import './ListDatesPatient.css'
import Pagination from 'pagination-for-reactjs-component';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import 'malihu-custom-scrollbar-plugin';
import { AppContext } from '../../../../../context';
import Swal from 'sweetalert2';
import Preloader from '../../../../../components/Preloader/Preloader';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import { FaEye } from "react-icons/fa";
import { GetPdfPatient } from '../../../../../Services/MainApp/Medic/dates';
require('jquery-mousewheel');

export default function ListDatesPatient() {

    /* NAVIGATE */
  let navigate=useNavigate()
  
  /* APP CONTEXT */
  let {userHistoryDni,userData,token,selectCompleteDate,setSelectCompleteDate,datesPatient} = React.useContext(AppContext);

    /* USESTATE */
    let [preloader,setPreloader] = React.useState(false);
    let [dates,setDates] = React.useState([]);

    React.useEffect(()=>{
      console.log("DATES PATIENT");
      setDates([...datesPatient.filter((obj,index)=>obj?.documento_topoplot_test !== null)].reverse());
    },[])




  /* functions */

  
  /* date functions */
  // dateFormat
  const GetDataHour=(dateString)=>{

    const fecha = new Date(dateString);

    // Obtener la fecha en formato YYYY-MM-DD
    const fechaFormateada = fecha.toISOString().split('T')[0];

    // Obtener la hora en formato 12 horas con AM/PM
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12; // Ajustar las 12:00 PM y 12:00 AM
    const horaFormateada = horas + ':' + (minutos < 10 ? '0' : '') + minutos + ' ' + ampm;
    

    return [fechaFormateada,horaFormateada]

  }



  
  /* PAGINATION */
  let [ListReference,setListReference] = React.useState([]);
  let [supportList,setSupportList] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageCount,setPageCount] = React.useState(10);


  // funciones para generar el efecto de paginación

  function obtenerSublista(Lista,Tamaño, Numero_secuencia) {
    // obtenemos la lista dependiendo de la pagina
    // teniendo en cuenta la cantidad de paginas
    // y el número de la pagina
    const inicio = (Numero_secuencia-1) * Tamaño;
    return Lista.slice(inicio, inicio + Tamaño);

  }
  
  function obtenerCantidadPaginas(Lista,Tamaño){

    // obtenemos la cantidad de total de paginas
    // segun el tamaño de la lista
    let CantidadPaginas=Lista.length/Tamaño;
    if (!Number.isInteger(CantidadPaginas)){
       return Math.trunc(CantidadPaginas)+1
    }else{
      return CantidadPaginas
    }

  }

  React.useEffect(()=>{
    //console.log("LISTA DE PRODUCTOS: ",ListProducts);
    setPageCount(obtenerCantidadPaginas(dates,10));
    let Sublist=obtenerSublista(dates,10,pageIndex)
    setSupportList(Sublist);
    setListReference(dates);
     
    },[dates])

    React.useEffect(()=>{

        if(pageIndex!==0){
    
        setPageCount(obtenerCantidadPaginas(ListReference,10));
        let Sublist=obtenerSublista(ListReference,10,pageIndex)
        setSupportList(Sublist);
    
        }
        
        
    },[pageIndex,ListReference])


    const seeHistoryPdf=async()=>{

        /* load history pdf */

        let result =  undefined;
        setPreloader(true);
        result = await GetPdfPatient(userHistoryDni,token).catch((error)=>{
            console.log(error);
            setPreloader(false);
            Swal.fire({
                icon: 'info',
                title: 'Problemas para cargar el pdf.'
            })
        })

        if(result){
            console.log(result.data);
            // Crear una URL para el Blob
            const url = URL.createObjectURL(result.data);
            window.open(url);
            setPreloader(false);
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Pdf generado correctamente'
            // })
        }
        
    }




  return (
    <React.Fragment>
        {
                preloader ?
                <>
                <Preloader></Preloader>
                </>
                :

                <></>
        }
        <div className='row mt-4 mb-4'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
            <div className='card border-0 rounded-0 w-100 bg-transparent'>
              <div className='card-body p-0 w-100'>
                <div onClick={seeHistoryPdf} className='ButtonElement' style={{'marginBottom':'80px'}}>
                                    <span  className='ButtonText'>Ver historia</span>
                </div>
                <div className='table-responsive table-general-'>
                  <table id='table-medication-' className='table table-sm table-striped table-no-border- align-middle'>
                    <thead>
                      <tr>
                        <th scope="col" className='th-width-auto-'>
                          <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                            <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Fecha</span>
                          </div>
                        </th>
                        <th scope="col" className='th-width-auto-'>
                          <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                            <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Hora</span>
                          </div>
                        </th>
                        <th scope="col" className='th-width-auto-'>
                          <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                            <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Médico</span>
                          </div>
                        </th>
                        <th scope="col" className='th-width-auto-'>
                          <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                            <span className='font_medium'>Visualizar</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportList.map((obj,index)=>{
                        return (
                          <tr key={index}>
                            <td className='align-middle'>
                              <div id='internal-form' className='w-100'>
                                <p  className=' p-0 text-center input-large- white font_medium
                                '>{GetDataHour(obj?.fecha_realizacion_consulta)[0]}</p>
                              </div>
                            </td>
                            <td className='align-middle'>
                              <div id='internal-form' className='w-100'>
                                <p  className=' p-0 text-center input-large- white font_medium
                                '>{GetDataHour(obj?.fecha_realizacion_consulta)[1]}</p>
                              </div>
                            </td>
                            <td className='align-middle'>
                              <div id='internal-form' className='w-100'>
                                <p className=' p-0 text-center input-large- white font_medium'>{ typeof(obj?.doctor_id) === typeof("string") ? "" : obj?.doctor_id?.primer_nombre + ' '+ obj?.doctor_id?.segundo_nombre+ ' '+obj?.doctor_id?.primer_apellido }</p>
                              </div>
                            </td>
                            <td className='align-middle'>
                              {obj?.documento_topoplot_test !== null ? 
                                <div id='internal-form' className='w-100'>
                                <p  className='p-0 text-center input-large- white font_medium'>
                                <FaEye onClick={()=>{
                                  // Guardamos el objeto en el Context
                                  setSelectCompleteDate(obj)
                                  //Redirigimos a la pestaña correspondiente
                                  navigate('/ModulsMedic/HistoryDatesPatients/StadisticsPatientMedic')
                                  //window.open(obj?.documento_topoplot_test)
                                  
                                }} cursor={'pointer'} color='white'/>
                                </p>
                              </div>
                              :
                              <></>
                              }
                              
                            </td>
                          </tr>
                        )
                      })}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-4 mb-4'>
          <div className='col-12 d-flex flex-row justify-content-center align-items-center align-self-center'>
            <Pagination
              pageCount={pageCount}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </div>
    </React.Fragment>
  )
}
