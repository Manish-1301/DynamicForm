import React from 'react';
import DynamicForm from './Components/DynamicForm/DynamicForm'

class App extends React.Component{
    render(){
        return(
            <DynamicForm 
                model={[
                { key: "name", label: "Name", props: { required: true } },
                { key: "age", label: "Age", type: "number" },
                { key: "email", label: "Email", type: "email" },
                {
                    key: "State",
                    label: "State",
                    type: "radio",
                    options: [
                      { key: "Odisha", label: "Odisha", name: "State", id: "Odisha",value: "Odisha" },
                      {
                        key: "Maharastra",
                        label: "Maharastra",
                        name: "State",
                        id:"Maharastra",
                        value: "Maharastra"
                      }
                    ]
                  },
                  {
                    key: "skills",
                    label: "Skills",
                    type: "checkbox",
                    options: [
                      { key: "reactjs", label: "ReactJS", value: "reactjs",id: "reactjs" },
                      { key: "angular", label: "Angular", value: "angular",id: "angularjs" },
                      { key: "vuejs", label: "VueJS", value: "vuejs",id: "Vuejs" }
                    ]
                  },
                  {
                    key: "Hobbies",
                    label: "Hobbies",
                    type: "select",
                    multiple: "on",
                    options: [
                      { key: "Football", label: "Football", value: "Football" },
                      { key: "Cricket", label: "Cricket", value: "Cricket" },
                      { key: "Volleyball", label: "Volleyball", value: "Volleyball" }
                    ]
                  },
                  {
                    key: "city",
                    label: "City",
                    type: "select",
                    value: "Odisha",
                    multiple: "off",
                    dependencies: "State",
                    options: {
                        Odisha: [
                            { key: "Rourkela", label: "Rourkela", value: "Rourkela" },
                            { key: "Bhubaneswar", label: "Bhubaneswar", value: "Bhubaneswar" },
                            { key: "Cuttack", label: "Cuttack", value: "Cuttack" }
                        ],
                        Maharastra: [
                            { key: "mumbai", label: "Mumbai", value: "Mumbai" },
                            { key: "Indore", label: "Indore", value: "Indore" }
                        ]
                    }
                  },
                  {
                      key: "About",
                      label: "About",
                      type: "textarea"
                  }
                ]}
            />
        );
    }
}

export default App;