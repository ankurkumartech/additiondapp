// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       <form>
//         <label>
//           Number 1:
//           <input type="text" name="name" />
//         </label>
//       </form>
//       <form>
//         <label>
//           Number 2:
//           <input type="text" name="name" />
//         </label>
//       </form>
//       <input type="submit" value="Submit" />
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { Component, useRef, state } from "react";
import React,{Component} from "react";
import {MYCONTRACT_ADDRESS, MYCONTRACT_ABI} from "./config"
import Web3 from 'web3';

class App extends Component{

  state = { storageValue: 0, web3: null, accounts: null, contract: null, number: null };

  constructor(props) {
    super(props);
    this.noOneRef = React.createRef();
    this.noTwoRef = React.createRef();

  }
  componentDidMount = async() => {
    this.loadBlockchainData()
  }

  componentWillMount() {
    this.setState({storageValue:34})

}

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const networkId = await web3.eth.net.getId()
    const network = await web3.eth.net.getNetworkType()
    const getAccounts = await web3.eth.getAccounts()


    var contractInstance = new web3.eth.Contract(MYCONTRACT_ABI, MYCONTRACT_ADDRESS);
    
  }

  getResult = async () => {
    console.log("callled")
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    var contractInstance = new web3.eth.Contract(MYCONTRACT_ABI, MYCONTRACT_ADDRESS);
    var resultValue = await contractInstance.methods.result().call()
    this.setState({number: resultValue})
    console.log("aaaa",resultValue)

    console.log("a",this.number)
  }

  addNumbers = async () => {
    var noOne = this.noOneRef.current.value
    var noTwo = this.noTwoRef.current.value
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    var contractInstance = new web3.eth.Contract(MYCONTRACT_ABI, MYCONTRACT_ADDRESS);
    const getAccounts = await web3.eth.getAccounts()
    var answer = await contractInstance.methods.Addition(noOne,noTwo).send({from:getAccounts[0]})
  }

  render() {
    return (
      <>
       <h1>Addition</h1>
       <div className="Body">
          <p>Enter first number: </p>
          <input ref={this.noOneRef} type="text" />
          <p>Enter second number: </p>
          <input ref={this.noTwoRef} type="text" />
          <p>
          <button onClick={this.addNumbers}> Add </button>
          </p>
          <p>
          <button onClick={this.getResult}> Get current result: {this.number} </button>
          </p>
        </div>
      </>
    );
  }
}

export default App;


