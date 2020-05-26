import React,{useState} from "react";
import styled from 'styled-components'
import tw from 'tailwind.macro';
import {FaSearch} from 'react-icons/fa'
import {MdClear} from 'react-icons/md'


const SearchBarContainer = styled.div.attrs(props=>({

    className: props.selected?'shadow-lg':'shadow'
})
)`
    
    ${tw  `  h-10 w-2/3 rounded-md leading-10 m-4 inline-flex items-center  relative focus:shadow-lg focus:outline-none `}

    input {
        ${tw `w-full border-none text-gray-800 inline ` }
    }
    span {
        ${tw `py-3 px-4 rounded-full hover:shadow-xl hover:bg-gray-200 `}
    }
`
const SearchResults = styled.div`
    ${tw `shadow-sm absolute w-full top-0 pt-10  z-10 hidden`}

`
const Result = styled.div`
    ${tw   ` border-b hover:bg-gray-100 px-6`}
`

export const SearchBar= (props)=>{

    const [text,setText] = useState('');
    const [selected,setSelected] = useState(false)
    return (
        <SearchBarContainer tabIndex={0} selected={selected}>
            <span><FaSearch/></span>
            <input className='' placeholder='Search' value={text} onChange={(e)=> setText(e.target.value)} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)}/>
            <span onClick={()=>setText('')} ><MdClear /></span>

                <SearchResults>
                <Result>Ist result</Result>
                <Result>2nd result</Result>
            </SearchResults>
        </SearchBarContainer>
        );
}