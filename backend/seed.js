require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./models/movie");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected, seeding movies...");

        await Movie.deleteMany({}); // clear old
        await Movie.insertMany([
            {
                title: "The Dark Knight",
                genre: "Action",
                releaseYear: 2008,
                director: "Christopher Nolan",
                cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
                synopsis: "Batman battles the Joker, who wreaks havoc on Gotham City.",
                posterUrl: "https://m.media-amazon.com/images/I/51K8ouYrHeL._AC_SY679_.jpg"
            },
            {
                title: "Inception",
                genre: "Sci-Fi",
                releaseYear: 2010,
                director: "Christopher Nolan",
                cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
                synopsis: "A thief who enters dreams to steal secrets takes on his toughest mission yet.",
                posterUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
            },
            {
                title: "Interstellar",
                genre: "Sci-Fi",
                releaseYear: 2014,
                director: "Christopher Nolan",
                cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
                synopsis: "A team of explorers travel through a wormhole in space to save humanity.",
                posterUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
            },
            {
                title: "The Matrix",
                genre: "Sci-Fi",
                releaseYear: 1999,
                director: "The Wachowskis",
                cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
                synopsis: "A hacker discovers reality is a simulated world controlled by machines.",
                posterUrl: "https://m.media-amazon.com/images/I/51vpnbwFHrL._AC_.jpg"
            },
            {
                title: "The Shawshank Redemption",
                genre: "Drama",
                releaseYear: 1994,
                director: "Frank Darabont",
                cast: ["Tim Robbins", "Morgan Freeman"],
                synopsis: "Two imprisoned men bond over years, finding solace and redemption.",
                posterUrl: "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_.jpg"
            },
            {
                title: "The Godfather",
                genre: "Crime",
                releaseYear: 1972,
                director: "Francis Ford Coppola",
                cast: ["Marlon Brando", "Al Pacino", "James Caan"],
                synopsis: "The patriarch of a mafia dynasty transfers control of his empire to his son.",
                posterUrl: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg"
            },
            {
                title: "Fight Club",
                genre: "Drama",
                releaseYear: 1999,
                director: "David Fincher",
                cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
                synopsis: "An insomniac office worker and a soap maker form an underground fight club.",
                posterUrl: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
            },
            {
                title: "Pulp Fiction",
                genre: "Crime",
                releaseYear: 1994,
                director: "Quentin Tarantino",
                cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
                synopsis: "The lives of hitmen, a boxer, and a gangster’s wife intertwine in Los Angeles.",
                posterUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg"
            },

            {
                title: "Gladiator",
                genre: "Action",
                releaseYear: 2000,
                director: "Ridley Scott",
                cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
                synopsis: "A betrayed Roman general seeks vengeance against the corrupt emperor.",
                posterUrl: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg"
            }
        ]);

        console.log("Movies seeded!");
        process.exit();
    })
    .catch(err => console.error(err));
