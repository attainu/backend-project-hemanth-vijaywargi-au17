import React from "react";

function Cast() {
  return (
    <div>
      <div className="flex items-center w-72 m-2 bg-white rounded">
        <img
          className="w-20 pr-4 pl-1"
          src="https://m.media-amazon.com/images/M/MV5BODI4NDY1NzkyM15BMl5BanBnXkFtZTgwNzM3MDM0OTE@._V1_UX182_CR0,0,182,268_AL_.jpg"
          alt="Avatar of Actor"
        />
        <div className="text-sm">
          <p className=" font-semibold">Akshay Kumar</p>
          <p className="text-gray-600">as khiladi</p>
        </div>
      </div>
    </div>
  );
}

export default Cast;
