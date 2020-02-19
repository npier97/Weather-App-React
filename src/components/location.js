import React from 'react';

export const Location = (props) => { 

  return(
    <div className="location">
        <h1 className="location-timezone">{props.timezone}</h1>
        <canvas className="icon" width="128" height="128"></canvas>
    </div>
  );
}
