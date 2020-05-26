import React from 'react';
import {Card} from './Card';




export default{
    title:'Card',
    component:Card
}

export const normal = ()=><Card note={{title:'Title',content:' this is note content'}}/>