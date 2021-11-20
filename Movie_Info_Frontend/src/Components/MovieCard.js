import React from 'react'

export default function MovieCard(props) {
    return (
        <div className="border-2 border-black text-lg">
            {props.data.title}
        </div>
    )
}
