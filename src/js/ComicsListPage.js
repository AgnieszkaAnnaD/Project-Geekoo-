import React, {Component} from "react";
import constants from "./constants";

class ComicsListPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      comics: []
    };
  }
  componentDidUpdate(prevProps) {
    if(prevProps.input !== this.props.input){
      this.loadComics();
    }
  }

  loadComics = () => {
    const { select, input, page, calculateMaxPages, isLoading } = this.props;

    let now = new Date().getTime();
    let hash = CryptoJS.MD5(`${now}${constants.PRIVATE_KEY}${constants.API_KEY}`);
    let marvelApi;
    if (select === "comics"){
      marvelApi = `http://gateway.marvel.com/v1/public/${select}?apikey=${constants.API_KEY}&ts=${now}&hash=${hash}&titleStartsWith=${input}&offset=${page}`
    }
    if (select === "characters"){
      marvelApi = `http://gateway.marvel.com/v1/public/${select}?apikey=${constants.API_KEY}&ts=${now}&hash=${hash}&nameStartsWith=${input}&offset=${page}`
    }

    isLoading()

    fetch(marvelApi)
      .then(resp => resp.json())
      .then((response)=>{
        calculateMaxPages(response.data.total);
        this.setState({
          comics: response.data.results
        })
      })
      .catch(err => console.error(err));
  }

  render(){
    const { comics } = this.state;
    const { select } = this.props;

    let newList;
    if (select === "comics"){
      newList = comics.map((e, index) => (
        <tr key = {index}>
          <td> {e.title}</td>
          <td className="tdNarrow">
            <img src={e.thumbnail.path + "/portrait_fantastic.jpg"}/>
          </td>
          <td className="tdNarrow">
            <button onClick={this.ownBtnClick} className="button">I have this one</button>
          </td>
          <td button onClick={this.toBuyBtnClick} className="tdNarrow">
            <button className="button">I want to buy it</button>
          </td>
        </tr>))
    } else if (select === "characters"){
      newList = comics.map((e, index) => (
        <tr key={index}>
          <td> {e.name}</td>
          <td>
            <img src={e.thumbnail.path + "/portrait_fantastic.jpg"}/>
          </td>
          <td className = "seriesTd">
            <ul key = {idex} className="charactersList">
            {
              e.series.items.map((e, index)=>
                (
                  <li key={index}>
                      <p>
                        {e.name}
                      </p>
                  </li>
                )
              )
            }
            </ul>
          </td>
        </tr>))
    }
    return (
      <table className="tableOfResults">
        <tbody>
          {newList}
        </tbody>
      </table>
    );
  }
}

export default ComicsListPage;