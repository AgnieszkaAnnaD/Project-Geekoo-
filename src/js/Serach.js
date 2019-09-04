import React, {Component} from "react";
import ComicsListPage from "./ComicsListPage";
import constants from "./constants";

class Search extends Component {

  state = {
    select: "",
    input: "",
    maxPages: 0,
    currentPage: 0,
    loading: false,
    comics: []
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

  ownBtnClick = () => {
    console.log("click")
  }

  toBuyBtnClick = () => {
    console.log("click")
  }

  calculateMaxPagesHandler = allItemsCount => {
    const maxPages = Math.floor(allItemsCount / 20);
    this.setState({
      maxPages
    });
  }

  startSearchHandler = () => {
    this.loadCurrentPage();
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
        <li onClick={() => { this.changeCurrentPage(i) }}>
          <span>{ i + 1 }</span>
        </li>
      )
    }
    return (
      <ul>
        { links }
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
            <form>
              <select
                value={select}
                onChange={this.handleChange}
                name="search by"
                className="searchContainer-select"
              >
                <option value="" disabled selected>Choose category</option>
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
            <ComicsListPage select={select} comics={comics}/>
            { this.renderPagination() }
          </div>
        </div>
      </>
    )
  }
}

export default Search;