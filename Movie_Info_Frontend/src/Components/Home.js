import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

function Home() {
  let now_playing = useSelector((state) => state.sections.now_playing);
  let top_rated = useSelector((state) => state.sections.top_rated);
  let upcoming = useSelector((state) => state.sections.upcoming);

  return (
    <>
      <NavBar />
      <div>
        {/*Now Playing*/}
        <div>
          <h2 className="text-4xl">Now Playing</h2>
          <div className="flex flex-wrap gap-3">
            {now_playing.map((movie) => {
              return <MovieCard title={movie.title} />;
            })}
          </div>
        </div>
        {/*Top Rated*/}
        <div>
          <h2 className="text-4xl">Top Rated</h2>
          <div className="flex flex-wrap gap-3">
            {top_rated.map((movie) => {
              return <MovieCard title={movie.title} />;
            })}
          </div>
        </div>
        {/*Upcoming*/}
        <div>
          <h2 className="text-4xl">Upcoming</h2>
          <div className="flex flex-wrap gap-3">
            {upcoming.map((movie) => {
              return <MovieCard title={movie.title} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
