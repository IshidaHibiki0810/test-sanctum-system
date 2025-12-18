"use client";

import { useState } from "react";

export default function ImageSlider() {
  const images = [
    "/img/test1.jpg",
    "/img/test2.jpg",
    "/img/test3.jpg",
  ];

  const [index, setIndex] = useState(0);

  const modoru = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const susumu = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider-wrapper">
  <button
    onClick={modoru}
    className="slider-button left"
  >
    ◀
  </button>

  <img src={images[index]} className="slider-image" />

  <button
    onClick={susumu}
    className="slider-button right"
  >
    ▶
  </button>
</div>
  );
};