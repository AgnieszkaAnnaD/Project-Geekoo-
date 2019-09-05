import React, { Component } from "react";
import Store from "./Store";

class ComicsOwned extends Component {
    constructor(props){
        super(props);
        this.state = {
            comics: Store.getValue("comicsOwned")
        }
      }

    removeBtn(comic){
    const newList = this.state.comics.filter(
            e => e !== comic
        );
        Store.setValue("comicsOwned", newList)
        this.setState({
            comics: newList,
        });   
    }  

    render(){
        const {comics} = this.state;
        let comicsCount = comics.length

        let newList;
          newList = comics.map((e, index) => (
            <tr key = {index}>
              <td> 
                {e.comic.format} : {e.comic.title}
            </td>
            <td className="tdExtraNarrow">{e.comic.pageCount} pages</td>
            <td className="tdNarrow">
                <img src={e.comic.thumbnail.path + "/portrait_fantastic.jpg"}/>
            </td>
            <td className="tdNarrow"><button className="button" onClick={()=>this.removeBtn(e)}>REMOVE</button></td>
            </tr>))
        if (comicsCount > 0){
            return (
            <>
                <div className="collectionCount">
                    <h1>WOW! YOUR COLLECTION COUNTS <span>{comicsCount}</span> COMICS! </h1>
                </div>
                <table className="tableOfResults">
                    <thead>
                        <tr>
                            <th>
                                TITLE
                            </th>
                            <th>
                                PAGE COUNT
                            </th>
                            <th>
                                COVER
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {newList}
                    </tbody>
                </table>
            </>
        )
        }else {
            return (
                <div className="collectionCount">
                    <h1>YOU DON'T HAVE ANY COMICS YET!</h1>
                </div>
            )
        }
        
    }
}

export default ComicsOwned
