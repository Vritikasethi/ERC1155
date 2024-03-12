import React,  {useState,useEffect} from 'react';
import { IState } from './App';
import './index.css';
import nft2 from './assets/nft2.jpeg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from 'ethers';

const Body: React.FC<{state: IState|null}> = (props) =>{
    const [mintLoad, setMintLoad] = useState<boolean>(true);
    const [burnLoad, setBurnLoad] = useState<boolean>(true);
    const [showBurn, setShowBurn] = useState<boolean>(false);
    const [mintedAmount, setMintedAmount] = useState(0);

    const contract = props.state!.contract;
    useEffect(() => {
        try {
          const fetchBalance = async() => {
            // event.preventDefault();
            const fetchAmount = Number(await contract?.currentPrice());
            console.log("abc",(fetchAmount));
            setMintedAmount(Number(fetchAmount) / 10**16);
            
            console.log(
              "Amount that is fetched : ",
              Number(fetchAmount)/10**16
            );
          };
          fetchBalance();

          const totalSupply = async()=>{
            const tsupp = await contract?.["totalSupply(uint256)"](0);
            // console.log(Number(tsupp));
            if(tsupp>1){
              setShowBurn(true);
            }
            else{
              setShowBurn(false);
            }
          }

          totalSupply();
        } catch (error) {
          console.log(error);
        }
      },[contract]);

    

    const mintNFT= async() =>{
        setMintLoad(false);
       //(document.getElementById("mint-btn") as HTMLInputElement).disabled = true;
       //(document.getElementById("burn-btn") as HTMLInputElement).disabled = true;    

    const amt = await contract?.currentPrice();
     // console.log(Number(amt));

      const options = { value: Number(amt) };
      // const addressContract = String(await props.state?.signer?.getAddress());

      const txn = await contract?.mint(options);
      toast("Transaction is processing..");
      await txn?.wait();
      const amt1 = Number(await contract?.currentPrice());
      
      console.log("Minted NFT!");
      toast("Nft minted");
      //(document.getElementById("mint-btn") as HTMLInputElement).disabled = false;
      //(document.getElementById("burn-btn") as HTMLInputElement).disabled = false;

      setMintedAmount(Number(amt1) / 10 ** 16);
      setMintLoad(true);
      setBurnLoad(true);
    }

    const burnNFT = async() =>{
      (document.getElementById("mint-btn") as HTMLInputElement).disabled = true;
      (document.getElementById("burn-btn") as HTMLInputElement).disabled = true;
        setBurnLoad(false);
        const burned = await contract?.burnToken(0, 1);
        toast("burning..");
        await burned?.wait();
        (document.getElementById("mint-btn") as HTMLInputElement).disabled = false;
        (document.getElementById("burn-btn") as HTMLInputElement).disabled = false;
    
        console.log("Burned");
        toast("burned !!");

        setBurnLoad(true);
    }
return(
    <center>
    <div className='container-body'>
       <img src={nft2} alt ='NFT'/>
        <button id='mint-btn' onClick={mintNFT} >  {mintLoad ?   `Mint@ ${mintedAmount}` :"Minting"}</button>
        {showBurn && (
        <button id='burn-btn' onClick={burnNFT}>{burnLoad ? "Burn Last Token" : "Burning.."}</button>
      )}
      <ToastContainer/>
    </div>
    </center>
);

}
export default Body;