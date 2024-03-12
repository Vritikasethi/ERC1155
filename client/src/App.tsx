import React ,{useState,useEffect}from 'react';
import './App.css';
import Body from './Body';
import {ethers} from 'ethers';
import abi from './assets/MyToken.json';

export interface IState{
provider:ethers.BrowserProvider | null;
signer:ethers.JsonRpcSigner | null;
contract: ethers.Contract | null;
}
interface IAccount{
  account:string|null;
}
const App : React.FC =()=> {
  const [state,setState]= useState<IState|null>(
    {
      provider:null,
      signer:null,
      contract:null
    }
  );
  const [accounts,setAccounts ]= useState<IAccount|null>({
    account:null
  });
  useEffect ( () =>{
    const connectWallet = async()=>{
      const contractAddress = "0x1eF6399104443800B5Db75Fc4D81aaF9474260f7";
      const contractAddressAbi = abi.abi;
      try{
        const {ethereum} = window;
        if(ethereum){
          const account = await ethereum.request({
            method:"eth_requestAccounts",
          });
          
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAddressAbi,
            signer
          );
          setAccounts({
            account:account[0]
          });
          setState({
            provider,signer,contract
          });

        }
        else{
         alert( "metamask is not installed");
        }

      }
      catch{
        console.log("error");
      }
    };
    connectWallet();
  },[]);

  return (
    <React.Fragment>
       
       <Body state={state}/>
    </React.Fragment>
   
  );
}

export default App;
