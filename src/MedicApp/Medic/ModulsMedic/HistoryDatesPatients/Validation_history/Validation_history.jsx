import React from 'react'
import './Validation_history.css'
import Select, { components } from 'react-select'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Swal from 'sweetalert2';
import { AppContext } from '../../../../../context';
import Preloader from '../../../../../components/Preloader/Preloader';
import makeAnimated from 'react-select/animated';
import { GetPatientCompleteDates } from '../../../../../Services/MainApp/Users/User';

/**
 * MENSAJES PERSONALIZADOS AL BUSCAR O CARGAR OPCIONES EN REACT SELECT
 */

const { NoOptionsMessage } = components;

const customNoOptionsMessage = props => (
  <NoOptionsMessage {...props} className="custom-no-options-message-internal-form-">No registrado</NoOptionsMessage>
);

const { LoadingMessage } = components;

const customLoadingMessage = props => (
  <LoadingMessage {...props} className="custom-loading-message-internal-form-">Cargando</LoadingMessage>
);

/**
 * ANIMATE DELETE MULTISELECT
 */

const animatedComponents = makeAnimated();

/**
 * Data que llena los select
 */

const Parentage = [
  { value: "opcion-uno", label: "Opcion uno" },
  { value: "opcion-dos", label: "Opcion dos" },
  { value: "opcion-tres", label: "Opcion tres" }
];

const MaritalStatus = [
  { value: "opcion-uno", label: "Opcion uno" },
  { value: "opcion-dos", label: "Opcion dos" },
  { value: "opcion-tres", label: "Opcion tres" }
];

const PopulationGroup  = [
  { value: "opcion-uno", label: "Opcion uno" },
  { value: "opcion-dos", label: "Opcion dos" },
  { value: "opcion-tres", label: "Opcion tres" }
];

const EthnicGroup  = [
  { value: "opcion-uno", label: "Opcion uno" },
  { value: "opcion-dos", label: "Opcion dos" },
  { value: "opcion-tres", label: "Opcion tres" }
];

const Religion  = [
  { value: "opcion-uno", label: "Opcion uno" },
  { value: "opcion-dos", label: "Opcion dos" },
  { value: "opcion-tres", label: "Opcion tres" }
];

/**
 * Se genera componente nuevo para soportar el placeholder animado del input 
 */

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  const { inputId, placeholder } = props.selectProps;
  return (
    <ValueContainer {...props}>
      <Placeholder htmlFor={inputId} {...props}>
        {placeholder}
      </Placeholder>
      {React.Children.map(children, child =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

/**
* Constante que soporta todo el cambio de los estilo del select
*/

const selectStyles = {
  /**
  * Estilos del icono del dropdown del select
  * Estilos del separador del select
  * Estilos del icono de cerrar del select
  */
  dropdownIndicator: (styles) => ({ ...styles, 
    color: "#d1a207", 
    padding: 0, paddingTop: '0.34rem !important', 
    paddingRight: '0.5rem !important',
    width: '25px',
    height: '25px',
    "&:hover": {
      color: "var(--color-black-)",
    } 
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  clearIndicator: (styles) => ({ ...styles, 
    color: "white", 
    padding: 0, 
    paddingTop: '0.05rem !important',
    width: '15px',
    height: '15px',
    "&:hover": {
      color: "white",
    } 
  }),
  /**
  * Estilos del input global
  */
  control: () => ({
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  alignSelf: "start",
  justifyContent: "start",
  height: 'auto',
  minHeight: 50,
  maxHeight: 150,
  paddingLeft: '2.1rem',
  paddingTop: '0.3rem',
  width: "100%",
  backgroundColor: 'transparent',
  borderRadius: 0,
  borderBottom: "1px solid #d1a207",
  }),
  /**
  * EESTILOS DEL INPUT
  */
  input: (provided) => ({
  ...provided,
  color: 'var(--color-quaternary-gray-)',
  fontSize: 12,
  textTransform: 'uppercase',
  fontFamily: 'var(--font-family-regular-)',
  }),
  /**
  * Estilos del menu desplegable del select
  */
  menu: (styles) => ({
  ...styles,
  border: 'none',
  backgroundColor: 'var(--color-secondary-white-rgba-)',
  boxShadow: 'var(--box-shadow-2-)',
  borderRadius: '1rem',
  padding: 0,
  marginTop: 8,
  marginBottom: 0,
  height: 'auto',
  minHeight: 'auto',
  maxHeight: 300,
  overflow: "hidden",
  color: 'var(--color-quaternary-gray-)',
  fontSize: 12,
  textTransform: 'uppercase',
  fontFamily: 'var(--font-family-regular-)',
  }),
  menuList: () => ({
    paddingTop: 0,
    paddingBottom: 0,
    height: 'auto',
    minHeight: 'auto',
    maxHeight: 300,
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "0px !important",
      height: "0px !important",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent !important"
    },
    "::-webkit-scrollbar-thumb": {
      background: "transparent !important"
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent !important"
    }
  }),
  /**
  * Estilos de las opciones desplegables
  */
  option: (provided, state) => ({
  ...provided,
  fontSize: 11,
  textTransform: 'uppercase',
  backgroundColor: state.isSelected ? "var(--color-purple-)" : "var(--color-secondary-white-rgba-)",
  fontFamily: 'var(--font-family-regular-)',
  padding: '0.5rem 0.8rem 0.5rem 0.8rem',
  borderRadius: '1rem',
  ":hover": {
  background: "var(--color-purple-)",
  color: 'var(--color-white-)',
  }
  }),
  /**
  * Estilos del contenedor
  */
  container: (provided, state) => ({
  ...provided,
  marginTop: 0,
  width: '100%',
  position: 'relative',
  flex: '1 1 auto'
  }),
  valueContainer: (provided, state) => ({
  ...provided,
  overflow: "visible"
  }),
  /**
  * Estilos placeholder del input
  */
  placeholder: (provided, state) => ({
  ...provided,
  width: '100%',
  position: "absolute",
  top: state.hasValue || state.selectProps.inputValue ? -15 : "28%",
  left: state.hasValue || state.selectProps.inputValue ? -32 : "0%",
  transition: "top 0.1s, font-size 0.1s",
  color: 'var(--color-quaternary-gray-)',
  fontSize: state.hasValue || state.selectProps.inputValue ? 13 : "14px",
  lineHeight: 1.25,
  fontFamily: 'var(--font-family-regular-)',
  overflow: 'hidden',
  textAlign: 'start',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
  }),
  /**
  * Estilos texto en el input
  */
  singleValue: (styles) => ({ 
  ...styles, 
  fontSize: 12,
  textTransform: 'uppercase',
  color: "var(--color-quaternary-gray-)", 
  fontFamily: 'var(--font-family-regular-)', 
  padding: '3px',
  margin: '0px',
  marginTop: '7px',
  marginLeft: 0,
  marginRight: 0
  }),
  multiValue: (styles) => ({ 
    ...styles, 
    backgroundColor: 'var(--color-secondary-white-rgba-)',
    boxShadow: 'var(--box-shadow-2-)',
    borderRadius: '1rem',
    margin: '2px',
    alignItems: 'center',
    alignSelf: 'center',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    fontFamily: 'var(--font-family-regular-)',
    fontSize: 12,
    textTransform: 'uppercase',
    color: 'var(--color-quaternary-gray-)',
    borderRadius: '1rem',
    padding: '5px',
    paddingLeft: '0.5rem',
    paddingRight: '0.6rem',
    paddingBottom: '0.3rem'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    borderRadius: '6rem',
    paddingLeft: '6px',
    width: '26px',
    height: '26px',
    color: 'var(--color-black-)',
    backgroundColor: 'var(--color-secondary-gray-)',
    ':hover': {
      color: 'var(--color-white-)',
      backgroundColor: 'var(--color-secondary-purple-)',
    }
  })
}

/**
 * MESES Y DIAS EN ESPAÑOL PARA EL DATEPICKER
 */

const months = [
  ["Ene", "Ene"],
  ["Feb", "Feb"],
  ["Mar", "Mar"],
  ["Abr", "Abr"],
  ["May", "May"],
  ["Jun", "Jun"],
  ["Jul", "Jul"],
  ["Agos", "Ago"],
  ["Sep", "Sep"],
  ["Oct", "Oct"],
  ["Nov", "Nov"],
  ["Dic", "Dic"],
]
const weekDays = [
  ["Lun", "Lu"],
  ["Mar", "Ma"],
  ["Mie", "Mi"],
  ["Jue", "Ju"],
  ["Vie", "Vi"],
  ["Sab", "Sa"],
  ["Dom", "Do"],
]



export default function Validation_history() {

  /* APPCONTEXT */

  let {userData,token,datesPatient,setDatesPatient,userHistoryDni,setUserHistoryDni} = React.useContext(AppContext);

  /* useStates */

  let [dniUser,setDniUser] = React.useState("");
  let [preloader,setPreloader] = React.useState(false);

  const ReadInputText=(event)=>{

    setDniUser(event.target.value);

  }


  const consultPatient= async()=>{

    if(dniUser ==""){
      Swal.fire({
        icon: 'info',
        title: 'Debes ingresar un número de cédula para consultar'
      })
    }else{

      let result  = undefined;
      setPreloader(true);
      console.log("DATOS : ",userData?.identificacion)
      result = await GetPatientCompleteDates(dniUser,token).catch((error)=>{
        setPreloader(false);
        if(error?.response?.data?.error == "Error al retornar el objeto [User matching query does not exist.]"){

          Swal.fire({
            icon: 'info',
            title: 'El usuario no se encuentra registrado como paciente, completa este paso en la administración de usuarios'
          })
        }else{
            Swal.fire({
              icon: 'info',
              title: 'Problemas para verificar el usuario'
            })
        }
      })

      if(result){
        console.log(result.data);
        if(result.data.length == 0){
          setPreloader(false);
          Swal.fire({
            icon: 'info',
            title: 'No hay citas registradas para este número de identificación.'
          })
        }else{
          setPreloader(false);
          Swal.fire({
            icon: 'success',
            title: 'Historial cargado.'
          }).then((r)=>{
            if(r.isConfirmed){
              setUserHistoryDni(dniUser);
              setDatesPatient(result.data);
              navigate('/ModulsMedic/HistoryDatesPatients/ListPatientDates')
            }else{
              setUserHistoryDni(dniUser);
              setDatesPatient(result.data);
              navigate('/ModulsMedic/HistoryDatesPatients/ListPatientDates')
            }
          })
          //navigate('/ModulsMedic/HistoryDatesPatients/History')
        }
        
        

      }

    }

  }



    let navigate = useNavigate()

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
        <div className='col-12'>
          <h2 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- white font_medium'>Consultar paciente</h2>
        </div>
      </div>
      <div className='row mt-4 mb-4'>
        <div className='col-12'>
          <form id='internal-form' action='' className='position-relative'>

            <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                <div className='form-floating inner-addon- left-addon-'>
                  <input onChange={ReadInputText} type="text" className='form-control' id='firstName' placeholder="Ingrese su primer nombre" />
                  <label className='fs-5- ff-monse-regular- white font_medium'>C.C</label>
                </div>
              </div>
            </div>
            <div onClick={consultPatient}  className='ButtonElement'>
                                <span  className='ButtonText'>Consultar</span>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
    )
}
