import React, {Component} from "react";
import ReactDOM from "react-dom";


class APIConnect extends Component {

    // state = {
    //     marvel: ""
    // }



   
    componentDidMount() {

        let privateKey = "cf19cc23d18c97ee5c5da91dde4d5648936aff81"
        let apikey = "1e3624de75fcb0f5e9b076008e176f2d";
        let now = new Date().getTime();
        let hash = CryptoJS.MD5(`${now}${privateKey}${apikey}`);
        const marvelApi = `http://gateway.marvel.com/v1/public/comics?apikey=${apikey}&ts=${now}&hash=${hash}`


        
        console.log(now)

        fetch(marvelApi)
         
            .then(resp => resp.json())
            .then(marvelAPI => 
             console.log(marvelAPI))
            .catch(err => console.error(err));
    }


    //     let marvelAPI = 'https://www.comicvine.com/api/characters?api_key=f70a9f494b2afd5ad1ad3ae85e1ffaf7da264223&format=json';
    //     fetch( marvelAPI, { 
    //         apikey: "f70a9f494b2afd5ad1ad3ae85e1ffaf7da264223",
    //         method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'no-cors', // no-cors, cors, *same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //     })
    //         .then(function( response ) {
    //          console.log(response)
    //       })
    // }
           
     

    render() {
        return(
            <>
          <div></div>
            </>
        )
    }
}

export default APIConnect;