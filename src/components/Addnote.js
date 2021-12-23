import React from 'react'
import { useContext, useState } from 'react/cjs/react.development'
import noteContext from '../context/notes/noteContext';
 

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e)=>{
        e.preventDefault();
         addNote(note.title, note.description, note.tag);
         setNote({ title: "", description: "", tag: "" })
         props.showAlert("Added Successfully", "success");
    }
    const onChange = (e)=>{
       setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container mt-3">
                <h2>ADD NOTE</h2>
            <form>
                <div className="mt-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={3} required/>
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={3} required />
                </div>
                <div className="mt-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-outline-success mt-3" onClick={handleClick}>ADD NOTE</button>
                </form>
                </div>

        </div>
    )
}

export default Addnote
