import React ,{useState}from 'react';
import {useNotes} from '../../store'
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { NotesContainer } from './NotesContainer';



const MasterPasswordDialog = styled.div.attrs({
    className:  `flex flex-col h-screen bg-blue-100 items-center justify-center`  ,})`
    & {
        div {
            ${tw `border rounded-md shadow-md bg-white p-4 z-100`}
        }
        h4{
            ${tw `text-base font-medium my-2 max-w-ws`}
        }
        h6 {
            ${tw `text-sm font-hairline italic my-2 max-w-xs`}
        }
        input{
            ${tw `bg-white rounded py-2 px-1 shadow max-w-ws`}
        }
        button{
            ${tw `bg-blue-600 rounded py-1 px-3 border-grey-600 border-solid border max-w-ws block my-2 text-white text-base`}
        }
    }
    `





export const MainContainer = ()=>{
    let notesState =useNotes();
    let {updateSecret,state}  = notesState;
    // let {secret}=state; 
    const [secretText,setSecret] = useState('')

    // useEffect(()=>{
    //     if(secretText!==''){
    //         updateSecret(secretText);
    //     }
    // },[updateSecret,secretText])
    // [secret,updateSecret])


    return (
        <div>
            {
                state.secret?(
                
                <div>
             <NotesContainer {...notesState}/>
                
            </div>
    ):(
        <MasterPasswordDialog>

        <div >
            <h4>Enter master password</h4>
            <h6>Make sure you remember this. Incase you lose it, you won't be able to access your notes.</h6>
            <form>

            <input type='password' value={secretText} onChange={(e)=>setSecret(e.target?.value)}/>
            <button type='button' onClick={()=>{updateSecret(secretText)}} >Save</button>
            </form>
            </div>
        </MasterPasswordDialog>
    )
            }
        </div>
    )       
}