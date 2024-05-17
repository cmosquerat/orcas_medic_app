import React, { useEffect } from 'react';
import './Date.css'
import { Navigate, Route, Routes } from "react-router-dom"
import $ from 'jquery';
import Validation from './Validation/Validation';
import MedicHistory from './MedicHistory/MedicHistory';
import FinishProcess from './FinishProcess/FinishProcess';
import Appointment from './Appointment/Appointment';
import Appointment_validation from './Appointment_validation/Appointment_validation';
import MedicHistory_2 from './MedicHistory_2/MedicHistory_2';
import MedicHistory_3 from './MedicHistory_3/MedicHistory_3';
import MedicHistory_4 from './MedicHistory_4/MedicHistory_4';
import MedicHistory_5 from './MedicHistory_5/MedicHistory_5';

export default function Date_Medic() {

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const dayOfMonth = date.getDate();
      const monthOfYear = monthsOfYear[date.getMonth()];
      const year = date.getFullYear();
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const second = date.getSeconds().toString().padStart(2, '0');
      const time = hour + ":" + minute + ":" + second;

      $('.dayOfWeek').text(dayOfWeek);
      $('.dayOfMonth').text(dayOfMonth);
      $('.monthOfYear').text(monthOfYear);
      $('.year').text(year);
      $('.hour').text(time);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className='container-fluid overflow-x-hidden'>
      <div className='row'>
        <div className='col-12'>
          <h2 className='m-0 p-0 lh-sm fs-3- ff-monse-regular- fw-bold tx-dark-purple- white font_medium'>Cita médica</h2>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-12'>
          <div className='white font_medium d-flex flex-row justify-content-start align-items-center align-self-center'>
            &nbsp;
            <p className='m-0 p-0 lh-1 fs-5- ff-monse-regular- tx-black- dayOfWeek'></p>
            &nbsp;
            <p className='m-0 p-0 lh-1 fs-5- ff-monse-regular- tx-black- dayOfMonth'></p>
            &nbsp;
            <p className='m-0 p-0 lh-1 fs-5- ff-monse-regular- tx-black- monthOfYear'></p>
            &nbsp;
            <p className='m-0 p-0 lh-1 fs-5- ff-monse-regular- tx-black- year'></p>
            &nbsp;
            <p className='m-0 p-0 lh-1 fs-5- ff-monse-regular- tx-black-'>/</p>
            &nbsp;
            <p className='m-0 p-0 lh-1 fs-5- ff-monse-regular- tx-black- hour'></p>
          </div>
        </div>
      </div>

      <div className='row g-4 mt-3'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4'>
            <Routes>
              <Route path="" element={ <Navigate to="Validation" /> }/>
              <Route path="Validation/*" element={<Appointment_validation/>} />
              {/* <Route path="MakeHistory/*" element={<Appointment/>} />
              <Route path="FinishProcess/*" element={<Appointment/>} /> */}
            </Routes>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-8 bg-gray'>
          <div id="card-view" className='card border-0 rounded-3 w-100 bs-2- bg-gray'>
            <div className='card-body w-100 min-h-'>
            <Routes>
              <Route path="" element={ <Navigate to="Validation" /> }/>
              <Route path="Validation/*" element={<Validation/>} />
              <Route path="MakeHistory/*" element={<MedicHistory/>} />
              <Route path="MakeHistory2/*" element={<MedicHistory_2/>} />
              <Route path="MakeHistory3/*" element={<MedicHistory_3/>} />
              <Route path="MakeHistory4/*" element={<MedicHistory_4/>} />
              <Route path="MakeHistory5/*" element={<MedicHistory_5/>} />
              <Route path="FinishProcess/*" element={<FinishProcess/>} />
            </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
