import React from 'react';
import AddOption from './AddOption';
import Option from './Option';
import Header from './Header';
import Options from './options';
import Action from './Action';
import OptionModal from './OptionModal';


class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.state = {
      options: [],
      selectedOption:undefined
    };
  }

  componentDidMount(){
    const localOptions = localStorage.getItem('options');
		const options = JSON.parse(localOptions);
		
		if(options && options.length>0)
		{
			this.setState(()=>({options:options}));
		}
  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.options != this.state.options){
			localStorage.setItem('options', JSON.stringify(this.state.options));
		}
  }

  componentWillUmount(){
    console.log('componentWillUmount');
  }

  handleDeleteOptions(){
    this.setState(()=>({options:[]}));
  }

  handleDeleteOption(optionToDelete) {
    this.setState((prevState) =>({
      options: prevState.options.filter((option)=>{     //it'll run filter for ever index if callback return true it'll remove that element
      return optionToDelete !== option;
      })
    }))
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(()=>({selectedOption:option}));
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    
    this.setState((prevState)=>({options: prevState.options.concat(option)}));

  }

  handleModalClose() {
    this.setState(()=>({selectedOption:undefined}));
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container header-center">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
              <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
          <OptionModal 
          selectedOption={this.state.selectedOption}
          handleModalClose = {this.handleModalClose}/> 
        </div>
      </div>
    );
  }
}

export default IndecisionApp;