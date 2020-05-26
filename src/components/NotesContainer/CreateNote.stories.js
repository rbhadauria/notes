import React from 'react'
import {CreateNote} from './CreateNote'
import '../../assets/styles.css';


export default {
    title:'CreateNote',
    component:CreateNote
}

export const normal = ()=><CreateNote addNote={(note)=>console.log(note)}/>