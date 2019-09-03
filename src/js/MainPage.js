import React, {Component} from "react";
import ReactDOM from "react-dom";

import APIConnect from "./APIConnect";
import Header from "./Header";
import Search from "./Serach";

class Main extends Component{
    render(){
        return(
            <>
            <div className = "MainContainer">
            <Header/>
            <Search/>
            {/* <Footer/> */}
            <span className = "origin-note">Data provided by Marvel. © 2014 Marvel</span>
            </div>
            </>
        )
    }
}

export default Main