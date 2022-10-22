import { Button, Center } from '@mantine/core'
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import History from '../components/History'
import PendingTxn from '../components/PendingTxn'

function Transaction() {
    const nav = useNavigate()
    
    const [connected , setConnected] = useState(window.ethereum ? window.ethereum.selectedAddress : null)
    
    const [disp , setDisp] = useState(1)

    useEffect(()=>{
        if(!localStorage.getItem('uid')){
          nav('/')
        }
    },[])

    const connectHandler = async () =>{
        if(!connected){ 
            
            const { ethereum } = window;
            if(ethereum && ethereum.isMetaMask){
                try {
                    const res = await ethereum.request({ method: 'eth_requestAccounts' })
                    setConnected(res[0])
                } catch (error) {
                    console.error(error);
                }
            }
            else{
                console.log('NO METAMASK EXTENSION')
            }
        }
    }
  
    return (
    <div>
        <Center>
            <Button m='md' sx={{fontFamily : 'bitter'}} color='green' rightIcon={<Icon inline={true} icon="logos:metamask-icon" />} onClick={connectHandler}>{!connected ? 'Connect To MetaMask' : `Connected to wallet ${connected}`}</Button>
            <Button color='green' onClick={()=>setDisp(!disp)}>{!disp ? 'Show History' : 'Pending Transactions'}</Button>
        </Center>

        {disp ? <History /> : <PendingTxn/>}

        {/* <Button onClick={async()=>{
            await window.ethereum.request({"method":"eth_getBalance" , "params":[connected, "latest"]}).then((res)=>console.log(Number(res)))
        }}>BAL</Button> */}

        {}
        
    </div>
  )
}

export default Transaction;