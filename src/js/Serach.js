import React, {Component} from "react";
import ComicsListPage from "./ComicsListPage";
import constants from "./constants";
import ComicsOwned from "./ComicsOwned";

class Search extends Component {

  state = {
    select: "",
    input: "",
    maxPages: 0,
    currentPage: 0,
    loading: false,
    comics: []
  }

  componentDidUpdate() {
    this.setState({
      loading: false,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.startSearchHandler()
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

  calculateMaxPagesHandler = allItemsCount => {
    const maxPages = Math.floor(allItemsCount / 20);
    this.setState({
      maxPages
    });
  }

  startSearchHandler = () => {
    this.loadCurrentPage();
    this.setState({
      loading:true
    })
  }

  loadCurrentPage = () => {
    const {select, input, currentPage} = this.state;
    let now = new Date().getTime();
    let hash = CryptoJS.MD5(`${now}${constants.PRIVATE_KEY}${constants.API_KEY}`);
    let marvelApi;
    if (select === "comics"){
      marvelApi = `http://gateway.marvel.com/v1/public/${select}?apikey=${constants.API_KEY}&ts=${now}&hash=${hash}&titleStartsWith=${input}&offset=${currentPage}`
    }
    if (select === "characters"){
      marvelApi = `http://gateway.marvel.com/v1/public/${select}?apikey=${constants.API_KEY}&ts=${now}&hash=${hash}&nameStartsWith=${input}&offset=${currentPage}`
    }
    fetch(marvelApi)
      .then(resp => resp.json())
      .then((response)=>{
        this.setState({
          comics: response.data.results
        }, () => {
          this.calculateMaxPagesHandler(response.data.total)
        });
      })
      .catch(err => console.error(err));
  }

  changeCurrentPage = currentPage => {
    this.setState({
      currentPage
    }, this.loadCurrentPage);
  }

  renderPagination = () => {
    const { maxPages } = this.state;
    const links = [];
    for(let i=0; i <= maxPages; i++){
      links.push(
        <li onClick={() => { this.changeCurrentPage(i) }} key={i}>
          <span>{ i + 1 }</span>
        </li>
      )
    } 
    
    if (maxPages<1){
      return ""
      }
    // else if(this.state.currentPage !==0){

      // let n1;
      // let n2;
      // (this.state.currentPage<this.state.maxPages ? n1 === 1 : n1 === 0 )
    
      // (this.state.currentPage>0 ? n2 === 1 : n2 === 0 );

      // let prev = (this.state.currentPage - n2);
      // let next = (this.state.currentPage + n1);    
       //   <li onClick={() => { this.changeCurrentPage(prev) }}>
          //     <span>prev</span>
          //   </li>
            // { links}
            

      return (
          <ul className="pagination">
            <li onClick={() => { this.changeCurrentPage(this.state.currentPage -1) }}>
              <span>prev</span>
            </li>
            {links}
            <li onClick={() => { this.changeCurrentPage(this.state.currentPage +1) }}>
              <span>next</span>
            </li>
          </ul>
        )
   

  }
  render() {
    const { comics, select, input } = this.state;
    let error;
    if (input.length < 1 || select === "") {
      error = (
        <div className="searchError">
          <h1>{localStorage.getItem("name")}, you need to tell me what are you looking for</h1>
        </div>
      );
    }

    return (
      <>
        <div>
          {error}
          <div className="searchContainer">
            <form onSubmit={this.handleSubmit}>
              <select
                // value={select}
                onChange={this.handleChange}
                name="search by"
                className="searchContainer-select"
              >
                <option disabled selected>Choose category</option>
                <option value="characters">Characters</option>
                <option value="comics">Comics title</option>
              </select>
              <input value={input} onChange={this.handleInputChange} placeholder="Enter what you search for"
                     className="sarchContainer-input"></input>
              <input
                type="button"
                className="button"
                value="SEARCH"
                onClick={this.startSearchHandler}
              />
            </form>
            
          </div>
          <ComicsListPage select={select} comics={comics}/>
          
        </div>
        <div className="paginationContainer">
          { this.renderPagination(this.state.currentPage) }
        </div>
      
      </>
    )
  }
}

export default Search;