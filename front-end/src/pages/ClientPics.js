import React from 'react'

const ClientPics = () => {
  // will change to come from the database
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
      {/* might make the images clickable to view a larger one */}
      {/* make images downloadable */}
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