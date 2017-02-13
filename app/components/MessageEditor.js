'use strict';

import React from 'react';

let ClickOutHandler = require('react-onclickout');

class MessageEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.id,
            message: this.props.message,
            open: this.props.editing,
            maxLength: this.props.maxLength,
            charCounter: this.props.maxLength - this.props.message.length
        };

        //Bindings
        this.openEditor = this.openEditor.bind(this);
        this.onClickOut = this.onClickOut.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
        this.removeEditor = this.removeEditor.bind(this);
        this.undoChanges = this.undoChanges.bind(this);

    }
    componentDidMount(){
        //Stilovi za contentEditable
        this.refs[this.state.id].style['fontSize'] = '15px';
        this.refs[this.state.id].style['lineHeight'] = '1.42857143';
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.editing === false){ //Ako se "edit" zatvara vrati sve na staro
            this.undoChanges();
        }
        if(nextProps.editing !== this.state.open){
            this.setState({ open: nextProps.editing});
        }
        if(nextProps.message !== this.state.message){
            this.setState({ message : nextProps.message});
        }
    }
    openEditor(){
        //Vrati parent-u da handla otvorene editore
        //Samo jedan može trenutno biti otvoren :-)
        this.props.isOpen(this.state.id);
    }
    onClickOut(){
        //Click izvan komponente (Wraper-a)
        //Zatvori "editor" i napravi undo
        this.setState({open: false});
        this.undoChanges();
    }
    handleTextChange(e){
        //React ne može kontrolirati input u contentEditable div-u
        //Onemogućuje se unos veći od this.state.maxLength
        const message = this.refs[this.state.id].innerHTML;
        const charsLeft = this.state.maxLength - message.length;
        if(charsLeft >= 0){
            this.setState({
                charCounter: charsLeft
            });
        }
        else if(e.which != 8){ //Backspace support
            e.preventDefault();
            return;
        } 
    }
    saveEditor(){
        //Spremanje nove vrijednosti u "editoru"
        const message = this.refs[this.state.id].innerHTML;
        if(message === ''){
            this.refs[this.state.id].focus();
            return;
        }
        this.props.onSave(this.state.id, message);
    }
    removeEditor(){
        //Brisanje "editora" (poruke)
        this.props.onRemove(this.state.id);
    }
    undoChanges(){
        //Undo promjene editora
        //Poziva se i ako se automatski editor zatvara od strane parenta tj. otvaranjem drugog "editora" ili klikom bilo gdje drugdje osim na komponentu
        this.refs[this.state.id].innerHTML = this.state.message;
        const charsLeft = this.state.maxLength - this.state.message.length;
        this.setState({ charCounter: charsLeft });
    }
    render(){ 
        //contentEditable={true} -> Editabilni div
        //suppressContentEditableWarning={true} -> miče React-ov Warning da oni ne mogu odgovarati za innerHTML div-a 
        return(
            <div className="message">
                <ClickOutHandler onClickOut={this.onClickOut}>
                    <a onClick={this.openEditor}>
                        <div 
                            contentEditable={true} 
                            suppressContentEditableWarning={true} 
                            className={(this.state.open === true) ? "form-control message-edit-opened" : "form-control message-edit-closed"}
                            placeholder="Your message" 
                            ref={this.state.id} 
                            onKeyUp={this.handleTextChange} 
                            onKeyDown={this.handleTextChange}>

                        {this.state.message}
                        
                        </div> 
                    </a>
                    <div className={(this.state.open === true) ? "editor-btns fadeIn" : "hidden fadeIn"}>
                        <button className="btn" onClick={this.saveEditor}>Save</button>
                        <button className="btn" onClick={this.removeEditor}>Remove</button>
                        <button className="btn" onClick={this.undoChanges}>Undo</button>
                        <p><span>{this.state.charCounter}</span> characters left</p>
                    </div>  
                </ClickOutHandler>  
            </div>       
        );
    }
}

export default MessageEditor;