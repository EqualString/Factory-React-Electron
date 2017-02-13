'use strict';

import React from 'react';
import MessageEditor from './MessageEditor.js';

import { removeItem, editItem } from '../libs/helpers.js';

class MessagesContainer extends React.Component{
    constructor(props){
        super(props);

        //Array koji će handlat-i otvorene editore
        var opened = [];
        opened.length = this.props.messages.length;
        opened.fill(false);

        this.state = {
            opened: opened 
        };

        this.renderMessages = this.renderMessages.bind(this);
        this.handleOpenedEditors = this.handleOpenedEditors.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        //Bugfix za re-render na parent-u
        //Samo set-a array za handlanje zbog update-a cover-a i profline slike
        if(nextProps.closeAll === true){
            var opened = this.state.opened;
            opened.fill(false);
            this.setState({opened: opened});
        }
    }
    handleOpenedEditors(index){
        var opened = this.state.opened;
        opened.fill(false);
        opened[index] = true;
        this.setState({opened: opened});
    }
    handleSave(index, value){
        var opened = this.state.opened;
        opened.fill(false);
        this.setState({opened: opened});

        const newMessageData = editItem(index, "message", value, this.props.messages);
        this.props.onMessageEdit(newMessageData);
    }
    handleRemove(index){
        var opened = this.state.opened;
        opened.fill(false);
        this.setState({opened: opened});

        const newMessageData = removeItem(index, this.props.messages);
        this.props.onMessageEdit(newMessageData);
    }
    renderMessages(){
        var index = this.props.messages.length;
        var renderedMessages = this.props.messages;

        var messages = renderedMessages.slice(0).reverse().map(function(data,i){
            index--;
            if(( i <= this.props.maxRender - 1)||(this.props.maxRender === undefined)){ //Vraćaj vrijednosti dok zadovoljava maxRender, ako je definiran kao prop
                 return (
                    <MessageEditor
                        key={index} 
                        id={index}
                        editing={this.state.opened[index]}
                        isOpen={this.handleOpenedEditors}
                       
                        onSave={this.handleSave}
                        onRemove={this.handleRemove}
                        maxLength="500"
                        message={data.message}
                    />
                 );
            }
        }.bind(this));

        return messages;
    }
    render(){
        return(
			<div className="messages-container">
				{this.renderMessages()}
			</div> 
        );
    }
}

export default MessagesContainer;