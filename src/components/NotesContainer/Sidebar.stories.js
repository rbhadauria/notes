import React from 'react';
import {SideBar} from './SideBar';
import '../../assets/styles.css'
import { action } from '@storybook/addon-actions';

export default {
    title:'Sidebar',
    component:SideBar
}


export const Normal = ()=><SideBar labels={['notes','deleted']} selectedLabel='deleted'/>
