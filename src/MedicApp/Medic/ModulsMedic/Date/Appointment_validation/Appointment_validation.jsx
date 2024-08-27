import React from 'react'
import $ from "jquery"
import 'malihu-custom-scrollbar-plugin';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../../../context';
import Preloader from '../../../../../components/Preloader/Preloader';
import { GetDatesMedic } from '../../../../../Services/MainApp/Medic/dates';
import Swal from 'sweetalert2';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import { obtenerAntescedentes } from '../../../../../Services/MainApp/Medic/MedicHistory/Antecedentes';
import { obtenerTestAnsiedad } from '../../../../../Services/MainApp/Medic/MedicHistory/test_ansiedad';
import { obtenerTestGeneral } from '../../../../../Services/MainApp/Medic/MedicHistory/test_general';
import { obtenerTestDepresion } from '../../../../../Services/MainApp/Medic/MedicHistory/test_depresion';
import { obtenerTestEstres } from '../../../../../Services/MainApp/Medic/MedicHistory/test_estres';
require('jquery-mousewheel');


export default function Appointment_validation() {

    /* navigate */

    const navigate=useNavigate();

    /* APP CONTEXT */
    let {filerepose,setFilerepose,fileActive,setFileActive,userData,token,citaAgend,setCitaAgend,typeDate,setTypeDate,dniDateUser,setDniDateUser,userDateData,setUserDateData,beforeDate,setBeforeDate,depresion,setDepresion,ansiedad,setAnsiedad,estres,setEstres,general,setGeneral,setFlagHistory} = React.useContext(AppContext);

    /* useState */

    let [preloader,setPreloader] = React.useState(false);
    let [dates,setDates] = React.useState([
        // {
        //     "id": 1,
        //     "hora_inicio": "2023-12-01T12:15:00-05:00",
        //     "hora_finalizacion": null,
        //     "es_completada": false,
        //     "cita_id": {
        //         "id": 1,
        //         "observaciones": "Observaciones de la cita 2",
        //         "fecha_realizacion_consulta": "2024-03-17T10:00:00-05:00",
        //         "fecha_siguiente_consulta": "2024-04-17T10:00:00-05:00",
        //         "documento": "Documento de la cita",
        //         "calificacion_examen": 9.5,
        //         "user_id": {
        //             "id": "60279df3-a039-4c3a-a6f8-70f03a41f79c",
        //             "id_ubicacion": null,
        //             "tipo_identificacion": "CC",
        //             "identificacion": "12345",
        //             "email": "estivenvalenciacastrillon@gmail.com",
        //             "primer_nombre": "estiven",
        //             "segundo_nombre": "sebas",
        //             "primer_apellido": "paciente",
        //             "segundo_apellido": "castrillon",
        //             "fecha_nacimiento": "2023-04-04",
        //             "genero": "Masculino",
        //             "ocupacion": "Ingeniero",
        //             "direccion": "Cra 9c #50 41",
        //             "departamento": "Caldas",
        //             "ciudad_residencia": "Manizales",
        //             "barrio": "Comuneros",
        //             "numero_celular": "3137844779",
        //             "eps": "Salud total",
        //             "tipo_regimen": "Contributivo 2",
        //             "aseguradora": "Sura",
        //             "es_paciente": false,
        //             "es_doctor": false,
        //             "es_admin": false,
        //             "es_superusuario": false
        //         },
        //         "doctor_id": "f53db8d2-5674-487f-969b-2b0bb45433ab"
        //     },
        //     "doctor_id": "f53db8d2-5674-487f-969b-2b0bb45433ab"
        // }
    ]);

    const GetAge=(dateString)=>{
    /* 
    Función para obtener la edad segun la fecha
    de nacimiento.
    */
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(age == 1){
      return '1 año'
    }else{
      return age + ' años'
    }
    }


    /* nextDates */
    React.useEffect(()=>{
      if(token){
        loadDates(userData);
      }else{
        navigate('/Auth/Login');
      }
      
    },[])

    const loadDates=async(data)=>{
      setPreloader(true);
      let result = undefined;
      result = await GetDatesMedic(data.identificacion,token).catch((error)=>{
            console.log(error);
            setPreloader(false);
            Swal.fire({
              icon: 'info',
              title: 'Problemas para cargar las proximas citas'
            })
      })

      if(result){
        // RESULTADOS
        console.log(result.data);
        setPreloader(false);
        setDates(result.data);
      }

    }


    React.useEffect(()=>{
        $('.wrapper-notifications-').mCustomScrollbar({
          theme: "minimal",
          mouseWheel:{
            scrollAmount: 60,
            normalizeDelta: true
          },
          scrollInertia:100,
          mouseWheelPixels: 100
        });
      },[])

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


      const getDate=(selectedDate)=>{

        if(userData?.es_doctor){

          // seteamos la información del usuario
          setTypeDate(selectedDate?.tipo_cita);
          setUserDateData(selectedDate?.cita_id?.user_id);
          setCitaAgend(selectedDate);
          // Llamamos los datos de los diferentes formularios
          if(selectedDate?.tipo_cita == "Evaluación inicial"){
            // SETEAMOS LA INFORMACIÓN DE LOS FORMULARIOS
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
            // nos dirigimos a la historia clinica

            GetUserPass(selectedDate?.cita_id?.user_id,true);
            //navigate('/ModulsMedic/Date_Medic/MakeHistory')

          }else{
            setFilerepose(null);
            setFileActive(null);
            // LLAMAMOS LA INFORMACIÓN NECESARIA DE LOS FORMULARIOS
            GetUserPass(selectedDate?.cita_id?.user_id,false);
          }

        }else{

              Swal.fire({
              icon: 'info',
              title: 'Activa la funcionalidad de médico en el panel de administración para acceder a la cita correspondiente'
              })

          }
        
      }

      const GetUserPass=async(DataUser,flag)=>{

        let result =  undefined;
        setPreloader(true);
        result =  await obtenerAntescedentes(DataUser?.identificacion,token).catch((error)=>{
            console.log(error);
            setPreloader(false);
            // NO PUEDE HABER ERROR POR QUE VIENE DE UN AGENDAMIENTO PREVIO A UNA CITA 
            // YA PASO POR LA CREACIÓN
            Swal.fire({
              icon: 'info',
              title: 'Error al cargar información de la cita'
            })
            
        })
        if(result){
          // GUARDAMOS INFORMACIÓN ANTESCEDENTES
          console.log(result.data);
          setBeforeDate(result.data);
          setPreloader(false);
          
          if(flag){
            // REDIRIGIMOS A LA HISTORIA CLINICA
            setDniDateUser(DataUser?.identificacion);
            Swal.fire({
              icon: 'success',
              title: 'Todo Cargado correctamente'
            })
            navigate('/ModulsMedic/Date_Medic/MakeHistory');
          }else{
            // NOS TRAEMOS LA INFORMACIÓN PREVIA DE LOS CUESTIONARIOS
            loadPreviousTests(DataUser)
          }
          
        }
    
      }

      // Función para cargar test anteriores

      const loadPreviousTests=async(DataUser)=>{

        // CARGAMOS LOS DATOS PREVIOS DE LOS TESTS
        // TEST GENERAL
        let result_general =  undefined;
        setPreloader(true);
        result_general =  await obtenerTestGeneral(DataUser?.identificacion,token).catch((error)=>{
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
          result_ansiedad =  await obtenerTestAnsiedad(DataUser?.identificacion,token).catch((error)=>{
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
            result_depresion =  await obtenerTestDepresion(DataUser?.identificacion,token).catch((error)=>{
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
              result_estres =  await obtenerTestEstres(DataUser?.identificacion,token).catch((error)=>{
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
                //TEST Estres
                Swal.fire({
                  icon: 'success',
                  title: 'Todo Cargado correctamente'
                })
                setDniDateUser(DataUser?.identificacion);
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
        <div id="card-appointment" className='card border-0 rounded-3 w-100 position-relative bs-2-'>
        <div className='card-header border-0 rounded-3'>
          <div className='row'>
            <div className='col-12'>
              <ul className='nav nav-pills d-flex flex-row justify-content-between' role="tablist">
                <li className='nav-item' role="presentation">
                  <button className='nav-link active rounded-0 d-flex flex-row justify-content-center align-items-center align-self-center' id="data-patient-tab" data-bs-toggle="pill" data-bs-target="#scheduling" type="button" role="tab" aria-controls="scheduling" aria-selected="true"> <span className='ff-monse-regular- me-2'>Información usuario</span></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='card-body w-100 pt-0'>
          <div className='tab-content' id='myTabContent'>
            <div className='tab-pane fade show active' id='scheduling' role="tabpanel" aria-labelledby="data-patient-tab" tabIndex="0">
              <div className='row mt-4'>
                <div className='d-flex justify-content-start align-items-start align-self-center position-relative position-relative'>
                  <div className='w-auto'>
                    <p className='lh-sm mb-1 fs-4- ff-monse-regular- fw-normal tx-black-v white font_medium'>{userData?.primer_nombre+' '+userData?.segundo_nombre+' '+userData?.primer_apellido+' '+userData?.segundo_apellido}</p>
                  </div>
                </div>
              </div>
              <div className='row mt-3'>
                <p className='mb-2 fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Ciudad residencia:</strong> <span className='m-0 fs-5- ff-monse-regular- fst-normal tx-black- white'>{userData?.ciudad_residencia}</span></p>
                <p className='mb-2 fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Teléfono:</strong> <span className='m-0 fs-5- ff-monse-regular- fst-normal tx-black- white'>{userData?.numero_celular}</span></p>
                <p className='mb-2 fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Correo:</strong> <span className='m-0 fs-5- ff-monse-regular- fst-normal tx-black- white'>{userData?.email}</span></p>
                <p className='mb-2 fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Edad:</strong> <span className='m-0 fs-5- ff-monse-regular- fst-normal tx-black- white'>{GetAge(userData?.fecha_nacimiento)}</span></p>
                <p className='mb-2 fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Barrio:</strong> <span className='m-0 fs-5- ff-monse-regular- tx-black- white'>{userData?.barrio}</span></p>
                <p className='mb-2 lh-sm fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Dirección:</strong> <span className='m-0 fs-5- ff-monse-regular- fst-normal tx-black- white'>{userData?.direccion}</span></p>
                <p className='mb-2 lh-sm fs-5- ff-monse-regular- tx-black- gray font_medium'><strong>Identificación:</strong> <span className='m-0 fs-5- ff-monse-regular- fst-normal tx-black- white'>{userData?.identificacion}</span></p>
              </div>
              <div className='row'>
                <div className='col-12 bg-white- pt-2 pb-2'>
                  <ul className='nav nav-pills d-flex flex-row justify-content-between' role="tablist">
                    <li className='nav-item' role="presentation">
                      <button className='nav-link active rounded-0 d-flex flex-row justify-content-center align-items-center align-self-center' id="data-patient-tab" data-bs-toggle="pill" data-bs-target="#pills-next-consultation" type="button" role="tab" aria-controls="pills-next-consultation" aria-selected="true"> <span className='ff-monse-regular- me-2'>Proximas consultas</span></button>
                    </li>
                    {/* <li className='nav-item' role="presentation">
                      <button className='nav-link rounded-0 d-flex flex-row justify-content-center align-items-center align-self-center' id="data-patient-tab" data-bs-toggle="pill" data-bs-target="#pills-consultation-history" type="button" role="tab" aria-controls="pills-consultation-history" aria-selected="true"> <span className='ff-monse-regular- me-2'>Historial de consultas</span></button>
                    </li> */}
                  </ul>
                </div>
                
              </div>
              <div className='row'>
                <div className='tab-content' id='myTabContent'>
                  <div className='tab-pane fade show active' id="pills-next-consultation" role="tabpanel" aria-labelledby="next-consultation-tab" tabIndex="0">
                    <div className='row'>
                      <div className='col-12 wrapper-notifications-'>
                        <div className='tab-content' id='myTabContent'>
                          <div className='tab-pane fade show active' id='scheduling' role="tabpanel" aria-labelledby="data-patient-tab" tabIndex="0">
                            <div className='row g-2'>
                              {dates.map((obj,index)=>{
                                return(
                                  <div className='col-12' key={index} >
                                    <div id="card-user-appointment" className='card border-0 rounded-3 w-100'>
                                      <div className='card-body w-100'>
                                        <div className='d-flex flex-row justify-content-between align-items-start align-self-center'>
                                          <div className='d-flex flex-row justify-content-start align-items-start align-self-center'>
                                            <div className='p-2 me-2 rounded-circle bg-burgundy-'></div>
                                            <div className='w-auto' onClick={()=>getDate(obj)}  style={{'cursor':'pointer'}}>
                                              <p className='m-0 lh-sm fs-4- ff-monse-regular- fw-normal tx-black- white font_medium'>{obj?.cita_id?.user_id?.primer_nombre + ' ' + obj?.cita_id?.user_id?.segundo_nombre + ' ' + obj?.cita_id?.user_id?.primer_apellido + ' ' + obj?.cita_id?.user_id?.segundo_apellido}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div onClick={()=>getDate(obj)}  style={{'cursor':'pointer'}} className='d-flex flex-row justify-content-start align-items-start align-self-center ps-4'>
                                          <div className='w-auto'>
                                            <p className='m-0 lh-sm fs-6- ff-monse-regular- tx-black- white'> <span className='fw-bold white font_medium'>Email</span> | <span className='fw-normal'>{obj?.cita_id?.user_id?.email}</span></p>
                                          </div>
                                        </div>
                                        <div onClick={()=>getDate(obj)}  style={{'cursor':'pointer'}} className='d-flex flex-row justify-content-start align-items-start align-self-center ps-4'>
                                          <div className='w-auto'>
                                            <p className='m-0 lh-sm fs-6- ff-monse-regular- tx-black- white'> <span className='fw-bold white font_medium'>Celular</span> | <span className='fw-normal'>{obj?.cita_id?.user_id?.numero_celular}</span></p>
                                          </div>
                                        </div>
                                        <div className='d-grid gap-3 d-flex flex-row justify-content-between align-items-center align-self-center mt-3 ps-4 pe-1'>
                                          <p onClick={()=>getDate(obj)}  style={{'cursor':'pointer'}} className='m-0 me-2 lh-sm fs-6- ff-monse-regular- tx-black- white'> <span className='fw-normal'>{GetDataHour(obj?.hora_inicio)[0]}</span> / <span className='fw-normal '>{GetDataHour(obj?.hora_inicio)[1]}</span></p>
                                          <a className='btn bg-transparent btn-transparent- p-0' data-bs-toggle="collapse" href={"#collapseExample"+index} role="button" aria-expanded="false" aria-controls={"collapseExample"+index}>
                                          <p className='p-0 m-0 lh-sm fs-6- ff-monse-regular- tx-neutral-purple- white'>Detalles</p>
                                          </a>
                                        </div>
                                        <div className='collapse' id={"collapseExample"+index}>
                                          <div className='card card-body border-0 bg-transparent p-2 ps-4 pe-1 white'>
                                            <div className='w-100 d-flex flex-row justify-content-between align-items-center align-self-center'>
                                              <div className='w-auto d-flex flex-row justify-content-start align-items-center align-self-center'>
                                                <p className='m-0 lh-sm fs-6- ff-monse-regular- fw-bold tx-black- me-1'><i className='fa icon-id-number d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none'></i> <span className='d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block gray font_medium'>Identificación</span></p>
                                              </div>
                                              <p className='m-0 lh-sm fs-6- ff-monse-regular- fw-bold tx-black- white font_medium'>{obj?.cita_id?.user_id?.identificacion}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  {/* <div className='tab-pane fade' id="pills-consultation-history" role="tabpanel" aria-labelledby="consultation-history-tab" tabIndex="0">
                    <div className='row'>
                      <div className='col-12 wrapper-notifications-'>
                        <div className='tab-content' id='myTabContent'>
                          <div className='tab-pane fade show active' id='scheduling' role="tabpanel" aria-labelledby="data-patient-tab" tabIndex="0">
                            <div className='row g-2'>
                            <div className='col-12'>
                                <div id="card-user-appointment" className='card border-0 rounded-3 w-100'>
                                  <div className='card-body w-100'>
                                    <div className='d-flex flex-row justify-content-between align-items-start align-self-center'>
                                      <div className='d-flex flex-row justify-content-start align-items-start align-self-center'>
                                        <div className='p-2 me-2 rounded-circle bg-burgundy-'></div>
                                        <div className='w-auto'>
                                          <p className='m-0 lh-sm fs-4- ff-monse-regular- fw-normal tx-black- white font_medium'>Carmen Ligia Jaramillo Posada</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='d-flex flex-row justify-content-start align-items-start align-self-center ps-4'>
                                      <div className='w-auto'>
                                        <p className='m-0 lh-sm fs-6- ff-monse-regular- tx-black- white'> <span className='fw-bold white font_medium'>Manizales</span> | <span className='fw-normal'>Calle 98 #35-37 la enea edificio condado de la cruz apt 604 frente a fresby de la 98</span></p>
                                      </div>
                                    </div>
                                    <div className='d-grid gap-3 d-flex flex-row justify-content-between align-items-center align-self-center mt-3 ps-4 pe-1'>
                                      <p className='m-0 me-2 lh-sm fs-6- ff-monse-regular- tx-black- white'> <span className='fw-normal'>28 JUL 2022</span> / <span className='fw-normal '> 7:00 AM </span></p>
                                      <a className='btn bg-transparent btn-transparent- p-0' data-bs-toggle="collapse" href="#collapseExampleOne" role="button" aria-expanded="false" aria-controls="collapseExampleOne">
                                      <p className='p-0 m-0 lh-sm fs-6- ff-monse-regular- tx-neutral-purple- white'>Detalles</p>
                                      </a>
                                    </div>
                                    <div className='collapse' id="collapseExampleOne">
                                      <div className='card card-body border-0 bg-transparent p-2 ps-4 pe-1 white'>
                                        <div className='w-100 d-flex flex-row justify-content-between align-items-center align-self-center'>
                                          <div className='w-auto d-flex flex-row justify-content-start align-items-center align-self-center'>
                                            <p className='m-0 lh-sm fs-6- ff-monse-regular- fw-bold tx-black- me-1'><i className='fa icon-id-number d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none'></i> <span className='d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block gray font_medium'>Costo</span></p>
                                          </div>
                                          <p className='m-0 lh-sm fs-6- ff-monse-regular- fw-bold tx-black- white font_medium'>$199.999</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
