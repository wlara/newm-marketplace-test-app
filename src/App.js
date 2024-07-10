import { useEffect, useState } from "react";
import { ConnectWallet, useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { generateSaleStartAmount, generateSaleStartTransaction, generateSaleEndAmount, generateSaleEndTransaction, generateOrderAmount, generateOrderTransaction } from "./api";
import { encodeAddress } from "./utils";
import "./App.css";


function App() {
  const { wallet } = useConnectWallet();
  const [stakeAddress, setStakeAddress] = useState(null)


  useEffect(() => {
    if (wallet) {
      handleConnect()
    } else {
      handleDisconnect()
    }
  }, [wallet])


  const handleConnect = async () => {
    try {
      const adresses = await wallet.getRewardAddresses()
      setStakeAddress(encodeAddress(adresses[0]))
    } catch (error) {
      console.error(error)
      alert(`Failed getting Stake Address: ${error}`);
    }
  };

  const handleDisconnect = () => {
    setStakeAddress(null)
  };

  const handleSubmitSaleStart = async () => {
    try {
      const address = encodeAddress(await wallet.getChangeAddress()); 
      const order = await generateSaleStartAmount(
        address,
        "e65559518eef9ebc25d3bacfa3f037d3e8cf0830b879c9a3fc6d7617",
        "001bc280038b0644f9c145d45b64272d47679f7d65ed9ad0f0091de6e7dacb6d",
        1,
        10000000,
        100
      )
      const utxos = await wallet.getUtxos(order.amountCborHex);
      const resp = await generateSaleStartTransaction(order.saleId, address, utxos);
      const signedTx = await wallet.signTx(resp.txCborHex, true);
      await wallet.submitTx(signedTx);
      alert("Sale start successfully submitted!!!")
    } catch (error) {
      console.error(error);
      alert(`Failed submitting sale end: ${error}`);
    }
  };

  const handleSubmitSaleEnd = async () => {
    try {
      const saleId = "9f874232-0d40-4885-b472-9a5d568b928c"
      const order = await generateSaleEndAmount(saleId)
      const utxos = await wallet.getUtxos(order.amountCborHex);
      const changeAddress = encodeAddress(await wallet.getChangeAddress());
      const resp = await generateSaleEndTransaction(saleId, changeAddress, utxos);
      const signedTx = await wallet.signTx(resp.txCborHex, true);
      await wallet.submitTx(signedTx);
      alert("Sale end successfully submitted!!!")
    } catch (error) {
      console.error(error);
      alert(`Failed submitting sale end: ${error}`);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const order = await generateOrderAmount("13493e88-2b48-44d9-b2d5-be16dc33d343", 12345);
      const utxos = await wallet.getUtxos(order.amountCborHex);
      const changeAddress = encodeAddress(await wallet.getChangeAddress());
      const resp = await generateOrderTransaction(order.orderId, changeAddress, utxos);
      const signedTx = await wallet.signTx(resp.txCborHex);
      await wallet.submitTx(signedTx);
      alert("Order successfully submitted!!!")
    } catch (error) {
      console.error(error);
      alert(`Failed submitting order: ${error}`);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ConnectWallet />
        </div>
        {stakeAddress && (
          <>
            <p>{stakeAddress}</p>
            <div>
              <button className="App-button" onClick={handleSubmitSaleStart}>Start Sale</button>
            </div>
            <div>
              <button className="App-button" onClick={handleSubmitSaleEnd}>End Sale</button>
            </div>
            <div>
              <button className="App-button" onClick={handleSubmitOrder}>Submit Order</button>
            </div>
          </>
        )}
      </header >
    </div >
  );
}

export default App;
