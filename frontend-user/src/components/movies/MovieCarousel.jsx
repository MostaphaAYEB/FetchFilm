import { useState, useRef } from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies }) {
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

    // Mise à jour simple des états après l'animation de scroll
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }, 500);
  };

  return (
    <section className="py-8 relative group px-4">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      {/* Bouton Gauche */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 bg-black/70 p-2 rounded-full text-white hover:bg-white hover:text-black transition opacity-0 group-hover:opacity-100 h-full"
        >
          {/* Tu peux ajouter une icône ici, ex: <ChevronLeft /> */}
          &lt;
        </button>
      )}

      {/* Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0 w-48">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Bouton Droite */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 bg-black/70 p-2 rounded-full text-white hover:bg-white hover:text-black transition opacity-0 group-hover:opacity-100 h-full"
        >
          {/* Tu peux ajouter une icône ici, ex: <ChevronRight /> */}
          &gt;
        </button>
      )}
    </section>
  );
}

export default MovieCarousel;