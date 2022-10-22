import { Button, Center, Table, Text } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PendingTxn() {
    
    const [data , setData] = useState(null)
    const [connected , setConnected] = useState(1)

    async function handlePopup(data){
        if(window.ethereum.selectedAddress == null){
            console.log('not connected')
            setConnected(0)
            setTimeout(() => {
                setConnected(1)
            }, 3000);

            return
        }
        console.log('CALLED POPUP' , window.ethereum.selectedAddress ,data )
        const price = data.price ? data.price : 1
        const params = [
            {
              from: `${window.ethereum.selectedAddress}`,
              to: `0x588138839c2ea2f767B04bCed5B7334959A60A1c`,
              value : `${1000000000*price*data.require_quantity}`
            },
          ]
        await window.ethereum.request({"method":"eth_getBalance" , "params":[window.ethereum.selectedAddress, "latest"]}).then((res)=>console.log(Number(res)))
        const resp = await window.ethereum.request({"method":"eth_sendTransaction","params":params})
        if(await resp.code != 4001){
            

            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            const formattedToday = dd + '/' + mm + '/' + yyyy;
            console.log(resp , 'resp' ,formattedToday , data)
            await axios.post('https://save-listing.herokuapp.com/deleteListItems' , data).then((res)=>console.log(res))
            fetchList()
            await axios.post('https://user-item-backend.herokuapp.com/deleteItems' , {
                                'userId' : data.userId,
                                'itemId' : data.itemId
                    }) 
            // await axios.post(window.ethereum.request({"method":"eth_getTransactionReceipt","params":[resp]})).then((ress)=>console.log(ress))
            await axios.post('https://transaction-history.herokuapp.com/addHistory' , {
                'userId' : data.userId,
                'itemId' : data.itemId,
                'quantity' : data.require_quantity,
                'price' : price,
                'transaction_hash' : resp ,
                'date' : formattedToday
            }).then((res)=>console.log(res))
        }   


    }

    async function fetchList(){
        console.log('fetchList')
        await axios.post('https://save-listing.herokuapp.com/getListItems' , {
            'userId' : localStorage.getItem('uid')
        }).then((res)=>{
            console.log(res)
            if(res.data.message == "No Records Found"){
                setData({'text' : 'No Transactions found needing Approval'})
            }
            else{
                setData(res.data.itemsLList);
                console.log(res , 'res')
            }
        })
    }

    async function checkTxn(){
        var ids = []
        console.log('CHECK TXN')
        const r2 = await axios.post('https://user-item-backend.herokuapp.com/getItems' , {
            'userId' : localStorage.getItem('uid')
        })
        const userData = r2.data.itemsList
        
        for(const id of userData){
            await ids.push(id.itemId)
        }


        const resp = await axios.post('https://vendor-backend-nits.herokuapp.com/getVendorItems', {
            'itemIds' : ids
        })
        const newData = (resp.data.itemsList )

        console.log(newData , userData , 'custom')
        
        for(const d1 of newData){
            for(const u1 of userData){
                if(d1.itemId == u1.itemId && d1.quantity >= u1.quantity ){
                    console.log(d1,u1,'matchedd')
                    await axios.post('https://save-listing.herokuapp.com/addListItems' , {
                        'itemId' : u1.itemId,
                        'userId' : u1.userId,
                        "available_quantity" : d1.quantity,
                        "require_quantity" : u1.quantity,
                        "vendor_address" : "0x588138839c2ea2f767B04bCed5B7334959A60A1c",
                        "price" : d1.price
                    }).then((res)=>console.log(res))
                    await axios.post('https://user-item-backend.herokuapp.com/deleteItems' , {
                                'userId' : u1.userId,
                                'itemId' : u1.itemId
                    }).then((res)=>console.log(res , 'dell item')) 
                }
            }
        }

        fetchList()

    }

    const rows = data?.text ? null :  data?.map((ele,index)=>(
        <tr key={ele.itemId}>
          <td><Text>{index+1}</Text></td>
          <td><Text weight={600}>{ele.itemId}</Text></td>
          <td><Text weight={600}>{ele.require_quantity}</Text></td>
          <td><Text weight={600}>{ele.available_quantity}</Text></td>
          <td><Text weight={600}>{ele.price}</Text></td>
          <td> <Button color='green' onClick={()=>{
            handlePopup(ele)
          }}>Approve Request</Button></td>
        </tr>   
    ))

    useEffect(()=>{
        
        // const intervalCall = setInterval(() => {
            fetchList()
            checkTxn()
            
        //   }, 10000);
        //   return () => {
        //     // clean up
        //     clearInterval(intervalCall);
        //   };
    },[])
    return (
    <div>
        {!connected && <Center> <Text color={'red'}  style={{fontFamily : 'bitter'}} weight='600'>Please connect to MetaMask to approve transaction</Text></Center>}
        {!data ?  <Text m={'xl'} style={{fontFamily : 'bitter'}} size='xl' weight={'600'} color='black'>Fetching Data...Please have patience</Text>:

        data.text ?<Text m={'xl'} style={{fontFamily : 'bitter'}} size='xl' weight={'600'} color='black'>{data.text}</Text> :
            <Center>
            <Table   sx={{
                maxWidth:'90%'
            }}
                highlightOnHover withColumnBorders withBorder horizontalSpacing='md' verticalSpacing="md">
                    <thead>
                    <tr>
                        <th><Text weight={800} color='red'>Sr no.</Text></th>
                        <th><Text weight={800} color='red'>Item Name</Text></th>
                        <th><Text weight={800} color='red'>Required</Text></th>
                        <th><Text weight={800} color='red'>Available</Text></th>
                        <th><Text weight={800} color='red'>Price(per Unit)</Text></th>
                        <th><Text weight={800} color='red'>Approve</Text></th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
            </Table></Center>}
    </div>
  )
}

export default PendingTxn