import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <figure className="relative w-[200px] h-[200px] rounded-full shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
      <img
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        src={data.image}
        alt="Image"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
    </figure>
  );
};

export default Card;
