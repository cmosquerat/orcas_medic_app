import React from 'react'
import './ActualSituation.css'
import Select, { components } from 'react-select'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import makeAnimated from 'react-select/animated';
import { IoAlertCircleOutline } from "react-icons/io5";
import Pagination from 'pagination-for-reactjs-component';
import { GrStatusGood } from "react-icons/gr";

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


export default function ActualSituation() {

  const [pageIndex, setPageIndex] = React.useState(1);
  let pageCount = 10;


  return (
    <> 
      <div style={{'fontSize':'35px','marginBottom':'30px'}} className='col-12'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-bold tx-dark-purple- gray font_medium' style={{'fontSize':'30px','marginBottom':'40px'}}>Tests previos</p>
      </div>
      <div className='alertContainer'>
        <IoAlertCircleOutline color='#F96767' size={55}></IoAlertCircleOutline>
        <span className='red font_medium text-align' style={{'color':'#F96767'}}>Salud mental baja</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        <ul>
          <li>1) Buscar ayuda profesional urgente.</li>
          <li>2) Considerar la posibilidad de tomar medicación si es necesario.</li>
          <li>3) Implementar cambios en su estilo de vida para mejorar su bienestar general.</li>
          <li>4) Buscar apoyo social en amigos, familiares o grupos de apoyo.</li>
        </ul>
        </p>
      </div>
      <div className='alertContainer'>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Ansiedad moderada</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        <ul>
          <li>1) Buscar ayuda profesional urgente.</li>
          <li>2) Considerar la posibilidad de tomar medicación si es necesario.</li>
          <li>3) Implementar cambios en su estilo de vida para mejorar su bienestar general.</li>
          <li>4) Buscar apoyo social en amigos, familiares o grupos de apoyo.</li>
        </ul>
        </p>
      </div>
      <div className='alertContainer'>
        <IoAlertCircleOutline color='#F96767' size={55}></IoAlertCircleOutline>
        <span className='font_medium text-align' style={{'color':'#F96767'}}>Depresión grave</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        <ul>
          <li>1) Buscar ayuda profesional urgente.</li>
          <li>2) Considerar la posibilidad de tomar medicación si es necesario.</li>
          <li>3) Implementar cambios en su estilo de vida para mejorar su bienestar general.</li>
          <li>4) Buscar apoyo social en amigos, familiares o grupos de apoyo.</li>
        </ul>
        </p>
      </div>
      <div className='alertContainer'>
        <GrStatusGood color='#58D931' size={55}></GrStatusGood>
        <span className='font_medium text-align' style={{'color':'#58D931'}}>Sin estrés</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        <ul>
          <li>1) Buscar ayuda profesional urgente.</li>
          <li>2) Considerar la posibilidad de tomar medicación si es necesario.</li>
          <li>3) Implementar cambios en su estilo de vida para mejorar su bienestar general.</li>
          <li>4) Buscar apoyo social en amigos, familiares o grupos de apoyo.</li>
        </ul>
        </p>
      </div>
      {/* <div className='row mt-4 mb-4'>
        <div className='col-12'>
          <h2 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- gray font_medium' style={{'fontSize':'20px'}}>Medicamentos asignados</h2>
        </div>
      </div>
      <div className='row mt-4 mb-4'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
          <div className='card border-0 rounded-0 w-100 bg-transparent'>
            <div className='card-body p-0 w-100'>
              <div className='table-responsive table-general-'>
                <table id='table-medication-order-' className='table table-sm table-striped table-no-border- align-middle'>
                  <thead>
                  <tr>
                    <th scope="col" className='th-width-auto-'>
                      <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                        <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple-'>Medicamento</span>
                      </div>
                    </th>
                    <th scope="col" className='th-width-md-'>
                      <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                        <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple-'>Observaciones</span>
                      </div>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className='align-middle'>
                      <div id='internal-form' className='w-100'>
                          <textarea className='form-control p-0 text-center textarea-large-' rows="4" placeholder='Ingrese una corta observación aquí'></textarea>
                        </div>
                    </td>
                    <td className='align-middle'>
                      <div id='internal-form' className='w-100'>
                        <textarea className='form-control p-0 text-center textarea-large-' rows="4" placeholder='Ingrese una corta observación aquí'></textarea>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='align-middle'>
                    <div id='internal-form' className='w-100'>
                        <textarea className='form-control p-0 text-center textarea-large-' rows="4" placeholder='Ingrese una corta observación aquí'></textarea>
                      </div>
                    </td>
                    <td className='align-middle'>
                      <div id='internal-form' className='w-100'>
                        <textarea className='form-control p-0 text-center textarea-large-' rows="4" placeholder='Ingrese una corta observación aquí'></textarea>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='align-middle'>
                    <div id='internal-form' className='w-100'>
                        <textarea className='form-control p-0 text-center textarea-large-' rows="4" placeholder='Ingrese una corta observación aquí'></textarea>
                      </div>
                    </td>
                    <td className='align-middle'>
                      <div id='internal-form' className='w-100'>
                        <textarea className='form-control p-0 text-center textarea-large-' rows="4" placeholder='Ingrese una corta observación aquí'></textarea>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className='row mt-4 mb-4'>
        <div className='col-12 d-flex flex-row justify-content-center align-items-center align-self-center'>
          <Pagination
            pageCount={pageCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      {/* </div>  */}
      <div className='row mt-4 mb-4'>
            <div className='col-12'>
                <div className='col-12'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-bold tx-dark-purple- gray font_medium' style={{'fontSize':'20px'}}>Diagnostico previo</p>
                </div>
                <form id='internal-form' action='' className='position-relative'>
                    <div className='row mt-4 mb-4'>
                        <div className='col-12'>
                            <form id='internal-form' action='' className='position-relative'>
                                <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                                        <label htmlFor="exampleFormControlTextarea1" className='form-label mb-3 lh-sm fs-5- ff-monse-regular- tx-light-black-'>valoración</label>
                                        <textarea className='form-control' id="current-illness" rows="4" placeholder='Ingrese una corta descripción aquí'></textarea>
                                    </div>
                                </div>
                                <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                                        <label htmlFor="exampleFormControlTextarea1" className='form-label mb-3 lh-sm fs-5- ff-monse-regular- tx-light-black-'>Recomendaciones</label>
                                        <textarea className='form-control' id="family-history" rows="4" placeholder='Ingrese una corta descripción aquí'></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
