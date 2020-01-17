import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';

function Keys({handleButton}){


    return(
        <div className="btnDiv">
        <button onClick={handleButton} className="btn btn-primary left">Left</button>

        <div><button onClick={handleButton} className="btn btn-primary up">Up</button><button onClick={handleButton} className="btn btn-primary down">Down</button></div>
        
        <button onClick={handleButton} className="btn btn-primary right">Right</button>
        </div>
    )
}

export default Keys;