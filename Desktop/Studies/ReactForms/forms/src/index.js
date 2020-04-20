import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, useHistory
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import CreateTable from './CreateTable.js'
import Comms from './services/server_communication.js'
import SubmitPage from './SubmitPage'
import FormWizard from './FormWizard'

const App = () => {
  const [forms, setForms] = useState([])
  const [fields, setFields] = useState([])
  const [fieldSet, setSet] = useState(new Set())
  const [newLabel, setNewLabel] = useState('')
  const [newName, setNewName] = useState('')
  const [newInputType, setNewInputType] = useState('')
  const [newFormName, setNewFormName] = useState('')
  const [formId, setFormId] = useState(1)

  useEffect(() => {
    Comms.readAll()
      .then((forms) => {
        setForms(forms)
      })
      .catch(error => console.log(error))
  }, [])

  const padding = { padding: 5 }

  const history = createBrowserHistory()

  // const FormWizard= (props) => {
  //     const addField = (event) => {
  //         event.preventDefault() //Why? Ask Or
  //         //if(fieldSet.has(newLabel))
  //         //    return alert(`${newLabel} is already in exist`) ASK OR

  //         const field = { name: newName, label: newLabel, inputType: newInputType, }
  //         console.log(newLabel)
  //         setFields(fields.concat(field))
  //         setSet(field.label)
  //         setNewName('')
  //         setNewLabel('')
  //         setNewInputType('')
  //     }

  //     const addForm = (event) => {

  //         event.preventDefault()
  //         const form = {
  //             name: newFormName,
  //             fields: fields,
  //             id: formId,
  //             noSubmissions: 0,
  //         }

  //         Comms.create(form)
  //             .then((form) => {
  //                 console.log(form)
  //                 setForms(forms.concat(form))
  //             }).catch(error => console.log(error))
  //         setForms(forms.concat(form))
  //         setNewFormName('')
  //         setFields([])
  //         setFormId(formId + 1)
  //         props.history.push("/table")
  //     }

  //     const handleNameChange = (event) => {
  //         setNewName(event.target.value)
  //     }
  //     const handleLabelChange = (event) => {
  //         setNewLabel(event.target.value)
  //     }
  //     const handleInputTypeChange = (event) => {
  //         setNewInputType(event.target.value)
  //     }
  //     const handleFormNameChange = (event) => {
  //         setNewFormName(event.target.value)
  //     }

  //     return (
  //         <div>
  //             <h1>Add new field</h1>
  //             <form onSubmit={addField}>
  //                 <div>
  //                     field label:<input type="text" value={newLabel} onChange={handleLabelChange}></input>
  //                     input name:<input type="text" value={newName} onChange={handleNameChange}></input>
  //                     input type:<select value={newInputType} onChange={handleInputTypeChange}>
  //                         <option value="text">text</option>
  //                         <option value="color">color</option>
  //                         <option value="date">date</option>
  //                         <option value="email">email</option>
  //                         <option value="tel">telephone</option>
  //                         <option value="number">number</option>
  //                     </select>
  //                     <br></br>
  //                     <button type="submit">Add Field</button>
  //                 </div>
  //             </form>
  //             <ul>
  //                 {fields.map((item, i) => <li key={i}>{item.label} {item.name} {item.inputType}</li>)}
  //             </ul>

  //             <form onSubmit={addForm}>
  //                 <div>
  //                     Form Name:<input value={newFormName} onChange={handleFormNameChange}></input>
  //                     <br></br>
  //                     <button type="submit">Save</button>
  //                 </div>
  //             </form>            </div>
  //     )
  // }

  function addFormArr (form) {
    setForms(forms.concat(form))
  }

  return (
    <div>
      <Router history={history}>
        <div>
          <Link style={padding} to="/table">Form List</Link>|
          <Link style={padding} to="/wizard">Form Builder</Link>
          <Route path="/table" render={() => <CreateTable forms={forms}/>}/>
          <Route path="/wizard" render={() => <FormWizard forms={forms} setForms={addFormArr}/>}/>
          <Route path="/submit/:id" render={({ match }) => <SubmitPage fields={forms[match.params.id].fields}
            formName={forms[match.params.id].name}/>}/>
        </div>
      </Router>

    </div>

  )
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
