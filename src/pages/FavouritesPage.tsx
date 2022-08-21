import React from 'react';
import {useAppSelector} from "../hooks/useAppSelector";

export const FavouritesPage = () => {
    const {favourites} = useAppSelector(state => state.github)

    return (
        <div className="flex items-center flex-col mx-auto h-screen w-screen pt-[100px]">
            <h1 className="font-bold text-xl mb-4 text-sky-400">Favourites repos</h1>

            <div className="flex flex-col">
                {favourites.length === 0 && <p className="font-bold text-lg">No repos</p>}
                {favourites.map(fav => (
                    <a
                        key={fav}
                        href={fav}
                        target="_blank"
                        className="px-4 py-2 shadow-md font-bold mb-4 hover:text-sky-400 hover:shadow-xl transition-all"
                    >
                        {fav}
                    </a>
                ))}
            </div>
        </div>
    );
};