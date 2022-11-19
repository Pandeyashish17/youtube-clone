import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 mx-6 ">
        <Head>
          <title>{data?.title}</title>
        </Head>
        {loading ? (
          <div className="h-[90vh]">
            <ClimbingBoxLoader />
          </div>
        ) : (
          <>
            {id && data && (
              <div className="">
                <iframe
                  width={800}
                  height={500}
                  src={`https://www.youtube.com/embed/${id}?autoplay=1&cc_load_policy=1`}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="bg-slate-100 p-5 ">
              <div className="flex flex-col gap-2">
                <p className="text-xl xl:text-3xl xxl:text-4xl ">
                  {data?.title}
                </p>
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
                  <span className="m-3">{data?.date}</span>
                  {data?.description}
                </p>{" "}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
