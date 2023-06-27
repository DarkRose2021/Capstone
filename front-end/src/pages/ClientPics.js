import React from 'react'

const ClientPics = () => {
  //testing pictures
  const pics = [
    "/assets/Equineportraiture.jpg",
    "/assets/Eventphotography.jpg",
    "/assets/Fine art photography.jpg",
    "/assets/Advertising and marketing photography.jpg",
    "/assets/Editorial and journalistic photography.jpg",
    "/assets/Equine lifestyle photography.jpg",
  ]
  return (
    <div>
      <h1>Your Pictures</h1>
      <div className='pics'>
        {
          pics?.map((pic) => (
            <img src={pic} />
          ))
        }
      </div>
    </div>
  )
}

export default ClientPics