import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  // const [data, setData] = useState([])
  // useEffect(() => {
  //  fetch('https://api.github.com/users/hiteshchoudhary')
  //  .then(response => response.json())
  //  .then(data => {
  //     console.log(data);
  //     setData(data)
  //  })
  // }, [])

  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github followers: {data.followers}
      <img
        src={data.avatar_url}
        alt='Git picture'
        width={300}
        className='rounded-full flex justify-center items-center mx-auto'
      />
      <a
        href={`https://github.com/${data.login}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <button className='bg-white text-gray-800 px-4 py-2 rounded-md'>
          View Profile
        </button>
      </a>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/hiteshchoudhary");
  return response.json();
};
