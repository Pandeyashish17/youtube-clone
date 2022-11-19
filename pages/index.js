import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(data);
  const getData = () => {
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/channel/videos/",
      params: { id: "UCX6OQ3DkcsbYNE6H8uQQuVA", hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        let data = response.data.contents;
        setData(
          data.map((item) => {
            const {
              lengthSeconds,
              thumbnails,
              publishedTimeText,
              title,
              videoId,
              stats,
            } = item.video;
            return {
              title: title,
              length: lengthSeconds,
              publishedDate: publishedTimeText,
              thumbnails: thumbnails[3].url,
              videoId: videoId,
              views: stats.views,
            };
          })
        );
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid place-content-center h-[90vh] ">
          <ClimbingBoxLoader color="#121212" />
        </div>
      ) : (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data?.map((item, i) => {
            return <Cards data={item} channelName="Mr Beast" key={i} />;
          })}
        </div>
      )}
    </>
  );
}
