import {useEffect,useReducer,useState} from 'react';
import CryptoJS from 'crypto-js';
// import {Note} from "./types/note";

type Action={
    type:string,
    payload:unknown
}

interface Note{
    id:number,
    title:string,
    content:string,
    synced:boolean,
    deleted:boolean,
    createdOn:number,
    updatedOn:number|null,
    archived:boolean,
    tags:Array<string>
}


type State={
    AllNotes:Array<Note>,
    SelectedNotes:Array<Note>,
    DeletedNotes:Array<Note>,
    lastSynched:number|undefined,
    syncEnabled:boolean,
    secret:string|undefined,
    notesExists:boolean

}

const initialState:State={
    AllNotes:[],
    lastSynched:undefined,
    syncEnabled:false,
    SelectedNotes:[],
    DeletedNotes:[],
    secret:undefined,
    notesExists:false

}

let reducer = (state:State,action:Action)=>{
    switch (action.type){
        case 'ADD_NOTE':{
           let notes = state.AllNotes.slice();
           notes.push(action.payload as Note) 
            return Object.assign({},state,{AllNotes:notes});
        }
        case 'DELETE_NOTE':{
               return state;
        }
        case 'UPDATE_SECRET':{
            return Object.assign({},state,{secret:action.payload})
        }
        case 'NOTES_EXISTS':{
            return Object.assign({},state,{notesExists:true})
        }
        case 'NOTES':{
            return Object.assign({},state,{AllNotes:action.payload})
        }
        default:
            throw new Error()
    }
}

const saveNotes = (notes:Array<Note>,secret:string)=>{
    if (!secret)
        throw new Error('Secret not found')
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(notes),secret);
    localStorage.setItem('notes',encrypted.toString());
}

const getNotes = (secret:string)=>{
    if(!secret)
        throw new Error('Secret not found')
    let notes = localStorage.getItem('notes');
    if(notes){
        let bytes = CryptoJS.AES.decrypt(notes,secret);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }else
    console.log('notes not found')
}

const checkIfNotesExists = ()=>{
    if (localStorage.getItem('notes'))
        return true;
    return false;
}



export const useNotes = ()=>{
    const [state,dispatch] = useReducer(reducer,initialState);

    let {AllNotes,secret} = state;

    useEffect(()=>{
        console.log('inside effect')
        if (checkIfNotesExists())
            dispatch({
                type:'NOTES_EXISTS',
                payload:null
            })
    },[])

    useEffect(()=>{
        if(secret){
         let notes=   getNotes(secret as string)
         if(notes)
            dispatch({
                type:'NOTES',
                payload:notes
            })

        }
    },[secret])

    useEffect(()=>{
        if(AllNotes.length>0){
            saveNotes(AllNotes,secret as string)
        }
    },[AllNotes])

    let addNote = (note:Note)=>{
        dispatch({
            type:'ADD_NOTE',
            payload:note
        })
    }

    let deleteNote = (id:number)=>{

    }
    let archiveNote=(id:number)=>{


    }

    let updateSecret = (secret:string)=>{
        dispatch({
            type:'UPDATE_SECRET',
            payload:secret
        })
    }




    return {state,addNote,deleteNote,archiveNote,updateSecret}

}