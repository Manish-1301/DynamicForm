import React from 'react';
import './form.css';
import regex from 'regex'; 

class DynamicForm extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    onButtonSubmit=(event)=>{
        event.preventDefault();
    }
    onInputChange=(event,key)=>{
        this.setState(
            {
                [key]:event.target.value
            }
        );
    }
    onInputBlur=(key)=>{
        console.log(this.state[key]);
    }
    onCheckBoxChange=(value,bool,key)=>{
        let data=[value];
        if(this.state[key]===undefined){
            //this.state[key]=[value]
            this.setState({[key]:[...data]})
        }
        else if (bool===true && !(this.state[key].find(d=> d===value))) {
            this.setState({[key]:[...this.state[key],value]})
        }
        else if (bool===false && (this.state[key].find(d=> d===value))){
            data=this.state[key].filter(d=>  d !== value)
            this.setState({[key]:[...data]})
        }
        //console.log(this.state)
    }
    onMultiBoxChange=(event,key)=>{
        let data=[event.target.value]
        if(this.state[key]===undefined){
            this.setState({
                [key]: [...data]
            })
        }
        else if(!(this.state[key].find(d=> d===event.target.value)))
            this.setState({[key]:[...this.state[key],event.target.value]})
        else{
            data=this.state[key].filter(d=>  d !== event.target.value)
            this.setState({[key]:[...data]})
        }
        console.log(this.state[key]);
    }

    renderForm =()=>{
        let models = this.props.model;
        let formUI= models.map((model)=>{
            let key=model.key;
            let props=model.props || {};
            let label=model.label
            let dependencies=model.dependencies || "";
            //console.log(model.options)
            let type=model.type || "text";
            let input=(
                <input className="input" required
                    {...props}
                    key={key}
                    type={type}
                    onChange={(event)=>this.onInputChange(event,key)}
                    onBlur={()=>this.onInputBlur(key)}
                />
            );
            if (dependencies===""){
                if (type==="radio"){
                    input=model.options.map(option=>{
                        let id=option.id || +new Date()
                        return (
                            <React.Fragment key={"fr" + option.key}>
                                <input {...props}
                                    type={type}
                                    id={id}
                                    key={option.key}
                                    name={option.name}
                                    value={option.value}
                                    onChange={(event)=>this.onInputChange(event,key)}
                                    onBlur={()=>this.onInputBlur(key)}
                                />
                                <label key={"ll" + option.key} htmlFor={id}>{option.label}</label>
                            </React.Fragment>
                        );
                    })
                    input= <div >{input}</div>;
                }
                if (type==="checkbox"){
                    input=model.options.map(option=>{
                        let id=option.id || +new Date()
                        return (
                            <React.Fragment key={"fr" + option.key}>
                                <input {...props}
                                    type={type}
                                    id={id}
                                    key={option.key}
                                    name={option.name}
                                    value={option.value}
                                    onChange={(event)=>{this.onCheckBoxChange(event.target.value,document.querySelector(`#${id}`).checked,key)}}
                                    onBlur={()=>this.onInputBlur(key)}
                                />
                                <label key={"ll" + option.key} htmlFor={id}>{option.label}</label>
                            </React.Fragment>
                        );
                    })
                    input= <div >{input}</div>;
                }
                if (type === "select" && model.multiple==='off') {
                    input = model.options.map(option => {
                      return (
                        <option
                          {...props}
                          className="form-input"
                          key={option.key}
                          value={option.value}
                        >
                          {option.value}
                        </option>
                      );
                    });
                    input = (
                      <select
                        onChange={e => {
                          this.onInputChange(e, model.key);
                        }}
                        onBlur={()=>this.onInputBlur(key)}
                      >
                        {input}
                      </select>
                    );
                }
                if (type === "select" && model.multiple==='on') {
                    input = model.options.map(option => {
                      return (
                        <option
                          {...props}
                          className="form-input"
                          key={option.key}
                          value={option.value}
                          onClick={event => {this.onMultiBoxChange(event,key)}}
                        >
                          {option.value}
                        </option>
                      );
                    });
                    input = (
                      <select
                        multiple
                        onBlur={()=>this.onInputBlur(key)}
                      >
                        {input}
                      </select>
                    );
                }
                if(type==="textarea"){
                    input=(
                        <textarea onChange={(event)=>this.onInputChange(event,key)}
                        onBlur={()=>this.onInputBlur(key)}></textarea>
                    );
                }
            }
            /*if(dependencies!==""){
                console.log(dependencies)
                console.log(model.options)
                let depend= this.state[dependencies] || model.value;
                console.log(depend);
                console.log(model.options[depend])
            }*/
            if (dependencies!==""){
                let depend=this.state[dependencies] || model.value;
                if (type==="radio"){
                    input=model.options[depend].map(option=>{
                        let id=option.id || +new Date()
                        return (
                            <React.Fragment key={"fr" + option.key}>
                                <input {...props}
                                    type={type}
                                    id={id}
                                    key={option.key}
                                    name={option.name}
                                    value={option.value}
                                    onChange={(event)=>this.onInputChange(event,key)}
                                    onBlur={()=>this.onInputBlur(key)}
                                />
                                <label key={"ll" + option.key} htmlFor={id}>{option.label}</label>
                            </React.Fragment>
                        );
                    })
                    input= <div >{input}</div>;
                }
                if (type==="checkbox"){
                    input=model.options[depend].map(option=>{
                        let id=option.id || +new Date()
                        return (
                            <React.Fragment key={"fr" + option.key}>
                                <input {...props}
                                    type={type}
                                    id={id}
                                    key={option.key}
                                    name={option.name}
                                    value={option.value}
                                    onChange={(event)=>{this.onCheckBoxChange(event.target.value,document.querySelector(`#${id}`).checked,key)}}
                                />
                                <label key={"ll" + option.key} htmlFor={id}>{option.label}</label>
                            </React.Fragment>
                        );
                    })
                    input= <div >{input}</div>;
                }
                if (type === "select" && model.multiple==='off') {
                    input = model.options[depend].map(option => {
                      return (
                        <option
                          {...props}
                          className="form-input"
                          key={option.key}
                          value={option.value}
                        >
                          {option.value}
                        </option>
                      );
                    });
                    input = (
                      <select
                        onChange={e => {
                          this.onInputChange(e, model.key);
                        }}
                        onBlur={()=>this.onInputBlur(key)}
                      >
                        {input}
                      </select>
                    );
                }
                if (type === "select" && model.multiple==='on') {
                    input = model.options[depend].map(option => {
                      return (
                        <option
                          {...props}
                          className="form-input"
                          key={option.key}
                          value={option.value}
                          onClick={event => {this.onMultiBoxChange(event,key)}}
                        >
                          {option.value}
                        </option>
                      );
                    });
                    input = (
                      <select
                        multiple
                        onBlur={()=>this.onInputBlur(key)}
                      >
                        {input}
                      </select>
                    );
                }
            }
            return (
                <div key = {"g" + key} className="form__input" >
                    <label className="form__label">{label}</label>
                    {input}
                </div>
            );
        })
        return formUI;
    }
    render(){
        return (
            <div className="DynamicForm">
                {this.renderForm()}
                <div >
                    <button className= "button" onSubmit={this.onButtonSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}

export default DynamicForm;