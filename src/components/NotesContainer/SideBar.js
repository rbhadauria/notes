import React from "react";
import styled from 'styled-components';
import tw from 'tailwind.macro';

const SidebarContainer = styled.div`
    ${tw `w-64 h-screen`}
`

const LabelContainer = styled.div`
    ${tw `h-12 w-full rounded-r-full text-center text-gray-600 text-lg px-8 py-2 hover:bg-gray-300`}

    i {

    }

`
const SelectedLabel = styled(LabelContainer)`
    ${tw `bg-blue-400 text-white text-xl font-semibold hover:bg-blue-400`}
    
`


export const SideBar = (props)=>{

    let {labels,selectedLabel} = props;

    return <SidebarContainer >
        {
            labels.map(label=>selectedLabel===label?<SelectedLabel >{label}</SelectedLabel>:<LabelContainer onClick={()=>props.updateSelectedLabel(label)}>{label}</LabelContainer>)
        }
        </SidebarContainer>;
}