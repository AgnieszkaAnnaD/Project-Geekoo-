import React, {Component} from "react";
import ReactDOM from "react-dom";

class Header extends Component{
    
    render(){
        return(
         <div className = "HeaderContainer">
            <h1 className = "HeaderContainer-hello">Hello {localStorage.getItem("name")}</h1>
         </div>
        )
    }
}

export default Header