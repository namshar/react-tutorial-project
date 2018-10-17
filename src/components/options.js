import React from 'react';
import Option from './Option'

const Options = (props)=>{
  return (
      <div>
        <div className="widget-header">
          <h3> Your Options</h3>
          <button 
          onClick={props.handleDeleteOptions}
          className="button button--link"
          >
          Remove All
          </button>
        </div>
        {props.options.length === 0 && <p className="widget__message">Please add an option to start with</p> }
        {
            props.options.map((option,index) => 
            <Option 
            key={option} 
            optionText={option} 
            handleDeleteOption={props.handleDeleteOption} 
            index={index}
            />
            )
        }
      </div>
    );
}

export default Options;
