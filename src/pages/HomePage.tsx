import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/useDebounce";
import { RepoCard } from '../components/RepoCard';

export const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, {isLoading: loadingRepos, data: repos}] = useLazyGetUserReposQuery()

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])


    return (
        <div className="flex justify-center mx-auto h-screen w-screen pt-[100px]">
            <div className="relative w-[560px]">
                <input
                    type="text"
                    placeholder='Search for github username...'
                    className="border rounded py-2 px-4 w-full h-[50px] mb-2 outline-none focus:border-sky-400"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {isError && <p className="font-bold text-red-500">Error network</p>}
                {dropdown &&
                  <div
                    className="absolute top-[60px] left-0 right-0 max-h-[200px] shadow-md flex flex-col overflow-y-scroll"
                  >
                      {isLoading && <p className="font-bold text-sky-400">Loading...</p>}
                      {data?.map(user => (
                          <div
                              key={user.id}
                              onClick={() => clickHandler(user.login)}
                              className="text-white px-4 py-2 mb-1 bg-sky-400 hover:bg-sky-200 hover:text-gray-500 transition-all cursor-pointer flex items-center"
                          >
                              {<img src={user.avatar_url} alt="" className="w-[50px] h-[50px] mr-[15px] rounded-3xl"/>}
                              {user.login}
                          </div>
                      ))}
                  </div>}
                <div className="container">
                    {repos?.map(repo => (
                        <RepoCard key={repo.id} repo={repo}/>
                    ))}
                </div>
            </div>
        </div>
    );
};