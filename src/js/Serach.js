import React, {Component} from "react";
import ReactDOM from "react-dom";

class Search extends Component{

    state = {
        select: "",
        input: "", 
        data: []
    }

    // componentDidMount() {

    //     let privateKey = "cf19cc23d18c97ee5c5da91dde4d5648936aff81"
    //     let apikey = "1e3624de75fcb0f5e9b076008e176f2d";
    //     let now = new Date().getTime();
    //     let hash = CryptoJS.MD5(`${now}${privateKey}${apikey}`);
    //     const marvelApi = `http://gateway.marvel.com/v1/public/comics?apikey=${apikey}&ts=${now}&hash=${hash}`


        
    //     console.log(now)

    //     fetch(marvelApi)
         
    //         .then(resp => resp.json())
    //         .then(marvelAPI => 
    //          console.log(marvelAPI))
    //         // .then(function( response ) {
    //         //     var results = response.data.results;
    //         //     var resultsLen = results.length;
    //         //     var output = '<ul>'; 
                
    //         //     for(var i=0; i<resultsLen; i++){
    //         //       if(results[i].images.length > 0) {
    //         //         var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
    //         //         output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
    //         //       }
    //         //     }  
    //         //     output += '</ul>'
    //         //     $('#results').append(output);
    //         // })
    //         .catch(err => console.error(err));
    // }

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
        let privateKey = "cf19cc23d18c97ee5c5da91dde4d5648936aff81"
        let apikey = "1e3624de75fcb0f5e9b076008e176f2d";
        let now = new Date().getTime();
        let hash = CryptoJS.MD5(`${now}${privateKey}${apikey}`);
        const select = this.state.select;
        const input = this.state.input;
        let marvelApi; 
        if (select === "comics"){
            marvelApi = `http://gateway.marvel.com/v1/public/${select}?apikey=${apikey}&ts=${now}&hash=${hash}&titleStartsWith=${input}`
        }
        if (select === "characters"){
            marvelApi = `http://gateway.marvel.com/v1/public/${select}?apikey=${apikey}&ts=${now}&hash=${hash}&nameStartsWith=${input}`
        }
        
        console.log(now)
        
        fetch(marvelApi)
         
            .then(resp => resp.json())
            .then((response)=>{
                console.log(response.data.results)
                this.setState({
                data: response.data.results
            })
            })
            .catch(err => console.error(err));
    }

    ownBtnClick = () =>{
        console.log("click")
    }

    toBuyBtnClick = () =>{
        console.log("click")
    }

    render(){
        let newList;
        if (this.state.select === "comics"){
            newList = this.state.data.map((e, index) => (<tr key = {index}><td> {e.title}</td><td className = "tdNarrow"><img src = {e.thumbnail.path + "/portrait_fantastic.jpg"}/></td><td className = "tdNarrow"><button onClick = {this.ownBtnClick} className = "button">I have this one</button></td> <td button onClick = {this.toBuyBtnClick} className = "tdNarrow"><button className = "button">I want to buy it</button></td> </tr>))
        }
        else if (this.state.select === "characters"){
            newList = this.state.data.map((e, index) => (<tr key = {index}><td> {e.name}</td><img src = {e.thumbnail.path + "/portrait_fantastic.jpg"}/><td className = "seriesTd">{e.series.items.map((e, index)=> (<tr key = {index} ><td >{e.name}</td></tr>))}</td></tr>))
        }
        
        let error;
        if (this.state.input.length < 3 || this.state.select === ""){
            error = <div className = "searchError"><h1>{localStorage.getItem("name")}, you need to tell me what are you looking for</h1></div>
        }

        return(
            <>
            {error}
            <div className = "searchContainer">                
                <form onSubmit = {this.handleSubmit}>
                    <select value= {this.state.select} onChange ={this.handleChange} name = "search by" className = "searchContainer-select">
                        <option value="">Choose category</option>
                        <option value = "characters">Characters</option>
                        <option value = "comics">Comics title</option>
                        <option></option>
                    </select>
                    <input value = {this.state.input} onChange = {this.handleInputChange} placeholder = "Enter what you search for" className = "sarchContainer-input"></input>
                    <input type = "submit" className = "button" value = "SEARCH"></input>
                </form>
            </div>
            <table className = "tableOfResults">
                <tbody>
                    {newList}
                </tbody>
            </table>
            </>
        )
    }
}

export default Search;