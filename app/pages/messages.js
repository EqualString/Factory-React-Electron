'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import MessagesContainer from '../components/MessagesContainer.js';

import store  from '../libs/store.js';
import { pushItem } from '../libs/helpers.js';

class MessagesScreen extends React.Component{
    constructor(){
        super();
        const data = store.getState();

        this.state = {
            messages: data.messages
        };

        this.handleMessageEdit = this.handleMessageEdit.bind(this);
    }
    componentWillMount(){
        document.title = "Factory - Messages";
    }
    handleMessageEdit(newMessages){
        this.setState({ 
            messages: newMessages
        });
        store.dispatch({type: "SET_USER_MESSAGES" , payload: newMessages});
    }
    render(){
        return(
            <div className="messages-page">
                <div className="wrapper fadeIn">
                    <div className="container">
                        <div className="link"> 
                            <Link to="/profile">&#x2190; Back to profile</Link>  
                        </div>
                        <MessagesContainer 
                            messages={this.state.messages}
                            onMessageEdit={this.handleMessageEdit}
                        /> 
                    </div>        
                </div>
            </div>
        );
    }
}

export default MessagesScreen;