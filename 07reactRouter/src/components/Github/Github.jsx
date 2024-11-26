import {useEffect, useState} from "react"   
import { ApiLoader } from "../Loader/ApiLoader"

const Github = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const responseData = await ApiLoader();
        setData(responseData);
      }
      catch(error){
        console.error("Something went wrong : ", error)
      }
    }
    fetchData();
  }, [])

  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
    {/* Github followers: {data.followers}
    Username: {data.name} */}
    <h1>Name : {data.name}</h1>
    <h1>Bio : {data.bio}</h1>
    <h1>followers : {data.followers}</h1>
    <h1>Public Repository : {data.public_repos}</h1>
    <h1>Location: {data.location}</h1>
    <img src={data.avatar_url} alt="Git picture" width={300} className="mx-auto justify-center rounded-full mt-10 mb-5"/>
    </div>
  )
}

export default Github
