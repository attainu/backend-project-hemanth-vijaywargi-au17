import React from "react";

export default function MovieCard(props) {
  return (
    <div >
        <div className="grid grid-cols-10 lg:gap-3 justify-items-center bg-black-400">
            {/* 1st card */}
            <div className="py-10 " >
                <div className="rounded overflow-hidden shadow-lg max-w-sm">
                    <img src='https://image.tmdb.org/t/p/original/ijQafdZa2tINIzd9D4DDAEMjRaS.jpg' alt="Not available" className="w-full"/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            The Matrix Resurrections
                        </div>
                    </div>
                    <div className="grid grid-flow-col gap-5 pb-2 px-2">
                        <span className="bg-gray-600 rounded-full px-3 py-1 mb-2 text-small text-white">6.8</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
