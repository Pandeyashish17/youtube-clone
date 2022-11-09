import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!search) return;

    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/auto-complete/",
      params: { q: search, hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let data = response.data.results;
        setData(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [search]);

  return (
    <div className="h-[90vh]">
      <div className="flex justify-center  ">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            e.code == "Space" || e.code == "Enter"
              ? router.push(`/searchresult?term=${search}`)
              : null;
          }}
        />
      </div>
      <div className="flex justify-center items-center gap-2 flex-col mt-3 h-[80vh] scrollbarHide overflow-y-scroll">
        {data?.map((item, i) => (
          <button
            className="hover:text-blue-500 hover:scale-105 duration-300 transition-all w-screen bg-slate-200 p-3 rounded-sm"
            onClick={() => router.push(`/searchresult?term=${item}`)}
            key={i}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
