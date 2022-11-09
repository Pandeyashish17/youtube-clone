import axios from "axios";

import { useEffect, useState } from "react";
import Cards from "../components/Cards";

export default function Home() {
  const [data, setData] = useState(null);
  // console.log(data);
  const getData = (channel) => {
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/channel/videos/",
      params: { id: "UCqeTj_QAnNlmt7FwzNwHZnA", hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

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
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data?.map((item, i) => {
          return <Cards data={item} channelName="Sonny Sangha" key={i} />;
        })}
      </div>
    </>
  );
}
