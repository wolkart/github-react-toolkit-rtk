import React, {useState} from 'react';
import {IRepo} from "../models/models";
import {useActions} from "../hooks/useActions";
import {useAppSelector} from "../hooks/useAppSelector";

export const RepoCard = ({repo}: { repo: IRepo }) => {
    const {addFavourites, removeFavourites} = useActions()
    const {favourites} = useAppSelector(state => state.github)
    const [isFavourite, setIsFavourite] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        addFavourites(repo.html_url)
        setIsFavourite(true)
    }

    const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        removeFavourites(repo.html_url)
        setIsFavourite(false)
    }

    return (
        <div
            className="border shadow-md px-4 py-4 mb-2 bg-gray-50 rounded hover:shadow-xl hover:bg-gray-200 transition-all">
            <a href={repo.html_url} className="flex flex-col" target='_blank'>
                <h2 className="text-lg font-bold hover:text-sky-500 transition-all">{repo.full_name}</h2>
            </a>
            {!isFavourite && <button
                className="h-[40px] mt-2 px-4 bg-sky-300 hover:bg-sky-200 transition-all rounded"
                onClick={addToFavourite}
            >
                Add favourite
            </button>}
            {isFavourite && <button
                className="h-[40px] mt-2 px-4 bg-orange-600 hover:bg-orange-500 text-white transition-all rounded"
                onClick={removeFromFavourites}
            >
                Remove favourite
            </button>}
        </div>
    );
};