import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {

  const onClickButton = () => {
    alert("abrir un modal")
  }

  return (
    <button 
      className="CreateTodoButton"
      onClick={()=> {onClickButton}}
      >
      +  
    </button>
  );
}

export { CreateTodoButton };
