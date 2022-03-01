import React, { useState, useEffect } from 'react'
import bootstrap from 'bootstrap'

const API = process.env.REACT_APP_API

export const Tasks = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState('');
    const [tasks, setTasks] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(title.length < 1 || description.length < 1) {
            alert("Formulario incompleto.. Rellena todos los campos..");

            await getTasks(); 

            setTitle('');
            setDescription('');
            setStatus('Pending');
        } else {

            if(!editing) {
                const response = await fetch(`${API}/tasks/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        status
                    })
                });
        
                const data = await response.json();
                console.log(data);
        
               } else {
                   const response = await fetch(`${API}/tasks/${id}`, {
                       method: 'PUT',
                       headers: {
                           'Content-Type': 'application/json'
                       },
                       body: JSON.stringify({
                           title,
                           description,
                           status
                       })
                   });
                   const data = await response.json();
                   console.log(data);
                   setEditing(false);
                   setId('');
               }
        
                await getTasks(); 
        
                setTitle('');
                setDescription('');
                setStatus('');
        }
    };
    
    const getTasks = async () => { 
        const response = await fetch(`${API}/tasks`);
        const data = await response.json();
        setTasks(data);    
    };

    const updateTask = async (id) => {
        const response = await fetch(`${API}/tasks/${id}`);
        const data = await response.json();

        setEditing(true);
        setId(id);

        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
    }

    const deleteTask = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?');
        if (userResponse) {
            const response = await fetch(`${API}/tasks/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            await getTasks();
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className="row">
            <div className="col-md-4" >
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input type="text" 
                               onChange={e => setTitle(e.target.value)} 
                               value={title} 
                               className="form-control"
                               placeholder="Title.."
                               autoFocus
                        />
                    </div>

                    <div className="form-group mt-1">
                        <input type="text" 
                               onChange={e=> setDescription(e.target.value)} 
                               value={description} 
                               className="form-control"
                               placeholder="Description.."
                        />
                    </div>

                    <fieldset className="form-group">
                        <legend className="mt-4">Select state:</legend>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" 
                                       className="form-check-input" 
                                       name="optionsRadios" 
                                       id="optionsRadios1" 
                                       value="Pending"
                                       defaultChecked
                                       onChange={e => setStatus(e.target.value)}
                                />
                            Pending..
                            </label>
                        </div>
                        <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" 
                                   className="form-check-input" 
                                   name="optionsRadios" 
                                   id="optionsRadios2" 
                                   value="In Progress"
                                   onChange={e => setStatus(e.target.value)}
                            />
                        In Progress..
                        </label>
                        </div>
                        <div className="form-check disabled">
                        <label className="form-check-label">
                            <input type="radio" 
                                   className="form-check-input" 
                                   name="optionsRadios" 
                                   id="optionsRadios3" 
                                   value="Done"
                                   onChange={e => setStatus(e.target.value)}
                            />
                        Done..
                        </label>
                        </div>
                    </fieldset>

                    <button className="btn btn-primary btn-block mt-1">
                        {editing ? 'Update..' : 'Create new task..'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>    
                    {tasks.map(task => (
                        <tr key={task._id.$oid}>
                            <td> 
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className="accordion-button collapsed" 
                                                type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target="#a" 
                                                aria-expanded="false" 
                                                aria-controls="flush-collapseOne"
                                        >
                                        {task.title}
                                        </button>
                                    </h2>
                                    <div id="a" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">{task.description}</div>
                                    </div>
                                </div>
                            </div>
                            </td>
                                <td className="pt-2"><strong>{task.status}</strong></td>
                                <td>
                                    <button 
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={() => updateTask(task._id.$oid)}
                                    >
                                    Edit
                                    </button>
                            
                                    <button 
                                        className="btn btn-danger btn-sm btn-block m-1"
                                        onClick={() => deleteTask(task._id.$oid)}
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>    
    );  
};