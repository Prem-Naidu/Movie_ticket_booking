import { useMemo, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Search, MapPin, UserRound, Ticket, ChevronRight, Star, Clock3, CalendarDays, Armchair, CheckCircle2, ArrowLeft, X, Menu, Film } from "lucide-react";
import { movies, genres } from "./data/movies";

const currency = (n) => `₹${n.toLocaleString("en-IN")}`;

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const nav = [
    ["Home", "/"],
    ["Movies", "/movies"],
    ["My Bookings", "/bookings"]
  ];
  return (
    <header className="header">
      <div className="nav-shell">
        <Link to="/" className="brand"><span className="brand-mark"><Film size={20}/></span>Cine<span>Book</span></Link>
        <nav className={open ? "nav open" : "nav"}>
          {nav.map(([name, path]) => <Link key={path} className={location.pathname === path ? "active" : ""} onClick={() => setOpen(false)} to={path}>{name}</Link>)}
        </nav>
        <div className="nav-actions">
          <button className="location-btn"><MapPin size={16}/> City</button>
          <button className="icon-btn" aria-label="Profile"><UserRound size={19}/></button>
          <button className="mobile-menu icon-btn" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>
  );
}

function Home() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const filtered = useMemo(() => movies.filter(m => (genre === "All" || m.genre === genre) && m.title.toLowerCase().includes(query.toLowerCase())), [query, genre]);
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">MOVIE NIGHTS, MADE EASY</span>
            <h1>Book your next<br/><em>movie night.</em></h1>
            <p>Discover movies, pick your seats and get your tickets in minutes.</p>
            <div className="search-box"><Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies..." /></div>
          </div>
        </div>
      </section>
      <main className="container">
        <section className="section-head"><div><p className="kicker">NOW SHOWING</p><h2>Movies near you</h2></div><Link to="/movies" className="text-link">View all <ChevronRight size={17}/></Link></section>
        <div className="chips">{genres.map(g => <button key={g} className={genre === g ? "chip selected" : "chip"} onClick={() => setGenre(g)}>{g}</button>)}</div>
        <div className="movie-grid">{filtered.slice(0, 6).map(movie => <MovieCard key={movie.id} movie={movie}/>)}</div>
      </main>
    </>
  );
}

function MovieCard({ movie }) {
  return <Link to={`/movie/${movie.id}`} className="movie-card">
    <div className="poster-wrap"><img src={movie.poster} alt={movie.title}/><span className="rating"><Star size={13} fill="currentColor"/> {movie.rating}</span></div>
    <div className="movie-info"><h3>{movie.title}</h3><p>{movie.genre} · {movie.duration}</p><small>{movie.language} · {movie.certificate}</small></div>
  </Link>;
}

function Movies() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const list = movies.filter(m => (genre === "All" || m.genre === genre) && m.title.toLowerCase().includes(query.toLowerCase()));
  return <main className="container page-pad">
    <div className="page-title"><div><p className="kicker">EXPLORE</p><h1>All movies</h1></div><div className="search-small"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search"/></div></div>
    <div className="chips">{genres.map(g => <button key={g} className={genre === g ? "chip selected" : "chip"} onClick={() => setGenre(g)}>{g}</button>)}</div>
    <div className="movie-grid">{list.map(movie => <MovieCard key={movie.id} movie={movie}/>)}</div>
  </main>;
}

function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id) || movies[0];
  const [cinema, setCinema] = useState(movie.cinemas[0]);
  return <main>
    <section className="detail-hero" style={{backgroundImage:`linear-gradient(90deg, rgba(7,7,10,.96), rgba(7,7,10,.68), rgba(7,7,10,.35)), url(${movie.backdrop})`}}>
      <div className="container detail-inner"><Link className="back-link" to="/movies"><ArrowLeft size={17}/> Back</Link>
        <div className="detail-content"><img className="detail-poster" src={movie.poster} alt={movie.title}/><div><span className="eyebrow">{movie.genre.toUpperCase()} · {movie.year}</span><h1>{movie.title}</h1><div className="meta-row"><span><Star size={15} fill="currentColor"/> {movie.rating}</span><span><Clock3 size={15}/> {movie.duration}</span><span>{movie.certificate}</span><span>{movie.language}</span></div><p>{movie.description}</p></div></div>
      </div>
    </section>
    <div className="container booking-area"><div className="section-head"><div><p className="kicker">SELECT SHOW</p><h2>Choose a cinema & time</h2></div><span className="date-pill"><CalendarDays size={16}/> Today</span></div>
      <div className="cinema-list">{movie.cinemas.map(c => <div key={c.id} className={cinema.id===c.id ? "cinema selected-cinema" : "cinema"} onClick={()=>setCinema(c)}><div><h3>{c.name}</h3><p>{c.area} · {c.formats.join(" / ")}</p></div><div className="showtimes">{c.shows.map(show => <Link key={show} to={`/seats/${movie.id}/${c.id}/${encodeURIComponent(show)}`} className="showtime" onClick={e=>e.stopPropagation()}>{show}</Link>)}</div></div>)}</div>
    </div>
  </main>;
}

const rows = ["A","B","C","D","E","F","G","H"];
const seats = rows.flatMap(row => Array.from({length:10}, (_,i) => `${row}${i+1}`));
const initialBooked = new Set(["A4","A5","A6","D3","D4","E7","F7","G2","G3","H8","H9"]);

function SeatBooking() {
  const { id, cinemaId, show } = useParams();
  const movie = movies.find(m=>m.id===id) || movies[0];
  const cinema = movie.cinemas.find(c=>c.id===cinemaId) || movie.cinemas[0];
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const price = 180;
  const convenience = 36;
  const subtotal = selected.length * price;
  const total = subtotal + (selected.length ? convenience : 0);
  const toggle = seat => {
    if (initialBooked.has(seat)) return;
    setSelected(s => s.includes(seat) ? s.filter(x=>x!==seat) : s.length < 8 ? [...s, seat] : s);
  };
  const continueBooking = () => {
    if (!selected.length) return;
    const booking = { id: `CB${Date.now().toString().slice(-7)}`, movieId: movie.id, movie: movie.title, cinema: cinema.name, area: cinema.area, show: decodeURIComponent(show), seats: selected, total, date: new Date().toLocaleDateString("en-IN") };
    const existing = JSON.parse(localStorage.getItem("cinebookBookings") || "[]");
    localStorage.setItem("cinebookBookings", JSON.stringify([booking, ...existing]));
    navigate(`/confirmation/${booking.id}`, { state: { booking } });
  };
  return <main className="container page-pad">
    <Link to={`/movie/${movie.id}`} className="back-link dark"><ArrowLeft size={17}/> {movie.title}</Link>
    <div className="booking-header"><div><p className="kicker">SELECT SEATS</p><h1>{cinema.name}</h1><p>{cinema.area} · {decodeURIComponent(show)}</p></div><span className="date-pill"><CalendarDays size={16}/> Today</span></div>
    <div className="screen-wrap"><div className="screen">SCREEN</div><p>All eyes this way</p></div>
    <div className="seat-map">{rows.map((row,ri)=><div className="seat-row" key={row}><span className="row-label">{row}</span>{Array.from({length:10},(_,i)=>{const s=`${row}${i+1}`; return <button key={s} disabled={initialBooked.has(s)} onClick={()=>toggle(s)} className={`seat ${initialBooked.has(s)?"booked":selected.includes(s)?"selected":""}`}>{i+1}</button>})}</div>)}</div>
    <div className="seat-legend"><span><i className="available"/> Available</span><span><i className="selected-dot"/> Selected</span><span><i className="booked-dot"/> Sold</span></div>
    <div className="booking-bottom"><div><small>{selected.length} seats selected</small><strong>{currency(total)}</strong></div><button className="primary-btn" disabled={!selected.length} onClick={continueBooking}>Continue <ChevronRight size={18}/></button></div>
  </main>;
}

function Confirmation() {
  const { id } = useParams();
  const location = useLocation();
  const stored = JSON.parse(localStorage.getItem("cinebookBookings") || "[]");
  const booking = location.state?.booking || stored.find(b=>b.id===id);
  if (!booking) return <main className="container page-pad"><h1>Booking not found</h1><Link className="primary-btn inline" to="/">Go home</Link></main>;
  return <main className="container page-pad confirmation-page">
    <div className="success-icon"><CheckCircle2 size={52}/></div><p className="kicker">BOOKING CONFIRMED</p><h1>Enjoy the show!</h1><p className="muted">Your ticket has been saved on this device.</p>
    <div className="ticket"><div className="ticket-top"><div><small>MOVIE</small><h2>{booking.movie}</h2></div><span className="ticket-code">{booking.id}</span></div><div className="ticket-grid"><div><small>CINEMA</small><strong>{booking.cinema}</strong><span>{booking.area}</span></div><div><small>SHOWTIME</small><strong>{booking.show}</strong><span>{booking.date}</span></div><div><small>SEATS</small><strong>{booking.seats.join(", ")}</strong><span>{booking.seats.length} ticket(s)</span></div><div><small>TOTAL</small><strong>{currency(booking.total)}</strong><span>Paid for demo</span></div></div></div>
    <div className="confirm-actions"><Link to="/" className="primary-btn">Book another movie</Link><Link to="/bookings" className="secondary-btn">My bookings</Link></div>
  </main>;
}

function Bookings() {
  const [bookings] = useState(() => JSON.parse(localStorage.getItem("cinebookBookings") || "[]"));
  return <main className="container page-pad"><div className="page-title"><div><p className="kicker">YOUR TICKETS</p><h1>My bookings</h1></div></div>
    {!bookings.length ? <div className="empty"><Ticket size={42}/><h2>No bookings yet</h2><p>Your confirmed movie tickets will appear here.</p><Link to="/movies" className="primary-btn inline">Browse movies</Link></div> :
    <div className="booking-history">{bookings.map(b=><Link to={`/confirmation/${b.id}`} state={{booking:b}} className="history-card" key={b.id}><div><small>{b.id}</small><h3>{b.movie}</h3><p>{b.cinema} · {b.show}</p><p>Seats: {b.seats.join(", ")}</p></div><div><strong>{currency(b.total)}</strong><ChevronRight/></div></Link>)}</div>}
  </main>;
}

function App() {
  return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/movies" element={<Movies/>}/><Route path="/movie/:id" element={<MovieDetails/>}/><Route path="/seats/:id/:cinemaId/:show" element={<SeatBooking/>}/><Route path="/confirmation/:id" element={<Confirmation/>}/><Route path="/bookings" element={<Bookings/>}/></Routes><footer>© 2026 CineBook · Frontend demo</footer></>;
}

export default App;