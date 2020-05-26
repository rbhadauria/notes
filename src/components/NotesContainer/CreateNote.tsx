import React,{useState} from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';


const CreateNoteContainer = styled.div`
    ${tw ` shadow p-2 w-2/3 mx-auto rounded-lg block outline-none md:w-2/3 `}
    transition-property: height;
    transition-duration: 1500ms;
    transition-timing-function: linear;	
   
    .title-div{
        ${tw `text-gray-500 focus:text-gray-800 break-normal text-lg focus:outline-none p-2`}
    }
    
    .content-div{
        ${tw `border-none leading-24 min-h-0 text-md text-gray-500 focus:text-gray-800 break-words focus:outline-none p-2 `}
    }

    .btn{
        ${tw  `border-none text-right  rounded-sm`}
    }
    .btn button{
        ${tw  `border-none hover:bg-gray-200 px-3 py-1 active:bg-gray-300 active:shadow-md`}
        
    }
`


export const CreateNote = (props)=>{

    const [expand,setExpand]= useState(false)
    const [titleEdited,setTitleEdited] = useState(false);
    const [contentEdited,setContentEdited] = useState(false);

    let {addNote } = props;
    let titleDiv:HTMLDivElement|null=null,contentDiv:HTMLDivElement|null=null;
    let handleContentDivFocus = ()=>{
        if(!expand){
            setExpand(true);
        }
    };


    let reset=()=>{
        if(titleEdited||contentEdited){
            addNote({
                title:titleDiv?.innerText,
                content:contentDiv?.innerText

            })
        }
        setExpand(false);
        setTitleEdited(false);
        setContentEdited(false);
        if(contentDiv)
            contentDiv.innerText='';
        if(titleDiv)
            titleDiv.innerText='';
        
    }

    let editTitle=(e)=> {
        !titleEdited && setTitleEdited(true)
        if(e.target.innerText==='' || e.target.innerText==='\n'){
            setTitleEdited(false);
        }
    };
    let editContent=(e)=> {
        !contentEdited && setContentEdited(true);
        
        if(e.target.innerText==='' || e.target.innerText==='\n'){
            setContentEdited(false);
        }
    }

    


    return (
        <div>
            <CreateNoteContainer className={`${expand?'shadow-lg':''}`} onBlur={()=>console.log('blurred')}>
                <div className={`relative ${expand?'block':'hidden'}`}>
                <div className={`title-div ${titleEdited?'text-gray-800':''}`} contentEditable ref={(node)=>titleDiv=node} onInput={editTitle} ></div>
                <div className={`title-div absolute top-0 pointer-events-none ${titleEdited?'hidden':'block'}`}>Title</div>

                </div>
                <div className='relative'>
                <div className={`${expand?'h-16 py-3':''} content-div ${contentEdited?'text-gray-700':''}`} contentEditable ref={node=>contentDiv=node} onFocus={handleContentDivFocus}  onInput={editContent}></div>
                <div className={`content-div absolute pointer-events-none top-0 ${contentEdited?'hidden':'block'}`} >Take a note...</div>

                </div>
                <div className={`${expand?'block':'hidden'} btn`}>

                <button onClick={reset}>Close</button>
                </div>
            </CreateNoteContainer>
        </div>
    )}
    