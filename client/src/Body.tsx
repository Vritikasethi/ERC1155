import React,  {useState} from 'react';
import { IState } from './App';
import './index.css';
import nft2 from './assets/nft2.jpeg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Body: React.FC<{state: IState|null}> = (props) =>{
    const [mintLoad, setMintLoad] = useState<boolean>(true);
    const [burnLoad, setBurnLoad] = useState<boolean>(true);
    const [showBurn, setShowBurn] = useState<boolean>(false);


    const contract = props.state!.contract;

    const mintNFT= async() =>{
        setMintLoad(false);

    const amt = await contract?.currentPrice();
     // console.log(Number(amt));

      const options = { value: Number(amt) };
      const addressContract = String(await props.state?.signer?.getAddress());

      const txn = await contract?.mint(
        addressContract,
        0,
        1,
        options
      );
      toast("Transaction is processing..");
      await txn?.wait();

      console.log("Minted NFT!");
      toast("Nft minted");

      setMintLoad(true);
      setBurnLoad(true);
      setShowBurn(true);

    }
    const burnNFT = async() =>{
        setBurnLoad(false);
        const burned = await contract?.burnToken(0, 1);
        toast("burning..");
        await burned?.wait();
    
        console.log("Burned");
        toast("burned !!");

        setBurnLoad(true);
        setShowBurn(false);
    }
return(
    <center>
    <div className='container-body'>
       <img src={nft2} alt ='NFT'/>
        <button onClick={mintNFT}> {mintLoad ? "Mint" : "Minting.."}</button>
        {showBurn && (
        <button onClick={burnNFT}>{burnLoad ? "Burn" : "Burning.."}</button>
      )}
      <ToastContainer/>
    </div>
    </center>
);

}
export default Body;