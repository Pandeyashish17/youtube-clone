import axios from "axios";
import millify from "millify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
const Index = () => {
  const router = useRouter();
  let term = router.query.term;
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/search/",
      params: { q: term, hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };
    setLoading(true);
    setData(null);
    axios
      .request(options)
      .then(function (response) {
        let data = response.data;
        setData({
          refinements: data.refinements,
          content: data.contents
            ?.filter((item) => {
              return item.type == "video";
            })
            .map((item) => {
              const {
                author,
                descriptionSnippet,
                thumbnails,
                publishedTimeText,
                stats,
                title,
                videoId,
              } = item.video;
              return {
                author: author.title,
                authorImage: author.avatar[0].url,
                descriptionSnippet: descriptionSnippet,
                thumbnail: thumbnails[0].url,
                title: title,
                date: publishedTimeText,
                views: stats.views,
                videoId: videoId,
              };
            }),
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [term]);
  return (
    <>
      {loading ? (
        <div className="w-screen flex justify-center items-center">
          <ClimbingBoxLoader color={"#ffffff"} size={150} />
        </div>
      ) : null}
      <div className="flex justify-center items-center flex-col gap-2 mx-5">
        <div className="flex justify-center  ">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-square"
                onClick={() => router.push(`/searchresult?term=${search}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {data?.refinements?.map((item, i) => (
            <button
              key={i}
              className="bg-[#121212] text-white p-1 rounded-xl"
              onClick={() => router.push(`/searchresult?term=${item}`)}
            >
              {item}
            </button>
          ))}
        </div>
        {data?.content?.map((item, i) => {
          return (
            <Link href={`/video/${item.videoId}`} key={i}>
              <div className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
                <div className="flex flex-col md:flex-row w-[80vw]">
                  <div className="md:w-1/4 border-r border-gray-200">
                    <img
                      className="mx-auto"
                      src={item.thumbnail}
                      alt="Product name text"
                    />
                  </div>
                  <div className="md:w-3/4">
                    <div className="p-4">
                      <span
                        className="float-right px-3 py-2 inline-block text-gray-400 border border-gray-300 rounded-md hover:bg-gray-100"
                        href="#"
                      >
                        <AiFillHeart />
                      </span>
                      <span href="#" className="hover:text-blue-600">
                        {item.title}{" "}
                      </span>
                      <p className="mb-1">
                        <span className="text-lg font-semibold text-black">
                          {millify(item.views)} views
                        </span>
                      </p>

                      <p className="text-gray-500 mb-2">
                        {item.descriptionSnippet}
                      </p>
                      <p className="" href="#">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Index;
