import React ,{ useEffect} from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import {SideBar} from './SideBar'
import { Card } from './Card';
import { SearchBar } from './SearchBar';
import { CreateNote } from './CreateNote';


const NotesStyledContainer = styled.div`
${tw `inline-flex w-full`}
`
const NotesInnerContainer = styled.div`
${tw `h-screen w-full overflow-auto`}
`

export const NotesContainer = (props)=>{
    let {state ,updateSelectedLabel} = props;
    // console.log(state)
    let containerDiv=React.createRef<HTMLDivElement>();
    let {displayNotes} = state;
    useEffect(()=>{

        let rect= containerDiv.current?.getBoundingClientRect();
        if(rect){
            let {width} =rect;
        let childCount = containerDiv.current?.childElementCount;
        let sizeMap={};
        if(childCount&& childCount>0){
            let children= containerDiv.current?.children;
            let d =children&&children[0] ;
           let childWidth = d?.getBoundingClientRect().width;
           if(childWidth){

            let numx = Math.floor(width/childWidth);
            let remainder = (width%(numx*childWidth))/2;

            console.log(remainder)//_lo


            if(children){
               for(let child=0;child<children.length;child++){

                    let {height} = children[child].getBoundingClientRect();
                    let top,left;
                    if(child<numx){
                        top = 0;
                        sizeMap[child] = height;
                        
                    }else{
                        top = sizeMap[child-numx];
                        sizeMap[child] = sizeMap[child-numx]+height;
                    }
                    left =remainder +(((child%numx))*childWidth);
                    children[child].setAttribute('style',`top:${top}px;left:${left}px`);
                }
            }
           }

        }
    }



    },[displayNotes,containerDiv])
    return (
        <>
        <SearchBar/>
        <div>

        <NotesStyledContainer>

            <SideBar labels={state.labels} selectedLabel = {state.selectedLabel} updateSelectedLabel = {updateSelectedLabel}/>
            <NotesInnerContainer>

                <CreateNote {...props}/>
                <div className='p-2 flex relative' ref={containerDiv}>

                {
                    state.displayNotes.map((note) => {
          return (
              <Card className='absolute top transition-all  duration-1000 ' note={note} />
          );
                })}
                </div>

                </NotesInnerContainer>
                </NotesStyledContainer>
        </div>

                </>
    )
}