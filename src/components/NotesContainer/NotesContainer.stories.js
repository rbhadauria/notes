import React from 'react';
import { NotesContainer } from './NotesContainer';
import '../../assets/styles.css'


export default {
    title: 'NotesContainer',
    component:NotesContainer
}


let state={
    labels:['notes','deletedd','archived'],
    selectedLabel:'archived',
    displayNotes:[]
}
export const normal = ()=><NotesContainer state={state}/>