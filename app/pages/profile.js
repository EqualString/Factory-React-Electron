'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import MessagesContainer from '../components/MessagesContainer.js';

import store  from '../libs/store.js';
import { pushItem } from '../libs/helpers.js';

class ProfileScreen extends React.Component{
    constructor(){
        super();

        //Redux podaci za "hardcoding"
        const data = store.getState();

        this.state = {
            name: data.info.name,
            email: data.info.email,
            coverImg: data.coverImage,
            profileImg: data.profileImage,
            newMessage: '',
            charCounter: 500,
            messages: data.messages,
            editorsClose: false, 
            loader: 0
        };

        this.handleCoverImageChange = this.handleCoverImageChange.bind(this);
        this.handleProfileImageChange = this.handleProfileImageChange.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.addNewMessage = this.addNewMessage.bind(this);
        this.handleMessageEdit = this.handleMessageEdit.bind(this);
        this.closeOpenedEditors = this.closeOpenedEditors.bind(this);

    }
    componentWillMount(){
        document.title = "Factory - Profile";
    }
    handleCoverImageChange(e){
        const input = e.currentTarget;
        const self = this;
        const reader = new FileReader();

        this.closeOpenedEditors(); //Bugfix

        reader.onload = function(){
            const URL = reader.result;
            self.setState({
                coverImg: URL
            });
            store.dispatch({type: "SET_USER_COVER_IMAGE" , payload: URL});
        };

        reader.readAsDataURL(input.files[0]);
    }
    handleProfileImageChange(e){
        const input = e.currentTarget;
        const self = this;
        const reader = new FileReader();

        this.closeOpenedEditors();

        reader.onload = function(){
            const URL = reader.result;
            self.setState({
                profileImg: URL
            });
            store.dispatch({type: "SET_USER_PROFILE_IMAGE" , payload: URL});
        };

        reader.readAsDataURL(input.files[0]);
    }
    handleTextareaChange(e){
        const charsLeft = this.refs.textArea.maxLength - e.target.value.length;
        this.closeOpenedEditors();
        this.setState({
            newMessage: e.target.value,
            charCounter: charsLeft
        });
    }
    addNewMessage(){
        //Dodavanje nove poruke na kraj array-a
        if(this.state.newMessage === ''){
            this.refs['textArea'].focus();
            return;
        }
        const newMessages = pushItem("message", this.state.newMessage, this.state.messages);
        this.setState({
            newMessage: '',
            messages: newMessages
        });
        store.dispatch({type: "SET_USER_MESSAGES" , payload: newMessages});
    }
    handleMessageEdit(newMessages){
        //Spremanje novih poruka u state i dispatch u Redux store
        this.setState({ 
            messages: newMessages
        });
        store.dispatch({type: "SET_USER_MESSAGES" , payload: newMessages});
    }
    closeOpenedEditors(){
        //Bugfix ako je bio otvoren editor koji se automatski zatvorio "outside" kilik eventom
        //Sam bi se otvorio nakon ponovnog rendera funkcije..
        this.setState({editorsClose: true});
    }
    render(){
        return(
            <div className="profile-page">
                <div className="wrapper fadeIn">
                    <div className="cover-image">
                        <div className="cover-image-change">
                            <input 
                                id="new-cover-image"
                                ref="new-cover-image"
                                type="file"
                                className="hidden-file-input" 
                                onChange={this.handleCoverImageChange}
                                accept="image/*"
                            />
                            <label htmlFor="new-cover-image"><img src="./img/edit.png"/></label>
                        </div>
                        <img src={this.state.coverImg}/>
                    </div>
                    <div className="user-profile-info">
                        <div className="profile-image">
                            <div className="profile-image-change">
                                <input 
                                    id="new-profile-image"
                                    ref="new-profile-image"
                                    type="file" 
                                    className="hidden-file-input" 
                                    onChange={this.handleProfileImageChange}
                                    accept="image/*"
                                />
                                <label htmlFor="new-profile-image"><img src="./img/edit.png"/></label>
                            </div>
                            <img src={this.state.profileImg}/>
                        </div>     
                    </div>    
                    <div className="user-info">
                        <h1>{this.state.name}</h1>
                        <p>{this.state.email}</p>
                    </div>
                    <div className="container">
                        <div className="new-message">
                            <textarea
                                className="form-control"
                                ref="textArea"
                                value={this.state.newMessage}
                                onChange={this.handleTextareaChange}
                                placeholder="Your message"
                                maxLength="500"
                            />
                            <button onClick={this.addNewMessage} className="btn">Submit</button>
                            <p><span>{this.state.charCounter}</span> characters left</p>
                        </div>
                        <MessagesContainer 
                            messages={this.state.messages}
                            onMessageEdit={this.handleMessageEdit}
                            closeAll={this.state.editorsClose}
                            maxRender="5"
                        />
                        <div className="link">
                            <Link className={(this.state.messages.length > 5) ? "fadeIn" : "hidden"} to="/messages">All messages &#x2192;</Link>
                        </div>    
                    </div>
                </div> 
             </div>      
        );
    }
}

//DataFlow: ProfileScreen -> MessagesContainer -> MessageEditor
//Callbackom se vraća vrijednost poruka obratno te sprema u Redux

export default ProfileScreen;