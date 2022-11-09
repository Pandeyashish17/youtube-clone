import React from "react";
import millify from "millify";
import Link from "next/link";

const Cards = ({ data, channelName }) => {
  return (
    <>
      {" "}
      <Link href={`/video/${data.videoId}`}>
        <div class="hover:scale-110 transition-all duration-300 cursor-pointer">
          <div class="h-40 w-full bg-gray-700 overflow-hidden">
            <img src={data.thumbnails} alt="" />
          </div>
          <div class="flex mt-2">
            <div class="h-10 w-10 bg-blue-300 rounded-full flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570724061670-86a53c509dee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                alt=""
              />
            </div>
            <div class="ml-2">
              <div class="text-sm font-bold hover:text-blue-500 transition-all duration-300 line-clamp-2 ">
                {data.title}
              </div>
              <div class="text-xs text-gray-600">
                <p>{channelName}</p>
                <p>
                  {data.publishedDate} &middot; {millify(data.views)} views
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Cards;
