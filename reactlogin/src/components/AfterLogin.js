import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import './App.css';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import UploadedFiles from "./UploadedFiles";
import Showactivity from "./Showactivity";
import Login from "./Login";
import TextField from 'material-ui/TextField';

import Typography from 'material-ui/Typography';


class AfterLogin extends Component {

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                        });
                }
            });

    };




    handleActivity = () => {
                    API.showActivity()
                        .then((data) => {
                            this.setState({
                                activity: data,
                                dispactivity:true
                            });
                        });


    };


    constructor() {
        super();
        this.state = {
            dispactivity:false,
            images: [],
            activity:[]
        };
    }

    componentDidMount() {
        API.getImages()
            .then((data) => {
                console.log(data);
                this.setState({
                    images: data
                });
            });
        API.showActivity()
            .then((data) => {
                console.log(data);
                this.setState({
                    activity: data
                });
            });
    };

    render() {
        return (
            <div >
                <br/>
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" height="40"/>
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" height="40" />
                <button className={'rightfloat'}  onClick={() => this.props.handleLogout()}>Logout</button>
                <hr/>
                <button className={'leftfloat'} onClick={this.handleActivity}>Activity</button>
                <a className={'acc_det'} href="/details">Account_details</a>
                <Typography
                    align={'right'}
                    type="title"
                >
                    Upload
                </Typography>
                <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
               <UploadedFiles images={this.state.images}/>
                {this.state.dispactivity?<Showactivity activity={this.state.activity}/>:''}

            </div>

        );
    }
}

export default AfterLogin;

