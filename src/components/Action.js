import React from 'react';

const Action = (props)=>{
  return (
      <div>
        <button
          className="btn  big-button"
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
}

export default Action;