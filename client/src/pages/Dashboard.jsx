import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaClone } from "react-icons/fa";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [shortenLink, setShortenLink] = useState("");

  const { user } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    apikey: "d1efc5d466544e1f99c41ed115994bce",
  };

  async function shorten(url) {
    let endpoint = "https://api.rebrandly.com/v1/links";
    let linkRequest = {
      destination: url,
      domain: { fullName: "rebrand.ly" },
      //, slashtag: "A_NEW_SLASHTAG"
      //, title: "Rebrandly YouTube channel"
    };
    const apiCall = {
      method: "post",
      url: endpoint,
      data: linkRequest,
      headers: headers,
    };
    let apiResponse = await axios(apiCall);
    let link = apiResponse.data;
    return link.shortUrl;
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    return () => {};
  }, [user, navigate]);

  async function handleShorten() {
    setValue(value);
    try {
      let shortUrl = await shorten(value);
      setShortenLink(shortUrl);
      setValue("");
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      <h1 className="text-white text-3xl w-3/4 font-bold my-20 text-center">
        URL shortener
      </h1>
      <div className="flex flex-row w-[50%] mb-8">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Paste a link to shorten it"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button
          onClick={handleShorten}
          className="px-4 py-2 border rounded-md bg-black text-white font-bold text-lg focus:outline-none hover:bg-gray-800"
        >
          shorten
        </button>
      </div>
      <div className="flex flex-row w-full justify-center">
        <p className=" w-[50%] px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-white">
          {shortenLink}
        </p>
        <div className=" flex flex-row px-4 py-2 border rounded-md text-white font-bold text-lg focus:outline-none hover:bg-gray-800">
          <FaClone />{" "}
          <button
            onClick={() => {
              setShortenLink("");
              navigator.clipboard.writeText(shortenLink);
            }}
            className=" bg-black text-white font-bold text-lg focus:outline-none hover:bg-gray-800"
          >
            copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
