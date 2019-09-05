import React, {Component} from "react";
import Store from "./Store"

class ComicsListPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      comics: props.comics,
      comicsToBuy: [],
      comicOwned: [],
      loading: this.props.loading
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.comics !== this.props.comics){
      this.setState({
        comics: this.props.comics,
      });
    }
  }

  ownBtnClick = comic =>{
    const prevOwned = Store.getValue("comicsOwned");
    const comicsOwned = [
      ...prevOwned,
      {comic}
    ];
    Store.setValue("comicsOwned", comicsOwned)
  }
  

  toBuyBtnClick = comic => {
    const prevAddToBuy = Store.getValue("comicsToBuy");
    const comicsToBuy = [
      ...prevAddToBuy,
      {comic}
    ];
    Store.setValue("comicsToBuy", comicsToBuy)
  }

  render(){
    const { comics,  } = this.state;
    const { select, loading} = this.props;

    if(loading === true && comics.length === 0 ){
      return (
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>)
    }
    
    else if(comics.length === 0 && loading === false ){
      return ""
    }

    let newList;
    if (select === "comics"){
      
      newList = comics.map((e, index) => (
        <tr key = {index}>
          <td>
            <p>{e.title}</p>
          <br></br>
            <span className="tdCreators">CREATORS: 
              <ul>
              {
                e.creators.items.map((e, index)=>
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
            </span>
          </td>
          <td className="tdExtraNarrow">{e.pageCount} pages</td>
          <td className="tdNarrow">
            <img src={e.thumbnail.path + "/portrait_fantastic.jpg"}/>
          </td>
          <td className="tdNarrow">
            <button onClick={() => this.ownBtnClick(e)} className="button">I have this one</button>
            <button onClick={() => this.toBuyBtnClick(e)} className="button">I want to buy it</button>
          </td>
        </tr>))
    } else if (select === "characters"){
      newList = comics.map((e, index) => (
        <tr key={index}>
          <td><p>{e.name}</p></td>
          <td>
            <img src={e.thumbnail.path + "/portrait_fantastic.jpg"}/>
          </td>
          <td className = "seriesTd">
            <ul className="charactersList">
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

      if (select === "characters"){
        return (
          <table className="tableOfResults">
            <thead>
              <tr>  
                <th>CHARACTER NAME</th>
                <th>AVATAR</th>
                <th>SERIES</th>
              </tr>
            
            </thead>
            <tbody>
              {newList}
            </tbody>
          </table>
        )
      }else if (select === "comics"){
        return(
          <table className="tableOfResults">
          <thead>
            <tr>  
              <th>TITLE</th>
              <th>PAGE COUNT</th>
              <th>COVER</th>
              <th>ACTION</th>
            </tr>
          
          </thead>
          <tbody>
            {newList}
          </tbody>
        </table>
        )
      }


    }
  }

export default ComicsListPage;