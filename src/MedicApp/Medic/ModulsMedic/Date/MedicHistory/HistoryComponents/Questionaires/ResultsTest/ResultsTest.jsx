import React from 'react'
import './ResultsTest.css'
import { IoAlertCircleOutline } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";

export default function ResultsTest(props) {
  return (
    <div className='alertContainer'>
        {props.type == "General" ? 
        <>
        {/* {props.result <= 30 ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test General</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Riesgo de problemas de salud mental, se recomienda buscar ayuda profesional para una evaluación completa.
        </p>
        </>
        :
        <>
        {props.result >= 31 && props.result <=45 ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test General</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Salud mental débil, buscar terapia.
        </p>
        </>
        :
        <>
        {props.result >= 46 && props.result <=60 ? 
        <>
        <GrStatusGood color='#d1a207' size={55}></GrStatusGood>
        <span className='orangev2 font_medium text-align'>Test General</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Salud mental adecuada.
        </p>
        </>
        :
        <>
        { props.result > 60 ? 
        <>
        <GrStatusGood color='#d1a207' size={55}></GrStatusGood>
        <span className='orangev2 font_medium text-align'>Test General</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Salud mental extraordinaria.
        </p>
        </>
        :
        <>
        
        </>
        }
        </>
        }
        </>
        }
        </>
        }
         */}
        </>
        :
        <></>
        }

        {props.type == "Ansiedad" ? 
        <>
        {props.result <= 45 ? 
        <>
        <GrStatusGood color='#d1a207' size={55}></GrStatusGood>
        <span className='orangev2 font_medium text-align'>Test de ansiedad</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Sin ansiedad o ansiedad leve.
        </p>
        </>
        :
        <>
        {props.result >= 46 && props.result <=65 ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test de ansiedad</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Ansiedad moderada.
        </p>
        </>
        :
        <>
        {props.result >= 66  ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test de ansiedad</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Con ansiedad.
        </p>
        </>
        :
        <>
        </>
        }
        </>
        }
        </>
        }
        
        </>
        :
        <></>
        }

        {props.type == "Depresion" ? 
        <>
        {props.result <= 45 ? 
        <>
        <GrStatusGood color='#d1a207' size={55}></GrStatusGood>
        <span className='orangev2 font_medium text-align'>Test de depresión</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Sin depresión o depresión leve.
        </p>
        </>
        :
        <>
        {props.result >= 46 && props.result <=65 ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test de depresión</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Depresión moderada.
        </p>
        </>
        :
        <>
        {props.result >= 66  ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test de depresión</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Depresión grave.
        </p>
        </>
        :
        <>
        </>
        }
        </>
        }
        </>
        }
        
        </>
        :
        <></>
        }


        {props.type == "Estres" ? 
        <>
        {props.result <= 45 ? 
        <>
        <GrStatusGood color='#d1a207' size={55}></GrStatusGood>
        <span className='orangev2 font_medium text-align'>Test de estrés</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Sin estrés o estrés leve.
        </p>
        </>
        :
        <>
        {props.result >= 46 && props.result <=65 ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test de estrés</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Estrés moderada.
        </p>
        </>
        :
        <>
        {props.result >= 66  ? 
        <>
        <IoAlertCircleOutline color='#d1a207' size={55}></IoAlertCircleOutline>
        <span className='orangev2 font_medium text-align'>Test de estrés</span>
        <p className='white font_medium text-align' style={{'marginTop':'10px'}}>
        Estrés grave.
        </p>
        </>
        :
        <>
        </>
        }
        </>
        }
        </>
        }
        
        </>
        :
        <></>
        }


        
    </div>
  )
}
