

import React from "react";
import "./buttonToggle.css";
  
const ToggleSwitch = () => {



  return (
    <div className="container">
      <span className="labelSwitch">{'Recordarme'}{" "}</span>
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" 
                name={'Recordarme'} id={'Recordarme'} />
        <label className="label" htmlFor={'Recordarme'}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;