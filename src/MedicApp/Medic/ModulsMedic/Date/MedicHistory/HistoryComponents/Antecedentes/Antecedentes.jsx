import React from 'react'
import './Antecedentes.css'
import Select, { components } from 'react-select'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import makeAnimated from 'react-select/animated';
import { AppContext } from '../../../../../../../context';


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


export default function Antecedentes() {
    /* appContext */
    let {flagHistory,typeDate,setTypeDate,dniDateUser,setDniDateUser,token,userDateData,setUserDateData,beforeDate,setBeforeDate} = React.useContext(AppContext);
    
    /* useState */
    let [pass,setPass] = React.useState(beforeDate);

    /* functions */

    const ReadInputs=(event,type)=>{
          setPass({...pass,[type]:event.target.value})
    }

    /* useEffects */

    React.useEffect(()=>{
    
      if(flagHistory){
        console.log("guardado 2");
        // guardamos en el appContext la información del usuario
        setBeforeDate(pass);
      }
    },[flagHistory])
    
    return (
        <div className='row mt-4 mb-4'>
            <div className='col-12'>
                <div className='col-12'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-bold tx-dark-purple- gray font_medium'>Antescedentes</p>
                </div>
                <form id='internal-form' action='' className='position-relative'>
                    <div className='row mt-4 mb-4'>
                        <div className='col-12'>
                            <form id='internal-form' action='' className='position-relative'>
                                <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                                        <label htmlFor="exampleFormControlTextarea1" className='form-label mb-3 lh-sm fs-5- ff-monse-regular- tx-light-black-'>Antescedentes familiares</label>
                                        <textarea value={pass?.antecedentes_familiares} onChange={(event)=>ReadInputs(event,'antecedentes_familiares')} className='form-control' id="current-illness" rows="4" placeholder='Ingrese una corta descripción aquí'></textarea>
                                    </div>
                                </div>
                                <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                                        <label htmlFor="exampleFormControlTextarea1" className='form-label mb-3 lh-sm fs-5- ff-monse-regular- tx-light-black-'>Antecedentes médicos</label>
                                        <textarea value={pass?.antecedentes_medicos} onChange={(event)=>ReadInputs(event,'antecedentes_medicos')} className='form-control' id="family-history" rows="4" placeholder='Ingrese una corta descripción aquí'></textarea>
                                    </div>
                                </div>
                                <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                                        <label htmlFor="exampleFormControlTextarea1" className='form-label mb-3 lh-sm fs-5- ff-monse-regular- tx-light-black-'>historial educativo</label>
                                        <textarea value={pass?.historial_educativo} onChange={(event)=>ReadInputs(event,'historial_educativo')} className='form-control' id="pathological-history" rows="4" placeholder='Ingrese una corta descripción aquí'></textarea>
                                    </div>
                                </div>
                                <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                                        <label htmlFor="exampleFormControlTextarea1" className='form-label mb-3 lh-sm fs-5- ff-monse-regular- tx-light-black-'>historial laboral</label>
                                        <textarea value={pass?.historial_laboral} onChange={(event)=>ReadInputs(event,'historial_laboral')} className='form-control' id="pharmacological-history" rows="4" placeholder='Ingrese una corta descripción aquí'></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
