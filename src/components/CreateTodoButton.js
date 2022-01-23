import React from 'react';
import '@styles/CreateTodoButton.css';

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
