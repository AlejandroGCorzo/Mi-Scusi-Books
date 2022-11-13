import React, { useState } from "react";
import './DarkMode.css'

const DarkMode = () => {

    
    return (
      <div className="toggle-theme-wrapper">
        <span>☀️</span>
        <label className="toggle-theme" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
  
            // NEW
            // onChange={toggleTheme}
            // defaultChecked={defaultDark}
          />
          <div className="slider round"></div>
        </label>
        <span>🌒</span>
      </div>
    );
  };
  
  export default DarkMode;