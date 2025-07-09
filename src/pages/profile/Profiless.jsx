import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Profiless() {
    const [profiledata,setprofile]=useState(null);
    useEffect(()=>{
        const profileData= async()=>{
            const token = localStorage.getItem('token');

            if(!token){
                console.log("No token found, skipping profile fetch");
                return ;
            }
            try{    
                const resp = await axios.get(`${import.meta.env.VITE_API_URL}/chatApp`,{
                    headers:{
                      Authorization:`Bearer ${token}`
                    }
                }).then(resp=>{
                    console.log(resp.data)
                    setprofile(resp.data);
                }).catch(err=>{
                    console.log(err)
                })
               


            }catch(error){
                console.log(error)
            }
        }
        
        profileData();
    },[])
  return (
    <div>
        <h1>data fetch</h1>

        {
            profiledata ? (
                <div>{profiledata}</div>
            ):(
                <p>loadin...</p>

            )


        }
    

      
    </div>
  )
}
