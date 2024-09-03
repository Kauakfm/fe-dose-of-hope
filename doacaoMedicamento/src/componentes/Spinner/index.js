import React from "react";

export default function Spinner() {
    return (
        <div className='layout'>
            <div className='chat-container'>
                <div className='chat-body'>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-grow text-primary" role="status"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}