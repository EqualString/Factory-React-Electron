'use strict';

import React from 'react';

//Loader, kao props prima vrijednost u % koju prikazuje
class TopLoader extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        const bar = this.refs.loaderBar;
            if(nextProps.show === 100){
                 bar.style.width = nextProps.show + '%'; 
                 setTimeout(function(){
                        bar.style.width = '0%';
                 },1880);
            } 
            else {
                 bar.style.width = nextProps.show + '%'; 
            }
    }
    render(){
        return(
            <div className={(this.props.show !== 0) ? "top-loader show" : "top-loader"}>
                <div ref="loaderBar" className="top-loader-bar"></div>
            </div>
        );
    }
}

export default TopLoader;