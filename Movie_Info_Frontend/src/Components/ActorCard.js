import React from "react";

function ActorCard(props) {
  return (
    
      <div className="flex items-center w-72 m-2 bg-gray-300 rounded p-2">
        <img
          className="w-20 mr-3 rounded"
          src={props.details.imageURL}
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
