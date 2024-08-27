import React from 'react'
import './Validation.css'
import Select, { components } from 'react-select'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import makeAnimated from 'react-select/animated';
import { AppContext } from '../../../../../context';
import Preloader from '../../../../../components/Preloader/Preloader';
import Swal from 'sweetalert2';
import { GetUserData } from '../../../../../Services/Auth/LocalStorage';
import { getUserData } from '../../../../../Services/Auth/Auth';
import { crearRegistros, obtenerRegistros } from '../../../../../Services/MainApp/Medic/MedicHistory/Registros';
import { crearAntescedentes, obtenerAntescedentes } from '../../../../../Services/MainApp/Medic/MedicHistory/Antecedentes';
import { obtenerTestGeneral } from '../../../../../Services/MainApp/Medic/MedicHistory/test_general';
import { obtenerTestAnsiedad } from '../../../../../Services/MainApp/Medic/MedicHistory/test_ansiedad';
import { obtenerTestDepresion } from '../../../../../Services/MainApp/Medic/MedicHistory/test_depresion';
import { obtenerTestEstres } from '../../../../../Services/MainApp/Medic/MedicHistory/test_estres';


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



const PopulationGroup  = [
  { value: "Evaluación inicial", label: "Evaluación inicial" },
  { value: "Seguimiento regular", label: "Seguimiento regular" },
  // { value: "Cita de emergencia", label: "Cita de emergencia" },
  // { value: "Cita de consulta", label: "Cita de consulta" }
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


export default function Validation() {

  let navigate = useNavigate()
  
  let {setCitaAgend,filerepose,setFilerepose,fileActive,setFileActive,typeDate,setTypeDate,dniDateUser,setDniDateUser,token,userDateData,setUserDateData,beforeDate,setBeforeDate,depresion,setDepresion,ansiedad,setAnsiedad,estres,setEstres,general,setGeneral,setFlagHistory} = React.useContext(AppContext);

  /* useState */

  let [preloader,setPreloader] = React.useState(false);

  const ReadTypeDate=(event)=>{

    if(event){
      setTypeDate(event.value);
      
    }else{
      setTypeDate(null);
    }

  }

  const ReadInput=(event)=>{
    setDniDateUser(event.target.value);
  }

  const redirect =async()=>{
    if(typeDate !== null && dniDateUser!== ""){
      // MIRAMOS SI EL USUARIO ESTA REGISTRADO
      
      let result =  undefined;
      setPreloader(true);
      result = await getUserData(dniDateUser,token).catch((error)=>{
        console.log(error);
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
        setPreloader(false);
        console.log(result.data);
        // guardamos la información del usuario
        setUserDateData(result.data);
        // Me traigo la información de los componentes PARA LA CREACIÓN DE LA CITA
        GetUserPass(result.data);
      }

      // navigate('/ModulsMedic/Date_Medic/MakeHistory')
      
    }else{
      
      Swal.fire({
        icon: 'info',
        title: 'Selecciona un tipo de cita y digita la identificación del usuario'
      })

    }
  }

  const GetUserPass=async(DataUser)=>{

    let result =  undefined;
    setPreloader(true);
    result =  await obtenerAntescedentes(dniDateUser,token).catch((error)=>{
        console.log(error);
        setPreloader(false);
        if(error?.response?.data?.error == "El objeto no existe"){
          // 
          createAnstecedentes(DataUser);
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Error al cargar crear cita'
          })
        }
        
    })
    if(result){
      console.log(result.data);
      setBeforeDate(result.data);
      setPreloader(false);
      // DEPENDIENDO DE LA CITA NOS TRAERMOS DETERMINADA INFORMACIÓN
        if(typeDate == "Evaluación inicial"){
          // SETEAMOS LOS TESTS CON VALORES LIMPIOS
          setDepresion({
            "triste_deprimido": 0,
            "perdida_interes_placer": 0,
            "irritable_mal_humor": 0,
            "desesperanzado_pesimista": 0,
            "culpable_inutil": 0,
            "carga_para_otros": 0,
            "pensamientos_muerte_suicidio": 0,
            "cansado_poca_energia": 0,
            "problemas_dormir_descansar": 0,
            "cambios_apetito_alimentacion": 0,
            "incapaz_concentrarse_pensar": 0,
            "camara_lenta": 0,
            "problemas_decisiones": 0,
            "olvidadizo_despistado": 0,
            "nada_ofrecer_al_mundo": 0,
            "vida_sin_sentido": 0,
            "pensamientos_negativos_intrusivos_2": 0,
            "futuro_mejor": 0,
            "fallar_en_todo": 0,
            "nadie_te_quiera_o_entienda": 0,
            "desmotivado_apatico": 0,
            "evitar_actividades_sociales": 0,
            "incapaz_disfrutar_cosas_gustaban": 0,
            "descuidado_higiene_personal": 0,
            "cambios_apetito_alimentacion_2": 0,
            "inquieto_agitado_2": 0,
            "lento_perezoso": 0,
            "iniciar_terminar_tareas":0,
            "dejar_hacer_cosas_placer": 0,
            "sin_energia_para_hacer_nada": 0,
            "abuso_alcohol_drogas_2": 0,
            "pensamientos_planes_autolesion_suicidio_2": 0,
            "intento_suicidio": 0,
            "ayuda_profesional_depresion": 0,
            "medicacion_depresion": 0,
            "problemas_dormir_descansar_2": 0,
            "cansado_poca_energia_2": 0,
            "cambios_apetito_alimentacion_3": 0,
            "dolores_de_cabeza_musculares_articulares": 0,
            "problemas_digestivos_intestinales": 0,
            "cambios_peso": 0,
            "sensible_al_frio_calor": 0,
            "libido_baja": 0,
            "otros_sintomas_fisicos": 0,
            "sintomas_fisicos_empeoran_depresion": 0
          });
          setAnsiedad({
            "palpitaciones": 0,
            "opresion_pecho_dificultad_respirar": 0,
            "mareos_aturdimiento": 0,
            "nauseas_vomitos": 0,
            "temblores_sacudidas_mano": 0,
            "sudoracion_excesiva": 0,
            "entumecimiento_hormigueo_mano_pie": 0,
            "tension_muscular": 0,
            "dolor_cabeza": 0,
            "fatiga_cansancio": 0,
            "problemas_dormir_descansar_1": 0,
            "irritabilidad": 0,
            "dificultad_concentrarse_pensar": 0,
            "inquietud_agitacion": 0,
            "miedo_perder_control_volverse_loco": 0,
            "preocupacion_excesiva": 0,
            "pensamientos_negativos_intrusivos_1": 0,
            "dificultad_imaginar_futuro_sin_preocupaciones": 0,
            "incapacidad_controlar_pensamientos": 0,
            "pesimismo_sobre_futuro": 0,
            "estado_alerta_constante": 0,
            "sensacion_mundo_acabarse": 0,
            "miedo_morir": 0,
            "miedo_enfermedad_muerte": 0,
            "miedo_perder_control_volverse_loco_2": 0,
            "evitar_situaciones_lugares_miedo_ansiedad": 0,
            "dejar_hacer_cosas_gustaban_miedo_ansiedad": 0,
            "incapacidad_relajarse": 0,
            "necesidad_tener_todo_bajo_control": 0,
            "dificultad_estar_presente_momento_actual": 0,
            "aislamiento_de_otros_miedo_ansiedad": 0,
            "buscar_informacion_ansiedad_estres": 0,
            "conductas_repetitivas_aliviar_ansiedad": 0,
            "abuso_alcohol_drogas_aliviar_ansiedad": 0,
            "pensamientos_planes_autolesion_suicidio_3": 0,
            "ansiedad_interfiere_trabajo_estudios": 0,
            "ansiedad_interfiere_relaciones_sociales": 0,
            "ansiedad_interfiere_vida_familiar": 0,
            "ansiedad_impide_disfrutar_actividades_gustan": 0,
            "ansiedad_genera_malestar_significativo": 0,
            "buscar_ayuda_medica_ansiedad": 0,
            "tomar_medicamentos_ansiedad": 0,
            "realizar_terapia_ansiedad": 0,
            "hospitalizacion_por_ansiedad": 0,
            "ansiedad_controla_vida": 0
          });
          setEstres({
            "ansioso_nervioso": 0,
            "irritable_mal_humor": 0,
            "abrumado_exceso_trabajo": 0,
            "impaciente_intolerante": 0,
            "triste_deprimido": 0,
            "culpable_avergonzado": 0,
            "inseguro_baja_autoestima": 0,
            "pesimista_desesperanzado": 0,
            "sin_control_vida": 0,
            "fallar_en_todo": 0,
            "miedo_perder_control_volverse_loco_2": 0,
            "pensamientos_muerte_suicidio": 0,
            "concentracion_pensar_claridad": 0,
            "problemas_tomar_decisiones": 0,
            "olvidadizo_despistado": 0,
            "problemas_dormir_descansar_2": 0,
            "cambios_apetito_alimentacion": 0,
            "cansancio_poca_energia": 0,
            "desmotivado_apatico": 0,
            "incapaz_disfrutar_cosas_gustaban": 0,
            "palpitaciones_corazon": 0,
            "opresion_pecho_dificultad_respirar": 0,
            "mareos_aturdimiento": 0,
            "nauseas_vomitos": 0,
            "temblores_sacudidas_mano": 0,
            "sudoracion_excesiva": 0,
            "entumecimiento_hormigueo_mano_pie": 0,
            "tension_muscular": 0,
            "dolor_cabeza": 0,
            "fatiga_cansancio": 0,
            "problemas_dormir_descansar_3": 0,
            "irritabilidad_2": 0,
            "cambios_apetito_alimentacion_2": 0,
            "dolores_cabeza_musculares_articulares": 0,
            "problemas_digestivos_intestinales": 0,
            "dificultad_concentrarte_realizar_tareas": 0,
            "evitar_situaciones_lugares_miedo_ansiedad_2": 0,
            "dejar_hacer_cosas_gustaban_miedo_ansiedad_2": 0,
            "aislamiento_de_otros": 0,
            "abuso_alcohol_drogas_2": 0,
            "fumas": 0,
            "mala_alimentacion": 0,
            "poco_ejercicio_fisico": 0,
            "duermes_poco_mal": 0,
            "dificultades_manejar_tiempo": 0
          });
          setGeneral({
            "feliz_contenido": 0,
            "triste_deprimido": 0,
            "irritable_mal_humor": 0,
            "ansioso_preocupado": 0,
            "pensamientos_negativos": 0,
            "energia_vitalidad": 0,
            "cansado_fatigado": 0,
            "problemas_dormir_descansar": 0,
            "cambios_apetito_alimentacion": 0,
            "dificultad_concentracion": 0,
            "conectado_familia_amigos": 0,
            "aislado_solo": 0,
            "problemas_relaciones_sociales": 0,
            "comodo_situaciones_sociales": 0,
            "expresion_emociones_necesidades": 0,
            "confianza_en_otros": 0,
            "culpa_avergonzado": 0,
            "a_gusto_consigomismo": 0,
            "manejo_del_estres": 0,
            "pensamientos_autolesion_suicidio": 0,
            "capaz_realizar_actividades_cotidianas": 0,
            "problemas_trabajo_escuela": 0,
            "capaz_cuidarse": 0,
            "problemas_decisiones": 0,
            "optimista_sobre_futuro": 0,
            "hobbies_intereses": 0,
            "motivado_hacer_cosas_que_gustan": 0,
            "satisfecho_vida_general": 0,
            "capaz_disfrutar_vida": 0,
            "vida_significativa": 0,
            "alimentacion_saludable": 0,
            "ejercicio_fisico_regular": 0,
            "suficiente_sueno": 0,
            "consumo_excesivo_alcohol_drogas": 0,
            "fumador": 0,
            "tecnicas_relajacion_meditacion": 0,
            "red_apoyo_social": 0,
            "seguridad_entorno": 0,
            "acceso_atencion_medica_salud_mental": 0,
            "comodidad_buscar_ayuda": 0,
            "nervioso_ansioso": 0,
            "controlar_preocupacion": 0,
            "preocupado_demasiado": 0,
            "problemas_relajacion": 0,
            "inquietud_fisica": 0,
            "irritabilidad_facil": 0,
            "miedo_terrible": 0,
            "tristeza_reciente": 0,
            "desanimo_futuro": 0,
            "sentimiento_fracaso": 0,
            "insatisfaccion_actividades": 0,
            "sentimiento_culpa": 0,
            "miedo_castigo": 0,
            "decepcion_personal": 0,
            "autocrítica": 0,
            "pensamientos_autolesion": 0,
            "llanto_habitual": 0,
            "aumento_irritabilidad": 0,
            "perdida_interes_social": 0,
            "dificultad_decisiones": 0,
            "preocupacion_apariencia": 0,
            "dificultad_iniciar_actividades": 0,
            "problemas_dormir": 0,
            "fatiga_acumulada": 0,
            "disminucion_apetito": 0,
            "perdida_peso_sin_dieta": 0,
            "preocupacion_problemas_salud": 0,
            "disminucion_interes_sexual": 0,
            "molestia_por_eventos_inesperados": 0,
            "dificultad_controlar_vida": 0,
            "estres_nerviosismo": 0,
            "dificultad_manejo_problemas": 0,
            "dificultad_afrontar_cambios": 0,
            "dificultad_enfrentar_responsabilidades": 0,
            "irritacion_fuera_de_control": 0,
            "sentimiento_inferioridad": 0,
            "enojo_por_falta_de_control": 0,
            "dificultad_sobrellevar_problemas": 0,
            "perdida_ser_querido": false,
            "consumo_sustancias": false,
            "problemas_concentracion": "No",
            "frecuencia_revisar_telefono": "Menos de 10 veces",
            "tiempo_redes_sociales": "Menos de 1 hora",
            "tipo_contenido_consumido": "Noticias y artículos",
            "frecuencia_compras_online": "Nunca",
            "genero_musical_preferido": "Reggaetón",
            "hora_fin_uso_telefono": "Antes de las 10pm"
          });
          setFilerepose(null);
          setFileActive(null);
          setCitaAgend(null);
          // nos dirigimos a la historia clinica
          navigate('/ModulsMedic/Date_Medic/MakeHistory')
          
        }else{
  
          // llamamos los servicios correspondientes para cada uno de los tests y si tienen una creación previa la colocamos para cargar sus datos
          loadPreviousTests(DataUser);
  
        }

    }

  }

  const createAnstecedentes=async(DataUser)=>{

    let result = undefined;
    setPreloader(true);
    let body = {
      "antecedentes_familiares":"",
      "antecedentes_medicos":"",
      "historial_educativo":"",
      "historial_laboral":"",
      "user_id":DataUser?.id
    }
    result = await crearAntescedentes(body,token).catch((error)=>{
      console.log(error);
      setPreloader(false);
      Swal.fire({
        icon: 'info',
        title: 'Problemas al crear antescedentes'
      })
    })
    if(result){
      console.log("CREADO ANSTECEDENTES: ",result.data);
      setPreloader(false);
      setBeforeDate(result.data);
      Swal.fire({
        icon: 'success',
        title: 'Antescedentes creados correctamente'
      })

      if(typeDate == "Evaluación inicial"){
        // SETEAMOS LOS TESTS CON VALORES LIMPIOS
        setDepresion({
          "triste_deprimido": 0,
          "perdida_interes_placer": 0,
          "irritable_mal_humor": 0,
          "desesperanzado_pesimista": 0,
          "culpable_inutil": 0,
          "carga_para_otros": 0,
          "pensamientos_muerte_suicidio": 0,
          "cansado_poca_energia": 0,
          "problemas_dormir_descansar": 0,
          "cambios_apetito_alimentacion": 0,
          "incapaz_concentrarse_pensar": 0,
          "camara_lenta": 0,
          "problemas_decisiones": 0,
          "olvidadizo_despistado": 0,
          "nada_ofrecer_al_mundo": 0,
          "vida_sin_sentido": 0,
          "pensamientos_negativos_intrusivos_2": 0,
          "futuro_mejor": 0,
          "fallar_en_todo": 0,
          "nadie_te_quiera_o_entienda": 0,
          "desmotivado_apatico": 0,
          "evitar_actividades_sociales": 0,
          "incapaz_disfrutar_cosas_gustaban": 0,
          "descuidado_higiene_personal": 0,
          "cambios_apetito_alimentacion_2": 0,
          "inquieto_agitado_2": 0,
          "lento_perezoso": 0,
          "iniciar_terminar_tareas":0,
          "dejar_hacer_cosas_placer": 0,
          "sin_energia_para_hacer_nada": 0,
          "abuso_alcohol_drogas_2": 0,
          "pensamientos_planes_autolesion_suicidio_2": 0,
          "intento_suicidio": 0,
          "ayuda_profesional_depresion": 0,
          "medicacion_depresion": 0,
          "problemas_dormir_descansar_2": 0,
          "cansado_poca_energia_2": 0,
          "cambios_apetito_alimentacion_3": 0,
          "dolores_de_cabeza_musculares_articulares": 0,
          "problemas_digestivos_intestinales": 0,
          "cambios_peso": 0,
          "sensible_al_frio_calor": 0,
          "libido_baja": 0,
          "otros_sintomas_fisicos": 0,
          "sintomas_fisicos_empeoran_depresion": 0
        });
        setAnsiedad({
          "palpitaciones": 0,
          "opresion_pecho_dificultad_respirar": 0,
          "mareos_aturdimiento": 0,
          "nauseas_vomitos": 0,
          "temblores_sacudidas_mano": 0,
          "sudoracion_excesiva": 0,
          "entumecimiento_hormigueo_mano_pie": 0,
          "tension_muscular": 0,
          "dolor_cabeza": 0,
          "fatiga_cansancio": 0,
          "problemas_dormir_descansar_1": 0,
          "irritabilidad": 0,
          "dificultad_concentrarse_pensar": 0,
          "inquietud_agitacion": 0,
          "miedo_perder_control_volverse_loco": 0,
          "preocupacion_excesiva": 0,
          "pensamientos_negativos_intrusivos_1": 0,
          "dificultad_imaginar_futuro_sin_preocupaciones": 0,
          "incapacidad_controlar_pensamientos": 0,
          "pesimismo_sobre_futuro": 0,
          "estado_alerta_constante": 0,
          "sensacion_mundo_acabarse": 0,
          "miedo_morir": 0,
          "miedo_enfermedad_muerte": 0,
          "miedo_perder_control_volverse_loco_2": 0,
          "evitar_situaciones_lugares_miedo_ansiedad": 0,
          "dejar_hacer_cosas_gustaban_miedo_ansiedad": 0,
          "incapacidad_relajarse": 0,
          "necesidad_tener_todo_bajo_control": 0,
          "dificultad_estar_presente_momento_actual": 0,
          "aislamiento_de_otros_miedo_ansiedad": 0,
          "buscar_informacion_ansiedad_estres": 0,
          "conductas_repetitivas_aliviar_ansiedad": 0,
          "abuso_alcohol_drogas_aliviar_ansiedad": 0,
          "pensamientos_planes_autolesion_suicidio_3": 0,
          "ansiedad_interfiere_trabajo_estudios": 0,
          "ansiedad_interfiere_relaciones_sociales": 0,
          "ansiedad_interfiere_vida_familiar": 0,
          "ansiedad_impide_disfrutar_actividades_gustan": 0,
          "ansiedad_genera_malestar_significativo": 0,
          "buscar_ayuda_medica_ansiedad": 0,
          "tomar_medicamentos_ansiedad": 0,
          "realizar_terapia_ansiedad": 0,
          "hospitalizacion_por_ansiedad": 0,
          "ansiedad_controla_vida": 0
        });
        setEstres({
          "ansioso_nervioso": 0,
          "irritable_mal_humor": 0,
          "abrumado_exceso_trabajo": 0,
          "impaciente_intolerante": 0,
          "triste_deprimido": 0,
          "culpable_avergonzado": 0,
          "inseguro_baja_autoestima": 0,
          "pesimista_desesperanzado": 0,
          "sin_control_vida": 0,
          "fallar_en_todo": 0,
          "miedo_perder_control_volverse_loco_2": 0,
          "pensamientos_muerte_suicidio": 0,
          "concentracion_pensar_claridad": 0,
          "problemas_tomar_decisiones": 0,
          "olvidadizo_despistado": 0,
          "problemas_dormir_descansar_2": 0,
          "cambios_apetito_alimentacion": 0,
          "cansancio_poca_energia": 0,
          "desmotivado_apatico": 0,
          "incapaz_disfrutar_cosas_gustaban": 0,
          "palpitaciones_corazon": 0,
          "opresion_pecho_dificultad_respirar": 0,
          "mareos_aturdimiento": 0,
          "nauseas_vomitos": 0,
          "temblores_sacudidas_mano": 0,
          "sudoracion_excesiva": 0,
          "entumecimiento_hormigueo_mano_pie": 0,
          "tension_muscular": 0,
          "dolor_cabeza": 0,
          "fatiga_cansancio": 0,
          "problemas_dormir_descansar_3": 0,
          "irritabilidad_2": 0,
          "cambios_apetito_alimentacion_2": 0,
          "dolores_cabeza_musculares_articulares": 0,
          "problemas_digestivos_intestinales": 0,
          "dificultad_concentrarte_realizar_tareas": 0,
          "evitar_situaciones_lugares_miedo_ansiedad_2": 0,
          "dejar_hacer_cosas_gustaban_miedo_ansiedad_2": 0,
          "aislamiento_de_otros": 0,
          "abuso_alcohol_drogas_2": 0,
          "fumas": 0,
          "mala_alimentacion": 0,
          "poco_ejercicio_fisico": 0,
          "duermes_poco_mal": 0,
          "dificultades_manejar_tiempo": 0
        });
        setGeneral({
          "feliz_contenido": 0,
          "triste_deprimido": 0,
          "irritable_mal_humor": 0,
          "ansioso_preocupado": 0,
          "pensamientos_negativos": 0,
          "energia_vitalidad": 0,
          "cansado_fatigado": 0,
          "problemas_dormir_descansar": 0,
          "cambios_apetito_alimentacion": 0,
          "dificultad_concentracion": 0,
          "conectado_familia_amigos": 0,
          "aislado_solo": 0,
          "problemas_relaciones_sociales": 0,
          "comodo_situaciones_sociales": 0,
          "expresion_emociones_necesidades": 0,
          "confianza_en_otros": 0,
          "culpa_avergonzado": 0,
          "a_gusto_consigomismo": 0,
          "manejo_del_estres": 0,
          "pensamientos_autolesion_suicidio": 0,
          "capaz_realizar_actividades_cotidianas": 0,
          "problemas_trabajo_escuela": 0,
          "capaz_cuidarse": 0,
          "problemas_decisiones": 0,
          "optimista_sobre_futuro": 0,
          "hobbies_intereses": 0,
          "motivado_hacer_cosas_que_gustan": 0,
          "satisfecho_vida_general": 0,
          "capaz_disfrutar_vida": 0,
          "vida_significativa": 0,
          "alimentacion_saludable": 0,
          "ejercicio_fisico_regular": 0,
          "suficiente_sueno": 0,
          "consumo_excesivo_alcohol_drogas": 0,
          "fumador": 0,
          "tecnicas_relajacion_meditacion": 0,
          "red_apoyo_social": 0,
          "seguridad_entorno": 0,
          "acceso_atencion_medica_salud_mental": 0,
          "comodidad_buscar_ayuda": 0
        });
        setFileActive(null);
        setFilerepose(null);
        // nos dirigimos a la historia clinica
        navigate('/ModulsMedic/Date_Medic/MakeHistory')

      }else{

        // llamamos los servicios correspondientes para cada uno de los tests y si tienen una creación previa la coloco
        loadPreviousTests(DataUser)

      }
    }

  }

  const loadPreviousTests=async(DataUser)=>{

    // CARGAMOS LOS DATOS PREVIOS DE LOS TESTS
    // TEST GENERAL
    let result_general =  undefined;
    setPreloader(true);
    result_general =  await obtenerTestGeneral(dniDateUser,token).catch((error)=>{
      console.log(error);
      setPreloader(false);
      Swal.fire({
        icon: 'info',
        title: 'Error al obtener general'
      })
    })
    if(result_general){
      console.log("GENERAL: ",result_general.data);
      setPreloader(false);
      
      if(Object.keys(result_general.data).length === 0){
        setGeneral({
          "feliz_contenido": 0,
          "triste_deprimido": 0,
          "irritable_mal_humor": 0,
          "ansioso_preocupado": 0,
          "pensamientos_negativos": 0,
          "energia_vitalidad": 0,
          "cansado_fatigado": 0,
          "problemas_dormir_descansar": 0,
          "cambios_apetito_alimentacion": 0,
          "dificultad_concentracion": 0,
          "conectado_familia_amigos": 0,
          "aislado_solo": 0,
          "problemas_relaciones_sociales": 0,
          "comodo_situaciones_sociales": 0,
          "expresion_emociones_necesidades": 0,
          "confianza_en_otros": 0,
          "culpa_avergonzado": 0,
          "a_gusto_consigomismo": 0,
          "manejo_del_estres": 0,
          "pensamientos_autolesion_suicidio": 0,
          "capaz_realizar_actividades_cotidianas": 0,
          "problemas_trabajo_escuela": 0,
          "capaz_cuidarse": 0,
          "problemas_decisiones": 0,
          "optimista_sobre_futuro": 0,
          "hobbies_intereses": 0,
          "motivado_hacer_cosas_que_gustan": 0,
          "satisfecho_vida_general": 0,
          "capaz_disfrutar_vida": 0,
          "vida_significativa": 0,
          "alimentacion_saludable": 0,
          "ejercicio_fisico_regular": 0,
          "suficiente_sueno": 0,
          "consumo_excesivo_alcohol_drogas": 0,
          "fumador": 0,
          "tecnicas_relajacion_meditacion": 0,
          "red_apoyo_social": 0,
          "seguridad_entorno": 0,
          "acceso_atencion_medica_salud_mental": 0,
          "comodidad_buscar_ayuda": 0,
          "nervioso_ansioso": 0,
          "controlar_preocupacion": 0,
          "preocupado_demasiado": 0,
          "problemas_relajacion": 0,
          "inquietud_fisica": 0,
          "irritabilidad_facil": 0,
          "miedo_terrible": 0,
          "tristeza_reciente": 0,
          "desanimo_futuro": 0,
          "sentimiento_fracaso": 0,
          "insatisfaccion_actividades": 0,
          "sentimiento_culpa": 0,
          "miedo_castigo": 0,
          "decepcion_personal": 0,
          "autocrítica": 0,
          "pensamientos_autolesion": 0,
          "llanto_habitual": 0,
          "aumento_irritabilidad": 0,
          "perdida_interes_social": 0,
          "dificultad_decisiones": 0,
          "preocupacion_apariencia": 0,
          "dificultad_iniciar_actividades": 0,
          "problemas_dormir": 0,
          "fatiga_acumulada": 0,
          "disminucion_apetito": 0,
          "perdida_peso_sin_dieta": 0,
          "preocupacion_problemas_salud": 0,
          "disminucion_interes_sexual": 0,
          "molestia_por_eventos_inesperados": 0,
          "dificultad_controlar_vida": 0,
          "estres_nerviosismo": 0,
          "dificultad_manejo_problemas": 0,
          "dificultad_afrontar_cambios": 0,
          "dificultad_enfrentar_responsabilidades": 0,
          "irritacion_fuera_de_control": 0,
          "sentimiento_inferioridad": 0,
          "enojo_por_falta_de_control": 0,
          "dificultad_sobrellevar_problemas": 0,
          "perdida_ser_querido": false,
          "consumo_sustancias": false,
          "problemas_concentracion": "No",
          "frecuencia_revisar_telefono": "Menos de 10 veces",
          "tiempo_redes_sociales": "Menos de 1 hora",
          "tipo_contenido_consumido": "Noticias y artículos",
          "frecuencia_compras_online": "Nunca",
          "genero_musical_preferido": "Reggaetón",
          "hora_fin_uso_telefono": "Antes de las 10pm"
        });
      }else{
        setGeneral(result_general.data);
      }
      
      //TEST ANSIEDAD
      let result_ansiedad =  undefined;
      setPreloader(true);
      result_ansiedad =  await obtenerTestAnsiedad(dniDateUser,token).catch((error)=>{
        console.log(error);
        setPreloader(false);
        Swal.fire({
          icon: 'info',
          title: 'Error al obtener ansiedad'
        })
      })
      if(result_ansiedad){
        console.log("ANSIEDAD: ",result_ansiedad.data);
        if(Object.keys(result_ansiedad.data).length === 0){
          setAnsiedad({
            "palpitaciones": 0,
            "opresion_pecho_dificultad_respirar": 0,
            "mareos_aturdimiento": 0,
            "nauseas_vomitos": 0,
            "temblores_sacudidas_mano": 0,
            "sudoracion_excesiva": 0,
            "entumecimiento_hormigueo_mano_pie": 0,
            "tension_muscular": 0,
            "dolor_cabeza": 0,
            "fatiga_cansancio": 0,
            "problemas_dormir_descansar_1": 0,
            "irritabilidad": 0,
            "dificultad_concentrarse_pensar": 0,
            "inquietud_agitacion": 0,
            "miedo_perder_control_volverse_loco": 0,
            "preocupacion_excesiva": 0,
            "pensamientos_negativos_intrusivos_1": 0,
            "dificultad_imaginar_futuro_sin_preocupaciones": 0,
            "incapacidad_controlar_pensamientos": 0,
            "pesimismo_sobre_futuro": 0,
            "estado_alerta_constante": 0,
            "sensacion_mundo_acabarse": 0,
            "miedo_morir": 0,
            "miedo_enfermedad_muerte": 0,
            "miedo_perder_control_volverse_loco_2": 0,
            "evitar_situaciones_lugares_miedo_ansiedad": 0,
            "dejar_hacer_cosas_gustaban_miedo_ansiedad": 0,
            "incapacidad_relajarse": 0,
            "necesidad_tener_todo_bajo_control": 0,
            "dificultad_estar_presente_momento_actual": 0,
            "aislamiento_de_otros_miedo_ansiedad": 0,
            "buscar_informacion_ansiedad_estres": 0,
            "conductas_repetitivas_aliviar_ansiedad": 0,
            "abuso_alcohol_drogas_aliviar_ansiedad": 0,
            "pensamientos_planes_autolesion_suicidio_3": 0,
            "ansiedad_interfiere_trabajo_estudios": 0,
            "ansiedad_interfiere_relaciones_sociales": 0,
            "ansiedad_interfiere_vida_familiar": 0,
            "ansiedad_impide_disfrutar_actividades_gustan": 0,
            "ansiedad_genera_malestar_significativo": 0,
            "buscar_ayuda_medica_ansiedad": 0,
            "tomar_medicamentos_ansiedad": 0,
            "realizar_terapia_ansiedad": 0,
            "hospitalizacion_por_ansiedad": 0,
            "ansiedad_controla_vida": 0
          });
        }else{
          setAnsiedad(result_ansiedad.data);
        }
        setPreloader(false);
        
        //TEST Depresion
        let result_depresion =  undefined;
        setPreloader(true);
        result_depresion =  await obtenerTestDepresion(dniDateUser,token).catch((error)=>{
          console.log(error);
          setPreloader(false);
          Swal.fire({
            icon: 'info',
            title: 'Error al obtener ansiedad'
          })
        })
        if(result_depresion){
          console.log("DEPRESION: ",result_depresion.data);
          setPreloader(false);
          if(Object.keys(result_depresion.data).length === 0){
            setDepresion({
              "triste_deprimido": 0,
              "perdida_interes_placer": 0,
              "irritable_mal_humor": 0,
              "desesperanzado_pesimista": 0,
              "culpable_inutil": 0,
              "carga_para_otros": 0,
              "pensamientos_muerte_suicidio": 0,
              "cansado_poca_energia": 0,
              "problemas_dormir_descansar": 0,
              "cambios_apetito_alimentacion": 0,
              "incapaz_concentrarse_pensar": 0,
              "camara_lenta": 0,
              "problemas_decisiones": 0,
              "olvidadizo_despistado": 0,
              "nada_ofrecer_al_mundo": 0,
              "vida_sin_sentido": 0,
              "pensamientos_negativos_intrusivos_2": 0,
              "futuro_mejor": 0,
              "fallar_en_todo": 0,
              "nadie_te_quiera_o_entienda": 0,
              "desmotivado_apatico": 0,
              "evitar_actividades_sociales": 0,
              "incapaz_disfrutar_cosas_gustaban": 0,
              "descuidado_higiene_personal": 0,
              "cambios_apetito_alimentacion_2": 0,
              "inquieto_agitado_2": 0,
              "lento_perezoso": 0,
              "iniciar_terminar_tareas":0,
              "dejar_hacer_cosas_placer": 0,
              "sin_energia_para_hacer_nada": 0,
              "abuso_alcohol_drogas_2": 0,
              "pensamientos_planes_autolesion_suicidio_2": 0,
              "intento_suicidio": 0,
              "ayuda_profesional_depresion": 0,
              "medicacion_depresion": 0,
              "problemas_dormir_descansar_2": 0,
              "cansado_poca_energia_2": 0,
              "cambios_apetito_alimentacion_3": 0,
              "dolores_de_cabeza_musculares_articulares": 0,
              "problemas_digestivos_intestinales": 0,
              "cambios_peso": 0,
              "sensible_al_frio_calor": 0,
              "libido_baja": 0,
              "otros_sintomas_fisicos": 0,
              "sintomas_fisicos_empeoran_depresion": 0
            });
          }else{
            setDepresion(result_depresion.data);
          }
          
          //TEST Estres
          let result_estres =  undefined;
          setPreloader(true);
          result_estres =  await obtenerTestEstres(dniDateUser,token).catch((error)=>{
            console.log(error);
            setPreloader(false);
            Swal.fire({
              icon: 'info',
              title: 'Error al obtener ansiedad'
            })
          })
          if(result_estres){
            console.log("ESTRES: ",result_estres.data);
            setPreloader(false);
            if(Object.keys(result_estres.data).length === 0){
              setEstres({
                "ansioso_nervioso": 0,
                "irritable_mal_humor": 0,
                "abrumado_exceso_trabajo": 0,
                "impaciente_intolerante": 0,
                "triste_deprimido": 0,
                "culpable_avergonzado": 0,
                "inseguro_baja_autoestima": 0,
                "pesimista_desesperanzado": 0,
                "sin_control_vida": 0,
                "fallar_en_todo": 0,
                "miedo_perder_control_volverse_loco_2": 0,
                "pensamientos_muerte_suicidio": 0,
                "concentracion_pensar_claridad": 0,
                "problemas_tomar_decisiones": 0,
                "olvidadizo_despistado": 0,
                "problemas_dormir_descansar_2": 0,
                "cambios_apetito_alimentacion": 0,
                "cansancio_poca_energia": 0,
                "desmotivado_apatico": 0,
                "incapaz_disfrutar_cosas_gustaban": 0,
                "palpitaciones_corazon": 0,
                "opresion_pecho_dificultad_respirar": 0,
                "mareos_aturdimiento": 0,
                "nauseas_vomitos": 0,
                "temblores_sacudidas_mano": 0,
                "sudoracion_excesiva": 0,
                "entumecimiento_hormigueo_mano_pie": 0,
                "tension_muscular": 0,
                "dolor_cabeza": 0,
                "fatiga_cansancio": 0,
                "problemas_dormir_descansar_3": 0,
                "irritabilidad_2": 0,
                "cambios_apetito_alimentacion_2": 0,
                "dolores_cabeza_musculares_articulares": 0,
                "problemas_digestivos_intestinales": 0,
                "dificultad_concentrarte_realizar_tareas": 0,
                "evitar_situaciones_lugares_miedo_ansiedad_2": 0,
                "dejar_hacer_cosas_gustaban_miedo_ansiedad_2": 0,
                "aislamiento_de_otros": 0,
                "abuso_alcohol_drogas_2": 0,
                "fumas": 0,
                "mala_alimentacion": 0,
                "poco_ejercicio_fisico": 0,
                "duermes_poco_mal": 0,
                "dificultades_manejar_tiempo": 0
              });
            }else{
              setEstres(result_estres.data);
            }
            setFilerepose(null);
            setFileActive(null);
            //TEST Estres
            Swal.fire({
              icon: 'success',
              title: 'Todo Cargado correctamente'
            })
            setCitaAgend(null);
            // nos dirigimos a la historia clinica
            navigate('/ModulsMedic/Date_Medic/MakeHistory')
          }
          
        }
      }
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
        <div className='col-12'>
          <h2 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- white font_medium'>Validación de usuario (Nueva cita)</h2>
        </div>
      </div>
      <div className='row mt-4 mb-4'>
        <div className='col-12'>
          <form id='internal-form' action='' className='position-relative'>

            <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                <div className='form-floating inner-addon- left-addon-'>
                  <input onChange={ReadInput} value={dniDateUser} type="text" className='form-control' id='firstName' placeholder="Ingrese su primer nombre" />
                  <label className='fs-5- ff-monse-regular- white font_medium'>C.C</label>
                </div>
              </div>
              <div style={{'position':'relative','top':'8px'}} className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-4 mb-lg-4 mb-xl-4 mb-xxl-4'>
                <div className='form-floating inner-addon- left-addon-'>
                  <Select value={{'value':typeDate,'label':typeDate}} onChange={ReadTypeDate} id='populationGroup' options={PopulationGroup} components={{ ValueContainer: CustomValueContainer, animatedComponents, NoOptionsMessage: customNoOptionsMessage, LoadingMessage: customLoadingMessage }} placeholder="Tipo de cita" styles={selectStyles} isClearable={true}/>
                </div>
              </div>
            </div>
            <div onClick={redirect}  className='ButtonElement'>
                                <span  className='ButtonText'>Validar</span>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
