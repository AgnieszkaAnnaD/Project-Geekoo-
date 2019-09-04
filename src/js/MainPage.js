import React, {Component} from "react";
import ReactDOM from "react-dom";
import Search from "./Serach";
import ComicsOwned from "./ComicsOwned";
import ComicsToBuy from "./ComicsToBuy";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            toRender: "",
        }
      }

    handleClickSearch = () => {
        this.setState({
            toRender: "search",
        })
    }

    handelClickOwned = () =>{
        this.setState({
            toRender: "owned",
        })
    }

    handleClickBuy = () => {
        this.setState({
            toRender: "buy",
        })
    }
    render(){
        let toRender;
        if (this.state.toRender === "search") {
            toRender = <Search/>
        }
        else if (this.state.toRender === "owned") {
            toRender = <ComicsOwned/>
        }
        else if (this.state.toRender === "buy") {
            toRender = <ComicsToBuy/>
        }

        return(
            <>
            <div className = "MainContainer">
                <div className = "HeaderContainer">
                    <ul className="HeaderContainer-navigation">
                        <li onClick = {this.handleClickSearch}><span>Search</span></li>
                        <li onClick = {this.handelClickOwned}><span>Owned Comics</span></li>
                        <li onClick = {this.handleClickBuy}><span>Comics to buy</span></li>
                    </ul>
                    <h1 className = "HeaderContainer-hello">Hello {localStorage.getItem("name")}</h1>
                </div>
            {toRender}
            <span className = "origin-note">Data provided by Marvel. © 2014 Marvel</span>
            </div>
            </>
        )
    }
}

export default Main