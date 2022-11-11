import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!id) return;
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/video/details/",
      params: { id: id, hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let data = response.data;
        setData({
          author: data.author.title,
          authorImage: data.author.avatar[0].url,
          channelId: data.channelId,
          subscribers: data.author.stats.subscribersText,
          views: data.stats,
          description: data.description,
          date: data.publishedDate,
          title: data.title,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-2 mx-6 ">
      {id && (
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&cc_load_policy=1`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}

      <div className="bg-slate-100 p-5 ">
        <div className="flex flex-col gap-2">
          <p className="text-xl xl:text-3xl xxl:text-4xl ">{data?.title}</p>
          <div className="flex gap-4 ">
            <div className=" rounded-full">
              <img src={data?.authorImage} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <span>{data?.author}</span>
              <span>{data?.subscribers}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
      >
        <div className="collapse-title text-xl font-medium">
          {data?.description.slice(0, 100)}
        </div>
        <div className="collapse-content">
          <p>
            <p className="m-3">{data?.date}</p>
            {data?.description}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Index;
