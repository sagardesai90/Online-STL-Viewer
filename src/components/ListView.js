import React, { Component } from 'react';
import Jsc3dViewer from 'react-jsc3d';
import ListItem from './ListItem';
import ButtonA1 from '../assets/ButtonA-Shot1.stl';

const ListView = ({ files }) => {
    const { selectedFile } = files;
    if(selectedFile){
        let view = <ListItem file={selectedFile}/>
        console.log("selectedFile exists");
    } else {
        let view = <Jsc3dViewer sceneUrl = {ButtonA1} />
        console.log("ButtonA1 rendered");
    }

    const onClick = (event) => {
        console.log(this.files, "selectedFile");
    }
    return (
        <div >
            <view />
            <button onClick={this.onClick}>here</button>
        </div>
    )
}

export default ListView;