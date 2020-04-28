import React from 'react';
import {Link ,Redirect} from 'react-router-dom';
import { useNotes } from '../../store';



export const Home =()=>{

    //check if notes ever used in this browser
    let {state} = useNotes();
    if (state.notesExists)
        return <Redirect to='/notes'/>
    

    return (
       <div className='main-container'>
           <div>

           <div className='header'>
               Your Notes. Always yours!!
               <div className='content'>

            Secure | Available offline | Multi-Device
               </div>
           </div>
           <div className='getting-started'>
               <Link to='/notes'> <button className='btn btn-primary' >Create your first note!</button></Link>
           </div>
           </div>
       </div> 
    )
}