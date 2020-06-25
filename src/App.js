import React from 'react';
import DynamicForm from './Components/DynamicForm/DynamicForm';
import axios from 'axios'


class App extends React.Component{
    constructor(){
        super();
        this.state={
            models: []
        }
    }
    
    render(){
        axios.get('http://localhost:3001/',).then(response=>{
        this.setState({models: [...response.data]})
        })
        return(
            <DynamicForm 
                model={this.state.models}
            />
        );
    }
}

export default App;