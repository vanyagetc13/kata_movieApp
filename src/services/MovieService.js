class MovieService {
	baseURL = 'https://api.themoviedb.org/3/'
	authorization =
		'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjZkNGI0MDdjZTk4MmVjMTgxZGZkMDM2YjljY2I1ZCIsInN1YiI6IjY1NjVlZDFkNmY1M2UxMDEzYWJkNWNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKnZeZJ2Ccq2gqLy4bn-Ljvt_qoPveNY6G6UY7DLa3g'
	createGuestSession() {
		return new Promise()
	}

	getMoviesByQuery(query, page = 1) {
		return fetch(this.baseURL + 'search/movie?query=' + query + '&page=' + page, {
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer ' + this.authorization,
			},
		}).then((res) => res.json())
	}
}

const movieService = new MovieService()
export default movieService
