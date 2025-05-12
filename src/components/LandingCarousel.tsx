import * as React from "react";

const carouselData: ReadonlyArray<{ title: string; description: string }> = [
  {
    title: "Feeling disconnected?",
    description:
      "Social media promised connection but left us more isolated than ever. Groops is here to change that—by bringing people together in a real way.",
  },
  {
    title: "Curated connections, not endless scrolling",
    description:
      "Tell us what you love, take a quick quiz, and we’ll match you with a small group of like-minded people. Real conversations, real friendships.",
  },
  {
    title: "Be part of something real",
    description:
      "Groops is launching soon. Join the waitlist today and be the first to experience a new way to connect.",
  },
];

export const LandingCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-64 sm:h-52 rounded-2xl bg-white">
      <div className="absolute w-full transition-transform duration-500 ease-in-out">
        {carouselData.map((item, index) => (
          <div
            key={index}
            className="absolute w-full px-4 transition-transform duration-500"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <div className="rounded-2xl p-6 h-64 sm:h-52 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-rose-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
