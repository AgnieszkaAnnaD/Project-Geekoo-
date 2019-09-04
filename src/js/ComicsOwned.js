import React, { Component } from "react";
import Store from "./Store";

class ComicsOwned extends Component {
    constructor(props){
        super(props);
        this.state = {
            comics: Store.getValue("comicsOwned")
        }
      }
    render(){

        let newList;
          newList = this.state.comics.map((e, index) => (
            <tr key = {index}>
              <td> 
                {e.comic.format} : {e.comic.title}
            </td>
            <td className="tdExtraNarrow">{e.comic.pageCount}</td>
            <td className="tdNarrow">
                <img src={e.comic.thumbnail.path + "/portrait_fantastic.jpg"}/>
            </td>
        
            </tr>))
        return (
        <table className="tableOfResults">
            <thead>
                <th>
                    TITLE
                </th>
                <th>
                    PAGE COUNT
                </th>
                <th>
                    COVER
                </th>
            </thead>
            <tbody>
            {newList}
            </tbody>
        </table>
      )
    }
}

export default ComicsOwned
