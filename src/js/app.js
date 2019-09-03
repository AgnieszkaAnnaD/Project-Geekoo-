import React, {Component} from "react";
import ReactDOM from "react-dom";
import FirstEntry from "./FirstEntry"

import './../sass/style.scss';

const App = () => <>
<FirstEntry/>
</>


ReactDOM.render(<App/>, document.getElementById("app"));