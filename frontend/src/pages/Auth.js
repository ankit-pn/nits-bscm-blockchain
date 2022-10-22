import { Button, Drawer, Modal, PasswordInput, Text, TextInput, UnstyledButton } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Auth() {
    
    const navigate = useNavigate()
    const [load , setLoad] = useState(false)

    const clearForm = (inp) =>{
        if(inp == 1){
            
            LG1.current.value = ''
            LG2.current.value = ''
        }
        else {
            RG1.current.value = ''
            RG3.current.value = '' 
            RG4.current.value = ''
        }

    }

    const handleAuth = async () =>{
        

        if(data == 1){
            // console.log(LG1.current.value , LG2.current.value)
            if(LG1.current.value.trim() <= 1 || LG2.current.value.trim() <= 1)
                return
            setLoad(true)
            const res = await axios.post('https://user-auth-blockchain.herokuapp.com/login' ,{
                userId : LG1.current.value , 
                password : LG2.current.value
            })
            console.log(res)
            if(res.data.message == "Login Successful"){
                localStorage.setItem('isLoggedIn' , true)
                localStorage.setItem('uid' , LG1.current.value)
                setLoad(false)
                setOpened(0)
                window.location.reload(false)
                // navigate('/')
            }
            else{
                setLoad(false)
                

            }
        }
        else{
            console.log('/register')
            if(RG3.current.value != RG4.current.value){
                RG3.current.value = ''
                RG4.current.value = ''
                setEror({'text' : 'Passwords do not match' , 'color' : 'red'})
                setTimeout(() => {
                    setEror(null)
                }, 3000);
                return
            }
            setLoad(1)
            setEror({'text' : 'Waiting for block to be mined...' , 'color' : 'green'}) ;
            const res = await axios.post('https://user-auth-blockchain.herokuapp.com/register' ,{
                userId : RG1.current.value , 
                password : RG3.current.value
            }).then((res)=>{
                console.log(res);
                setLoad(0)
                setEror('')
                setData('1')
            })
            .catch((err)=>{
                setLoad(0)
                setEror(null)
            })
            

            

        }      
    }


    const staticData = [ ['Already have an account ? ' ,  'Login'] ,
                        [ "Don't have account ? ", 'Register']]

    const [data , setData] = useState('1')
    const [opened , setOpened] = useState(1)
    const [eror , setEror] = useState(null)

    const RG1 = useRef()
    const RG3 = useRef()
    const RG4 = useRef()

    const LG1 = useRef()
    const LG2 = useRef()

    useEffect(()=>{
        if(localStorage.getItem('uid')){
            window.location.replace('/')
        }
    },[])


    return (
    <Modal title={data =='1' ? 'Login' : 'Register'} opened={opened} onClose={()=>{setOpened(0); navigate(-1)} } size='auto'>
        { data == 1 ? <>
            <TextInput label="User ID" ref={LG1} />
            <PasswordInput label="Password" ref={LG2} />
        </> 
        
        : <>
            <TextInput label="User ID" ref={RG1}/>
            <PasswordInput label="Password"  ref={RG3}/>
            <PasswordInput label="Confirm Password" ref={RG4}/>
            {eror && <Text color={eror.color}>{eror.text}</Text>}
        </>
        }


        <UnstyledButton onClick={()=>{
            clearForm(data)
            setData(data == '0' ? '1' : '0') 
        }}> <Text my='md'size='sm' style={{display : 'inline'}}>{staticData[data][0]}<Text style={{display : 'inline'}}      color={'red'}>{staticData[data][1]}</Text> </Text>
        </UnstyledButton >

        <Button style={{display : 'block' , minWidth : '300px'}} loading={load} onClick={() => {handleAuth()}}>{data =='1' ? `Login` : `Register`}</Button>

    </Modal>
  )
}

export default Auth