import Link from "next/link";
import React from "react";
import { GrNotification, GrYoutube } from "react-icons/gr";
import { useRouter } from "next/router";
const Topbar = () => {
  const router = useRouter();
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl ">
            <GrYoutube className="mr-1" /> Youtube
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <div className="input-group">
              <button className="btn" onClick={() => router.push("/search")}>
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
      </div>
    </>
  );
};

export default Topbar;
