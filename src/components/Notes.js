import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react/cjs/react.development'
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();

    const { notes,getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes()
    }
    else{
        navigate('/login')
    }
    // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" })
    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("updated Successfully", "success");
       
    }
    const onChange = (e)=>{
       setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
        <Addnote showAlert={ props.showAlert }/>
     
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">EDIT NOTE</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">CLOSE</button>
                    <button disabled={note.etitle.length<3 || note.edescription.length<3} onClick={handleClick} type="button" className="btn btn-outline-success">UPDATE NOTE</button>
                </div>
                </div>
            </div>
            </div>
        <div className="row my-3">
                <h2>You Note</h2>
                <div className="container mx-2">
                    {notes.length===0 && 'No Notes To Display'}
                </div>
                {notes.map((note)=>{
                    return<Noteitem key={note._id} updateNote={updateNote} showAlert={ props.showAlert } note={note}/>;
                })}
                </div>
        </>    
    )
}

export default Notes
