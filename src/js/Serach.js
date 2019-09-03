import React, {Component} from "react";
import ReactDOM from "react-dom";
import ComicsListPage from "./ComicsListPage";

class Search extends Component{

    state = {
        select: "",
        input: "", 
        maxPages: 0,
        currentPage: 0,
        loading: false,
        comics: []
    }

    
    componentDidMount() {
        const { select, input, comics } = this.state;
        
        window.addEventListener('scroll', () => {
            console.log([
                window.scrollY, document.querySelector("#app").clientHeight,document.querySelector("#app").clientHeight-400,this.state.loading
            ])
            if(window.scrollY >= document.querySelector("#app").clientHeight-1500 && this.state.loading === false) {
                console.log("scroll");
                this.setState({
                    currentPage: this.state.currentPage +1
                }, 
                () => {
                    
                    const el = <ComicsListPage
                    calculateMaxPages={this.calculateMaxPagesHandler}
                    page={this.state.currentPage}
                    select={select}
                    input={input}
                    isLoading = {this.isLoadingHandler}
                  />
                  const oldComics = [...comics];
                  oldComics.push(el);
                  this.setState({
                      comics: oldComics
                  })
                }
                )
            }
        })
    }

    componentDidUpdate() {
        const { select, input, comics } = this.state;
            if(comics.length === 0 && select.length>0 && input.length>0){
                const oldComics = [...comics];
                  
                oldComics.push(<ComicsListPage
                    calculateMaxPages={this.calculateMaxPagesHandler}
                    page={this.state.currentPage}
                    select={select}
                    input={input}
                    isLoading = {this.isLoadingHandler}
                />)
                this.setState({
                    comics: oldComics
                })
        }
    }

    isLoadingHandler = () => {
        this.setState({
            loading: true
        })
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
            maxPages,
            loading:false
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
                    isLoading = {this.isLoadingHandler}
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
                isLoading = {this.isLoadingHandler}
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
                <div>
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
                    { this.state.comics }
                </div>    
            </>
        )
    }
}

export default Search;