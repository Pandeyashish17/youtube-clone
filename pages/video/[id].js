import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="flex justify-center items-center h-[90vh]">
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
    </div>
  );
};

export default Index;
