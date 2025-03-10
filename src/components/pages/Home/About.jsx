import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-12 md:py-20 container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <article className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">
        {/* Image Container */}
        <div
          data-aos="fade-right"
          className="w-full md:w-1/2 overflow-hidden rounded-lg"
        >
          <img
            src="https://cms.code4rest.com/wp128/wp-content/uploads/2024/11/Rainy-img.jpg"
            alt="Weather map showing rainy conditions"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 text-black">
          <h2
            data-aos="fade-left"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide"
          >
            Rainy days bring out the best puddles
          </h2>
          <p
            data-aos="fade-left"
            data-aos-delay="200"
            className="text-base sm:text-lg md:text-[1.2rem] mb-6"
          >
            There are many variations of passages of available, but majority
            have suffered alteration in some form, by injected words which don’t
            look even slightly believable
          </p>

          {/* Weather Info List */}
          <ul className="list-disc pl-5 mb-6 text-base sm:text-lg">
            <li data-aos="fade-left" data-aos-delay="300">
              UV Index
            </li>
            <li data-aos="fade-left" data-aos-delay="400">
              Wind Speed
            </li>
            <li data-aos="fade-left" data-aos-delay="500">
              Sunrise & set
            </li>
            <li data-aos="fade-left" data-aos-delay="600">
              Humidity
            </li>
            <li data-aos="fade-left" data-aos-delay="700">
              Visibility
            </li>
            <li data-aos="fade-left" data-aos-delay="800">
              Air Speed
            </li>
          </ul>

          {/* More Info Button */}
          <button
            data-aos="fade-left"
            data-aos-delay="900"
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
          >
            More Info
          </button>
        </div>
      </article>
    </section>
  );
};

export default AboutSection;
