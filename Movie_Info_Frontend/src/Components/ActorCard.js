import React, { useState } from "react";

function ActorCard(props) {
  const [image,setImage] = useState(props.details.imageURL)
  return (
    
      <div className="flex items-center w-72 m-2 bg-gray-300 rounded p-2">
        <img
          className="w-20 mr-3 rounded"
          src={image}
          onError={()=>{setImage("https://m.media-amazon.com/images/S/sash/N1QWYSqAfSJV62Y.png")}}
          alt="Avatar of Actor"
        />
        <div className="text-base">
          <p className=" font-semibold">{props.details.name}</p>
          {props.role!==""?<p className="text-gray-600">{"as "+props.role}</p>:null}
        </div>
      </div>
    
  );
}

export default ActorCard;
