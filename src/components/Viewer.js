import React, { Component } from 'react';
import Jsc3dViewer from 'react-jsc3d';
import ButtonA1 from '../assets/ButtonA-Shot1.stl';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Viewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }
    }

    // onChangeHandler = event => {
    //     var files = event.target.files
    //     if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)){
    //         this.setState({
    //             selectedFile: files,
    //             loaded: 0
    //         })
    //     }else {
    //         console.log("out of if loop");
    //     }
    //     console.log("change handles clicked")
    // }

    onChangeHandler = event => {
        var files = event.target.files
        this.setState({
            selectedFile: files,
            loaded: 0
        })
        console.log("change handles clicked")
    }
    

    onClickHandler = () => {
        const data = new FormData() 
        for(var x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        axios.post("http://localhost:8000/upload", data, { 
        // receive two    parameter endpoint url ,form data
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            },
        })
        .then(res => { // then print response status
            console.log(res.statusText)
            toast.success('upload success')
         })
         .catch(err => {
             toast.error('upload failed')
         })
    }

    maxSelectFile = (event) => {
        let files = event.target.files //create file object
        if(files.length > 3){
            const msg = 'Only 3 images can be uploaded at a time';
            event.target.vlue = null
            console.log(msg)
            return false;
        }
        return true;
    }

    // checkMimeType=(event)=>{
    //     //getting file object
    //     let files = event.target.files 
    //     //define message container
    //     let err = []
    //     // list allow mime type
    //    const types = ['image/stl', 'image/png', 'image/jpeg', 'image/gif']
    //     // loop access array
    //     for(var x = 0; x<files.length; x++) {
    //      // compare file type find doesn't matach
    //          if (types.every(type => files[x].type !== type)) {
    //          // create error message and assign to container   
    //          err[x] = files[x].type+' is not a supported format\n';
    //        }
    //      };
    //      for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
    //          // discard selected file
    //         toast.error(err[z])
    //         event.target.value = null
    //     }
    //    return true;
    //   }

    checkFileSize = (event) => {
        let files = event.target.files;
        let size  = 15000;
        let err = [];
        for(var x = 0; x < files.length; x++){
            if(files[x].size > size){
                err[x] = files[x].type+'is too large, please pick a smaller file\n'
            }
        };
        // if(err !== ''){
        //     event.target.value = null;
        //     console.log(err)
        //     return false;
        // }
        for(let z = 0; z < err.length; z++){
            toast.error(err[z]);
            event.target.value = null;
        }
        return true;
    }

    render() {
        if (this.state.selectedFile){
            let view = <Jsc3dViewer sceneUrl = {this.state.selectedFile} />
        } else {
            let view = <Jsc3dViewer sceneUrl = {ButtonA1} />
        }
        return (
            <div>
                <div>
                    {/* <Jsc3dViewer sceneUrl = {this.state.selectedFile ? this.state.selectedFile : ButtonA1}/> */}
                    <view />
                    <input type="file" name="file" onChange={this.onChangeHandler} multiple/>
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                </div>
                <div className="form-group">
                    <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded,2)}%</Progress>
                    <ToastContainer />
                </div>
            </div>
        )
    }
}

export default Viewer;