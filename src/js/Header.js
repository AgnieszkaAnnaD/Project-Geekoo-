import React, {Component} from "react";
import ReactDOM from "react-dom";
import Search from "./Serach"

class Header extends Component{
    
    render(){
        return(
         <div className = "HeaderContainer">
             <ul className="HeaderContainer-navigation">
                 <li><span>Search</span></li>
                 <li><span>Owned Comics</span></li>
                 <li><span>Comics to buy</span></li>
             </ul>
            <h1 className = "HeaderContainer-hello">Hello {localStorage.getItem("name")}</h1>
         </div>
        )
    }
}

export default Header