import React from 'react';
import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        <nav
            className="fixed flex top-0 left-0 right-0 px-10 justify-between items-center h-[50px] shadow-md bg-gray-500 text-white z-10"
        >
            <div className="font-bold text-sky-400">Github search</div>
            <div className="flex">
                <Link to={'/'} className="mr-[20px] hover:text-sky-400 transition-all">HOME</Link>
                <Link to={'/favourites'} className="hover:text-sky-400 transition-all">FAVOURITES</Link>
            </div>
        </nav>
    );
};