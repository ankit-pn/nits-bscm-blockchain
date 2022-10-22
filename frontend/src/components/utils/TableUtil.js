import { Table } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TableUtil({ type }) {
    
    const [head ,setHead] = useState(null)
    const [body , setBody] = useState(null)
    const [data , setData] = useState(null)




    useEffect(()=>{
        
        console.log('TEFF')
        var len;
        

        const headers = (type == 1 ? ['Sr No' , 'Quantity' , 'Amount' , 'Date'] : (type == 2 ?  ['Sr No' , 'Required' , 'Available','Cost'] : ['Sr No' , 'Item Name' , 'Quantity'] ))
        setHead(headers.map((ele , index)=><th key={index}>{ele}</th>))
        if(type == 1){
            
            setBody(data.map((ele,index)=>{
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.quantity}</td>
                    <td>{data.amount}</td>
                    <td>{data.date}</td>
                </tr>
            }))
        }
        else if(type == 2){
            setBody(data.map((ele,index)=>{
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.reqd}</td>
                    <td>{data.avail}</td>
                    <td>{data.cost}</td>
                </tr>
            }))            


        }
        else{

            async function f3(){
                // await fetchData().then(()=>
                console.log(data , 'TABLE UTILS DATA')

            }

            f3()
            console.log('TTTT' , data)
            // const result = data.map((ele,index)=>{
            //     <tr key={data.itemId}>
            //         <td>{index+1}</td>
            //         <td>{data.itemId}</td>
            //         <td>{data.quantity}</td>
            //     </tr>
            // })
            // console.log(result)
            // setBody('result') 
        }
    },[])

    return (
    <Table>
        <thead><tr>{head}</tr></thead>
        <tbody>{body}</tbody>
    </Table>
  )
}

export default TableUtil