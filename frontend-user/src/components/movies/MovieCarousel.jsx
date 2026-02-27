import { useState, useRef } from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies, onAddToCart }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }, 500);
  };

  return (
    <section className="py-8 relative group/carousel">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      
      {canScrollLeft && (
        <button 
          onClick={() => scroll("left")} 
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-black/70 p-3 rounded-full text-white hover:bg-red-600 transition opacity-0 group-hover/carousel:opacity-100 shadow-xl"
        >
          &lt;
        </button>
      )}

      <div 
        ref={scrollContainerRef} 
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4" 
        style={{ scrollbarWidth: "none" }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0">
            <MovieCard movie={movie} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button 
          onClick={() => scroll("right")} 
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-black/70 p-3 rounded-full text-white hover:bg-red-600 transition opacity-0 group-hover/carousel:opacity-100 shadow-xl"
        >
          &gt;
        </button>
      )}
    </section>
  );
}

export default MovieCarousel;