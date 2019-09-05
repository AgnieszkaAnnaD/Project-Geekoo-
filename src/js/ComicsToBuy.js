import React, { Component } from "react";
import Store from "./Store";

class ComicsToBuy extends Component {
    constructor(props){
        super(props);
        this.state = {
            comics: Store.getValue("comicsToBuy")
        }
      }

    removeBtn(comic){
        const newList = this.state.comics.filter(
            e => e !== comic
        );
        Store.setValue("comicsToBuy", newList)
        this.setState({
            comics: newList,
        });   
    }

    render(){
        const {comics} = this.state;
        let newList;
        
        newList = comics.map((e, index) => (
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
                <td className="tdNarrow"><button className="button" onClick={()=>this.removeBtn(e)}>REMOVE</button></td>
            </tr>))

        if(comics.length > 0){
            return (
                <table className="tableOfResults">
                    <thead>
                        <tr>
                            <th>
                                TITLE
                            </th>
                            <th>
                                COVER
                            </th>
                            <th>
                                PRICE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newList}
                    </tbody>
                </table>
            )
        }else{
            return( 
            <div className="collectionCount">
                <h1>YOU DON'T HAVE ANY COMICS ON YOUR SHOPPING LIST YET!</h1>
            </div>)
  
        }
    }
}

export default ComicsToBuy