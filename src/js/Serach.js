import React, {Component} from "react";
import ReactDOM from "react-dom";
import ComicsListPage from "./ComicsListPage";

class Search extends Component{

    state = {
        select: "",
        input: "", 
        maxPages: 0,
        currentPage: 0,
    }

    handleChange = (e) => {
        this.setState({
            select: e.target.value
        })
    }

    handleInputChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    ownBtnClick = () =>{
        console.log("click")
    }

    toBuyBtnClick = () =>{
        console.log("click")
    }

    calculateMaxPagesHandler = allItemsCount => {
        const maxPages = Math.floor(allItemsCount / 20);
        this.setState({
            maxPages
        });
    }

    renderComicsLists = () => {
        const { maxPages, select, input } = this.state;
        const comicsLists = [];
        if(maxPages > 0){
            for(let i=0; i < maxPages; i++){
                comicsLists.push(
                  <ComicsListPage
                    calculateMaxPages={this.calculateMaxPagesHandler}
                    page={i}
                    select={select}
                    input={input}
                  />
                )
            }
        }else{
            comicsLists.push(
              <ComicsListPage
                calculateMaxPages={this.calculateMaxPagesHandler}
                page={0}
                select={select}
                input={input}
              />
            )
        }
        return comicsLists;
    }

    render(){
        let error;
        if (this.state.input.length < 3 || this.state.select === ""){
            error = (
              <div className = "searchError">
                  <h1>{localStorage.getItem("name")}, you need to tell me what are you looking for</h1>
              </div>
            );
        }

        return(
            <>
                {error}
                <div className = "searchContainer">
                    <form onSubmit = {this.handleSubmit}>
                        <select
                          value={this.state.select}
                          onChange={this.handleChange}
                          name="search by"
                          className="searchContainer-select"
                        >
                            <option value="">Choose category</option>
                            <option value = "characters">Characters</option>
                            <option value = "comics">Comics title</option>
                            <option></option>
                        </select>
                        <input value = {this.state.input} onChange = {this.handleInputChange} placeholder = "Enter what you search for" className = "sarchContainer-input"></input>
                        <input type = "submit" className = "button" value = "SEARCH"></input>
                    </form>
                </div>
                { this.renderComicsLists() }
            </>
        )
    }
}

export default Search;