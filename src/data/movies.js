export const movies = [
  {
    id: "stellar",
    title: "Stellar",
    genre: "Sci-Fi",
    language: "English",
    duration: "2h 28m",
    rating: "8.9",
    certificate: "UA",
    year: 2026,
    description: "A deep-space rescue mission discovers a signal that changes humanity's understanding of the universe.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=85",
    cinemas: [
      { id: "pvr", name: "PVR Cinemas", area: "City Centre", formats: ["2D", "IMAX"], shows: ["10:15 AM", "1:30 PM", "6:15 PM", "9:30 PM"] },
      { id: "inox", name: "INOX", area: "Mall Road", formats: ["2D", "3D"], shows: ["11:00 AM", "2:45 PM", "7:00 PM", "10:15 PM"] }
    ]
  },
  {
    id: "midnight",
    title: "Midnight Chase",
    genre: "Action",
    language: "English",
    duration: "2h 05m",
    rating: "8.2",
    certificate: "UA",
    year: 2026,
    description: "A detective has one night to stop a city-wide conspiracy before the final train leaves.",
    poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85",
    cinemas: [
      { id: "cinepolis", name: "Cinepolis", area: "Downtown", formats: ["2D"], shows: ["9:45 AM", "12:30 PM", "4:15 PM", "8:45 PM"] },
      { id: "pvr2", name: "PVR Cinemas", area: "City Centre", formats: ["2D", "4DX"], shows: ["11:20 AM", "3:10 PM", "6:50 PM", "10:40 PM"] }
    ]
  },
  {
    id: "aurora",
    title: "Aurora",
    genre: "Drama",
    language: "English",
    duration: "1h 58m",
    rating: "8.6",
    certificate: "U",
    year: 2026,
    description: "Two strangers meet under the northern lights and discover a reason to begin again.",
    poster: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1800&q=85",
    cinemas: [
      { id: "inox2", name: "INOX", area: "Mall Road", formats: ["2D"], shows: ["10:30 AM", "1:15 PM", "5:00 PM", "8:20 PM"] },
      { id: "cinepolis2", name: "Cinepolis", area: "Downtown", formats: ["2D"], shows: ["12:00 PM", "3:30 PM", "6:45 PM", "9:55 PM"] }
    ]
  },
  {
    id: "velocity",
    title: "Velocity",
    genre: "Thriller",
    language: "English",
    duration: "2h 12m",
    rating: "8.4",
    certificate: "UA",
    year: 2026,
    description: "A racing engineer uncovers a dangerous secret hidden inside the world's fastest prototype.",
    poster: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85",
    cinemas: [
      { id: "pvr3", name: "PVR Cinemas", area: "City Centre", formats: ["2D", "4DX"], shows: ["10:00 AM", "1:00 PM", "5:30 PM", "9:15 PM"] },
      { id: "inox3", name: "INOX", area: "Mall Road", formats: ["2D"], shows: ["11:45 AM", "3:00 PM", "7:30 PM", "10:30 PM"] }
    ]
  },
  {
    id: "echo",
    title: "Echoes",
    genre: "Mystery",
    language: "English",
    duration: "2h 01m",
    rating: "8.1",
    certificate: "UA",
    year: 2026,
    description: "A journalist returns to her hometown when an old recording reveals an impossible clue.",
    poster: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
    cinemas: [
      { id: "cine4", name: "Cinepolis", area: "Downtown", formats: ["2D"], shows: ["10:20 AM", "2:10 PM", "6:00 PM", "9:40 PM"] }
    ]
  },
  {
    id: "monsoon",
    title: "Monsoon Letters",
    genre: "Romance",
    language: "English",
    duration: "2h 10m",
    rating: "8.7",
    certificate: "U",
    year: 2026,
    description: "A box of forgotten letters brings two families together during one unforgettable monsoon.",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1800&q=85",
    cinemas: [
      { id: "pvr4", name: "PVR Cinemas", area: "City Centre", formats: ["2D"], shows: ["9:30 AM", "12:45 PM", "4:00 PM", "7:45 PM"] }
    ]
  }
];

export const genres = ["All", ...new Set(movies.map((movie) => movie.genre))];