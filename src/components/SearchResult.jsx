import React from 'react'

function SearchResult() {
       useEffect(()=>{

        const userList = async ()=>{
        try{
             const response  = await axios.get(`${import.meta.env.VITE_API_URL}/chatApp/userlist`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        
        })
        console.log(response.data)
        setlistOfUser(response.data)



        }catch(err){
            console.log(err)
        }
        }


   


       userList()

    },[])
      const handleSendID = (userid, username) => {
    console.log("Clicked User:", userid,username);
    console.log("Sender Id:", senderId);
    localStorage.setItem('receiverId',userid)
    localStorage.setItem('receiverUserName',username)
    navigate('/chatApp')
  };
  return (
    <div>
          {/* search Results  */}
            {newUser.map((searchuser)=>(
                <div
              key={searchuser._id}
              onClick={() => handleSendID(searchuser._id, searchuser.username)}
              className='flex m-5 flex-1 cursor-pointer'
            >
              <div className='h-12 w-12 border rounded-full'>
                <img src="" alt="" />
              </div>

              <div className='ml-3'>
                <p>{searchuser.username}</p>
                <p>{searchuser.email}</p>
                <p>{searchuser._id}</p>
              </div>
            </div>
            ))
     
            }
      
    </div>
  )
}

export default SearchResult
