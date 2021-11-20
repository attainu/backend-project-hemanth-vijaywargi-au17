import React,{useState} from "react";
import {images} from './forms/images/CarouselData'

export default function Carousel(){
    const [currImg,setCurrImg] = useState(0)
    return(
        /* Carousel */
        <div className="w-96 h-56 bg-white select-none">
            {/*Carousel Inner*/}
            <div className="w-full h-full flex" style={
                {backgroundImage:`url(${images[currImg].img})`,
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
                backgroundSize:'contain',}}>
                    {/* Left Button */}
                    <div className="w-7/100 h-full bg-modal cursor-pointer flex justify-center items-center bg-opacity-90"
                    onClick={()=>{
                        if(currImg===0){
                            setCurrImg(images.length-1)
                        }else{
                            setCurrImg(currImg-1)}
                        }
                        }>
                        <svg className="w-10 h-10 opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </div>
                    {/* Center Div */}
                    <div className="w-86/100 h-full flex justify-center items-end">
                        {/* Image Description */}
                        <div className="bg-white text-black px-4 rounded-5 m-1">
                            {images[currImg].text}
                        </div>
                    </div>
                    {/* Right Button */}
                    <div className="w-7/100 h-full bg-modal bg-opacity-90 cursor-pointer flex justify-center items-center"
                    onClick={()=>{
                        if(currImg===images.length-1){
                            setCurrImg(0)
                        }else{
                            setCurrImg(currImg+1)}
                        }}>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
            </div>
        </div>
    );
}
