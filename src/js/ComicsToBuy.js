import React, { Component } from "react";
import Store from "./Store";

class ComicsToBuy extends Component {
    constructor(props){
        super(props);
        this.state = {
            comics: Store.getValue("comicsToBuy")
        }
      }
    render(){

        let newList;
          newList = this.state.comics.map((e, index) => (
            <tr key = {index}>
              <td> 
                {e.comic.format} : {e.comic.title}
            </td>
            <td className="tdNarrow">
                <img src={e.comic.thumbnail.path + "/portrait_fantastic.jpg"}/>
            </td>
            <td className="tdNarrow">
                <span>{e.comic.prices[0].price} $</span>
            </td>
            </tr>))
        return (
        <table className="tableOfResults">
            <thead>
                <th>
                    TITLE
                </th>
                <th>
                    COVER
                </th>
                <th>
                    PRICE
                </th>
            </thead>
            <tbody>
            {newList}
            </tbody>
        </table>
      )
    }
}

export default ComicsToBuy