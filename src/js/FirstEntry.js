import React, {Component} from "react";
import ReactDOM from "react-dom";

import APIConnect from "./APIConnect";
import Main from "./MainPage"

class FirstEntry extends Component {

    state = {
        name: "",
        saved: false
    }

    handleChange = (e) =>{
        this.setState({
            name: e.target.value
        })
       
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            saved: true
        }) 
        let name = this.state.name;
        localStorage.setItem("name", (name))
    }
    render(){
        if (!(localStorage.getItem("name")) && this.state.saved == false){
        return(
            <div className = "firstEntryContainer"> 
                
                <div className = "firstEntryContainer-header">
                    <img className = "firstEntryContainer-gif" src="./src/img/12832.gif"></img>
                    <div>
                        <h2>WELCOME ON GEEKOO! </h2>
                        <h3>WHAT's YOUR NAME? </h3>
                    </div>
                </div>
               
                <form onSubmit = {this.handleSubmit} className = "firstEntryContainer-form">
                    <div className = "firstEntryContainer-inputs">
                        
                        <input value = {this.state.name} onChange = {this.handleChange} name = "name" className = "firstEntryContainer-form-input"></input>
                        <input type="submit" className = "button firstEntryContainer-form-submit" value="OK"></input>
                    </div>
                </form>
                
                <span className = "origin-note">Data provided by Marvel. © 2014 Marvel</span>
            </div>
        )}
        else {
            return <Main/>
        }
    }
}

export default FirstEntry;