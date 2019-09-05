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

  // componentDidUpdate(prevState) {
  //   if(prevState.comics !== this.state.comics){
  //     this.setState({
  //       loading: false,
  //     })
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.startSearchHandler()
  }

  handleChange = (e) => {
    this.setState({
      tmpSelect: e.target.value
    })
  }

  handleInputChange = (e) => {
    this.setState({
      tmpInput: e.target.value
    })
  }

  calculateMaxPagesHandler = allItemsCount => {
    const maxPages = Math.floor(allItemsCount / 20);
    this.setState({
      maxPages
    });
  }

  startSearchHandler = () => {
    if(this.state.tmpSelect !== "" && this.state.tmpInput !== ""){
      this.loadCurrentPage();
      this.setState({
        loading: true
      })
    }  
  }

  loadCurrentPage = () => {
    const {select, input, currentPage, tmpSelect, tmpInput} = this.state;
    let now = new Date().getTime();
    let hash = CryptoJS.MD5(`${now}${constants.PRIVATE_KEY}${constants.API_KEY}`);
    let marvelApi;
    let startsWith;
    if (tmpSelect === "comics"){
      startsWith = "titleStartsWith"
    }
    if (tmpSelect === "characters"){
      startsWith = "nameStartsWith"
    }
    marvelApi = `http://gateway.marvel.com/v1/public/${tmpSelect}?apikey=${constants.API_KEY}&ts=${now}&hash=${hash}&${startsWith}=${tmpInput}&offset=${currentPage}`

    fetch(marvelApi)
      .then(resp => resp.json())
      .then((response)=>{
        this.setState({
          comics: response.data.results,
        }, () => {
          this.setState({
            select: tmpSelect
          });
          this.calculateMaxPagesHandler(response.data.total)
        });
      })
      .catch(err => console.error(err));
  }

  changeCurrentPage = currentPage => {
    this.setState({
      currentPage: currentPage
    }, this.loadCurrentPage);
  }

  renderPagination = () => {
    const { maxPages, currentPage} = this.state;
    const links = [];

    if (maxPages<1){
      return ""
    }

    else if (maxPages <= 10){
      for(let i=0; i <= maxPages; i++){
        links.push(
          <li onClick={() => { this.changeCurrentPage(i) }} key={i}>
            <span>{ i + 1 }</span>
          </li>
        )
      } 
    }
    else if (maxPages > 10 && currentPage < maxPages-5){
      for(let i=currentPage; i <= currentPage+5; i++){
        links.push(
          <li onClick={() => { this.changeCurrentPage(i) }} key={i}>
            <span>{ i + 1 }</span>
          </li>
        )
      }  
      links.push(
          <li>
            <span>...</span>
          </li>
        )   
    }
    
    // let style = "none";  
    // if (maxPages>10){
    //       for(let i=currentPage; i <= currentPage+5; i++){
    //         style = "block"
    //       }
    //       for(let i=maxPages-5; i <= maxPages; i++){
    //         style = "block"
    //       }
    //     }
    // for(let i=0; i <= maxPages; i++){
    //         links.push(
    //           <li onClick={() => { this.changeCurrentPage(i) }} style={{display: style}} key={i}>
    //             <span>{ i + 1 }</span>
    //           </li>
    //           )
    //       } 
    
  
          // if the page number is < 3, render the page number
          // if the page number is within +-2 of the current page, render the page number
          // if the page number is > the total number of pages -3 render the page number
          // if the last page number wasn't rendered and dots haven't already been rendered render dots '...' do indicate a gap
          
          // else do nothing
    

      let onClickPagePrev = Number(currentPage) -1; 
      let onClickPageNext = Number(currentPage) +1; 
      if(currentPage === 0){
        onClickPagePrev = 0
      }
      else if(currentPage === maxPages){
        onClickPageNext = maxPages
      }

      return (
        <ul className="pagination">
          <li onClick={() => { this.changeCurrentPage(onClickPagePrev) }}>
            <span>prev</span>
          </li>
          {links}
          <li onClick={() => { this.changeCurrentPage(onClickPageNext) }}>
            <span>next</span>
          </li>
        </ul>
        )
      }

  render() {
    const { comics, select, input, loading, tmpInput, tmpSelect } = this.state;
    
    let error;
    if (input.length < 1 || select === "") {
      error = (
        <div className="searchError">
          <h1>{localStorage.getItem("name")}, you need to tell me what are you searching for </h1>
          <h2>Choose category and name or title</h2>
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
                defaultValue="Choose category"
                onChange={this.handleChange}
                name="search by"
                className="searchContainer-select"
              >
                <option value="" disabled>Choose category</option>
                <option value="characters">Characters</option>
                <option value="comics">Comics title</option>
              </select>
              <input value={tmpInput} onChange={this.handleInputChange} placeholder="What are you searching for?"
                     className="sarchContainer-input"></input>
              <input
                type="button"
                className="button"
                value="SEARCH"
                onClick={this.startSearchHandler}
              />
            </form>
          </div>
          <ComicsListPage select={select} comics={comics} loading={loading}/>
          
        </div>
        <div className="paginationContainer">
          { this.renderPagination(this.state.currentPage) }
        </div>
      
      </>
    )
  }
}

export default Search;