import React,{useReducer,useContext,createContext} from 'react';
import CryptoJS from 'crypto-js';
import uuid from 'uuid/v4'

type Action={
    type:string,
    payload:unknown
}

interface Note{
    id:string,
    title:string,
    content:string,
    synced:boolean,
    deleted:boolean,
    createdOn:number,
    updatedOn:number|null,
    archived:boolean,
    tags:Array<string>
    starred?:boolean
}


type State={
    allNotes:Array<Note>,
    displayNotes:Note[],
    selectedNotes:Array<Note>,
    deletedNotes:Array<Note>,
    archivedNotes:Note[],
    starredNotes:Note[],
    lastSynched:number|undefined,
    syncEnabled:boolean,
    secret:string|undefined,
    notesExists:boolean,
    notesMap:{
        id?:Note
    }
    labels:string[]
    selectedLabel:string
        
}

const initialState:State={
    allNotes:[],
    displayNotes:[],
    lastSynched:undefined,
    syncEnabled:false,
    selectedNotes:[],
    deletedNotes:[],
    archivedNotes:[],     
    starredNotes:[],
    secret:'',
    notesExists:false,
    notesMap:{},
    labels:[
        'Notes',
    'Starred',
    'Archived',
    'Deleted'
    ],
    selectedLabel:'Notes'
}


const filterNotes  = (notes:Note[])=>{
    let displayNotes:Note[]=[],
    archivedNotes:Note[]=[],
    deletedNotes:Note[]=[],
    starredNotes:Note[]=[];
    notes.forEach(note=>{
        if(note.deleted)
            deletedNotes.push(note)
        else if(note.archived)
            archivedNotes.push(note)
        else if (note.starred)
            starredNotes.push(note)
        else
            displayNotes.push(note)
    })

    return {displayNotes,deletedNotes,archivedNotes,starredNotes}
}



let reducer = (state:State,action:Action)=>{
    switch (action.type){
        case 'ADD_NOTE':{
            state.displayNotes.splice(0,0,action.payload as Note);
            state.allNotes.splice(0,0,action.payload as Note)
            saveNotes(state.allNotes,state.secret as string)
            return Object.assign({},state);
        }
        case 'DELETE_NOTE':{
                let index = state.allNotes.findIndex(e=>e.id===action.payload)
                if(index !== -1){
                    state.allNotes[index].deleted = true;
                    state.allNotes[index].updatedOn = Date.now();
                    saveNotes(state.allNotes,state.secret as string)
                    let {displayNotes,deletedNotes} = filterNotes(state.allNotes);
                    return Object.assign({},state,{displayNotes,deletedNotes});
                }
                return state;
        }
        case 'ARCHIVE_NOTE':{
            let index = state.allNotes.findIndex(e=>e.id===action.payload)
            if(index !== -1){
                state.allNotes[index].archived = true;
                state.allNotes[index].updatedOn = Date.now();
                saveNotes(state.allNotes,state.secret as string)
                let {displayNotes,archivedNotes} = filterNotes(state.allNotes);
                return Object.assign({},state,{displayNotes,archivedNotes});
            }
            return state;
    }
    case 'STARRED_NOTE':{
        let index = state.allNotes.findIndex(e=>e.id===action.payload)
        if(index !== -1){
            state.allNotes[index].starred = true;
            state.allNotes[index].updatedOn = Date.now();
            saveNotes(state.allNotes,state.secret as string)
            let {displayNotes,starredNotes} = filterNotes(state.allNotes);
            return Object.assign({},state,{displayNotes,starredNotes});
        }
        return state;
}
        case 'UPDATE_SECRET':{
            let notes = getNotes(action.payload as string)
            if(notes){
                let {displayNotes,deletedNotes} = filterNotes(notes);
                return Object.assign({},state,{secret:action.payload,allNotes:notes,displayNotes,deletedNotes})
            }
            else 
                return state;
        }
        case 'NOTES_EXISTS':{
            return Object.assign({},state,{notesExists:true})
        }
        case 'NOTES':{
            let payload = action.payload as Note[];
            console.log(payload)
            payload.forEach(n=>{
                if (!state.notesMap[n.id]) {
                  state.notesMap[n.id] = n;
                  if (n.deleted) {
                    state.deletedNotes.push(n);
                  } else if (n.archived) {
                    state.archivedNotes.push(n);
                  } else state.allNotes.push(n);
                }
            })
            return Object.assign({},state,{displayNotes:state.allNotes})
        }
        case 'SELECTED_LABEL':{
            let displayNotes:Note[]=[];
            switch (action.payload){
                case 'Deleted':{
                    displayNotes=state.deletedNotes.slice();
                    break;
                }
                case 'Archived':{
                    displayNotes = state.archivedNotes.slice();
                    break;
                }
                case 'Starred':{
                    displayNotes=state.starredNotes.slice();
                    break;
                }
                default:{
                    let filtered= filterNotes(state.allNotes);
                    displayNotes=filtered.displayNotes;
                }
            }
            return Object.assign({},state,{selectedLabel:action.payload,displayNotes})
        }
        // case 'CREATE_TAG':{}
        // CASE 'RENAME_TAG':{}
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

export const checkIfNotesExists = ()=>{
    if (localStorage.getItem('notes'))
        return true;
    return false;
}

const NotesContext = createContext('' as any);


export const NotesProvider = ({children})=>{
    return <NotesContext.Provider  value={useReducer(reducer,initialState)}>{children}</NotesContext.Provider>
}


export const useNotes = ()=>{
    const [state,dispatch] = useContext(NotesContext);

    let addNote = (note:Note)=>{
        note.id=uuid()
        dispatch({
            type:'ADD_NOTE',
            payload:note
        })
    }

    let deleteNote = (id:number)=>{
        console.log(id)

        dispatch({
            type:'DELETE_NOTE',
            payload:id
        })

    }
    let archiveNote=(id:number)=>{
        dispatch({
            type:'ARCHIVE_NOTE',
            payload:id
        })
    }

    let updateSecret = (secret:string)=>{
        dispatch({
            type:'UPDATE_SECRET',
            payload:secret
        })
    }

    let updateSelectedLabel = (label)=>{
        dispatch({
            type:'SELECTED_LABEL',
            payload:label
        })
    }

    let saveAllNotes = ()=>{
        saveNotes(state.allNotes,state.secret)
    }




    return {state,addNote,deleteNote,archiveNote,updateSecret,updateSelectedLabel,saveAllNotes}

}