class MovieService {
	baseURL = 'https://api.themoviedb.org/3/'
	// eslint-disable-next-line no-undef
	authorization = 'Bearer ' + process.env.REACT_APP_MOVIE_AUTH_TOKEN
	// eslint-disable-next-line no-undef
	api_key = process.env.REACT_APP_MOVIE_API_KEY

	validAuthentication() {
		return fetch(this.baseURL + '/authentication', {
			headers: {
				accept: 'application/json',
				Authorization: this.authorization,
			},
		}).then((res) => res.json())
	}

	createGuestSession() {
		return fetch(this.baseURL + '/authentication/guest_session/new?api_key=' + this.api_key, {
			headers: {
				accept: 'application/json',
			},
		}).then((res) => res.json())
	}

	getMoviesByQuery(query, page = 1) {
		return fetch(this.baseURL + '/search/movie?query=' + query + '&page=' + page, {
			headers: {
				accept: 'application/json',
				Authorization: this.authorization,
			},
		}).then((res) => res.json())
	}

	getGenres() {
		return fetch(this.baseURL + '/genre/movie/list', {
			headers: {
				accept: 'application/json',
				Authorization: this.authorization,
			},
		}).then((res) => res.json())
	}

	getRatedMovies(page = 1) {
		const sessionID = JSON.parse(localStorage.getItem('guestSessionID'))
		if (!sessionID) return
		return fetch(this.baseURL + `guest_session/${sessionID}/rated/movies?page=${page}&api_key=${this.api_key}`, {
			headers: {
				accept: 'application/json',
			},
		}).then((res) => res.json())
	}

	setMovieRateById(movieID, newRate) {
		const sessionID = JSON.parse(localStorage.getItem('guestSessionID'))
		return fetch(
			this.baseURL +
				`/movie/${movieID}/rating?api_key=${this.api_key}&guest_session_id=${sessionID}&api_key=${this.api_key}`,
			{
				method: 'POST',
				body: JSON.stringify({ value: newRate }),
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json;charset=utf-8',
				},
			}
		).then((res) => res.json())
	}
}

const movieService = new MovieService()
export default movieService
