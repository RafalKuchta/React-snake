import React from 'react';
import {ROWS, COLS, CELL, FOOD, BODY} from './const';


function Cells ({board, handleKey}) {
    const cells = [];

    for (let row = 0; row < ROWS; row++){
        for (let col = 0; col < COLS; col++){
            const key = COLS * row + col
            const value = board[key];
            const className = value === BODY ? 'body-cell' : value === FOOD ? 'food-cell' : 'cell';            
            cells.push(<div key={key} className={className}/>)
        }
    }
    return(
    <div 
    className='board'
    style={{width: COLS*CELL, height: ROWS*CELL}}
    onKeyDown={handleKey}
    tabIndex={0}
    >
    {cells}
    </div>
    )
}

export default Cells;