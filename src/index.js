import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// ---------- Component 1: one movie card ----------
// Receives data (movie) and functions (onDelete, onRate) as PROPS from the parent.
function MovieCard({ movie, onDelete, onRate }) {
  return (
    <div className="card">
      <div className="card-top">
        <h3>{movie.title}</h3>
        <button className="delete" onClick={() => onDelete(movie.id)}>
          Remove
        </button>
      </div>

      {/* "⭐".repeat(3) gives "⭐⭐⭐" */}
      <p className="stars">
        {"⭐".repeat(movie.rating)} ({movie.rating}/5)
      </p>

      {/* Conditional rendering: show the comment if it exists, otherwise a placeholder */}
      {movie.comment ? (
        <p className="comment">"{movie.comment}"</p>
      ) : (
        <p className="comment empty">No review yet</p>
      )}

      <label>
        Change rating:{" "}
        <select
          value={movie.rating}
          onChange={(e) => onRate(movie.id, Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// ---------- Component 2: the whole app ----------
function App() {
  // The list of movies (the main "memory" of the app)
  const [movies, setMovies] = useState([]);

  // Memory for the form inputs
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);

  // Add a movie: build a NEW array = old movies + the new one
  function handleAdd() {
    if (title.trim() === "") return; // don't add empty titles

    const newMovie = {
      id: Date.now(), // unique number used as the key
      title: title,
      comment: comment,
      rating: rating,
    };

    setMovies([...movies, newMovie]);

    // clear the form
    setTitle("");
    setComment("");
    setRating(3);
  }

  // Remove a movie: keep every movie EXCEPT the one with this id
  function handleDelete(id) {
    setMovies(movies.filter((m) => m.id !== id));
  }

  // Change a rating: copy the list, replace only the matching movie
  function handleRate(id, newRating) {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, rating: newRating } : m))
    );
  }

  return (
    <div className="app">
      <h1>🎬 My Movies Watch List</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "star" : "stars"}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <h2>Watched ({movies.length})</h2>

      {movies.length === 0 ? (
        <p className="empty">No movies yet. Add your first one!</p>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={handleDelete}
            onRate={handleRate}
          />
        ))
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
