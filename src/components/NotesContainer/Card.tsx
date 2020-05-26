import React,{useState} from 'react';
import styled from 'styled-components'
import tw from 'tailwind.macro';
import {BsThreeDotsVertical} from 'react-icons/bs'


const CardContainer = styled.div`
    max-height:400px;    
    min-heigth:200px
    ${tw `sm:w-64 md:w-1/3 lg:w-64 shadow rounded  p-4 m-4 relative`}
`
const NoteTitle = styled.div`
    ${tw ` text-lg text-gray-900 h-8 min-h-0 truncate break-words`}
`

const NoteContent = styled.div`
    ${tw `text-md text-gray-600 py-2  break-words`}
`

const ContextMenu = styled.div`
    ${tw `w-16 min-h-0 shadow-sm z-10 bg-gray-100`}
`

const ContextMenuContainer = styled.div`
${tw `absolute right-0 p-2 top-0`}

`


export const Card = (props)=>{
    const [showContextMenu,setShowContextMenu] = useState(false)

    let {note} = props;
    return (
        <div className={`${props.className} p-4`} style={props.style}>

        <CardContainer >
            <ContextMenuContainer>
                {
                    showContextMenu?<ContextMenu tabIndex={0} onMouseLeave={()=>setShowContextMenu(false)}></ContextMenu>:<BsThreeDotsVertical onClick={()=>setShowContextMenu(true)}/>
                }
            </ContextMenuContainer>
            {note.title!==''?<NoteTitle>{note.title}</NoteTitle>:''}
            <NoteContent>{note.content}</NoteContent>
        </CardContainer>
        </div>

    )
}