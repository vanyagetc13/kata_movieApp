import React from 'react'
import './App.css'
import { Tabs } from 'antd'
import movieService from './services/MovieService'
import SearchPage from './components/pages/SearchPage'
import RatedPage from './components/pages/RatedPage'
import { GenresProvider } from './contexts/GenresContext'

class App extends React.Component {
	state = {
		results: [],
		loading: false,
		ratedLoading: false,
		totalMovies: 1,
		currentPage: 1,
		guestSessionValid: 'fulfilled',
		lastQuery: null,
		error: null,
		sessionID: null,
		genres: null,
		ratedMovies: [],
	}

	errorCatcher = (err, str) => {
		this.setState((prev) => ({
			...prev,
			error: err,
			lastQuery: str ? str : prev.lastQuery,
		}))
	}

	getMoviesByQuery = (str) => {
		this.setState((prev) => ({
			...prev,
			loading: true,
			error: null,
			totalMovies: null,
		}))
		movieService
			.getMoviesByQuery(str)
			.then((res) => {
				if (!res.total_results) {
					throw new Error('Nothing found by this Query.')
				}
				this.setState((prev) => ({
					...prev,
					results: res.results,
					totalMovies: res.total_results,
					lastQuery: str,
					currentPage: 1,
					loading: false,
				}))
			})
			.catch((err) => {
				this.errorCatcher(err, str)
			})
	}

	changeRateByID = (id, newRate) => {
		this.setState((prev) => ({ ...prev, ratedLoading: true }))
		movieService
			.setMovieRateById(id, newRate)
			.then(() => {
				this.updateRatedMovieStateByID(id, newRate)
			})
			.catch(this.errorCatcher)
	}

	deleteRateByID = (id) => {
		this.setState((prev) => ({ ...prev, ratedLoading: true }))
		movieService
			.deleteMovieRateByID(id)
			.then(() => {
				this.updateRatedMovieStateByID(id)
			})
			.catch(this.errorCatcher)
	}

	updateRatedMovieStateByID = (id, newRate = 0) => {
		this.setState((prev) => {
			const index = prev.ratedMovies.findIndex((movie) => movie.id === id)
			if (index === -1) return
			const newRatedMovies = [...prev.ratedMovies]
			const newMovie = { ...prev.ratedMovies[index], rating: newRate }
			newRatedMovies.splice(index, 1, newMovie)
			console.log(newRatedMovies)
			return {
				...prev,
				ratedMovies: newRatedMovies,
				ratedLoading: false,
			}
		})
	}

	getMoviesByPage = (page) => {
		this.setState((prev) => ({
			...prev,
			loading: true,
			error: null,
		}))
		movieService
			.getMoviesByQuery(this.state.lastQuery, page)
			.then((res) => {
				this.setState((prev) => ({
					...prev,
					currentPage: page,
					results: res.results,
					loading: false,
				}))
			})
			.catch(this.errorCatcher)
	}

	getSessionID() {
		this.setState((prev) => ({
			...prev,
			sessionID: null,
			guestSessionValid: 'pending',
		}))
		let sessionID = null
		const parsed = JSON.parse(localStorage.getItem('guestSessionID'))
		if (!parsed)
			movieService
				.createGuestSession()
				.then((response) => {
					sessionID = response.guest_session_id
					localStorage.setItem('guestSessionID', JSON.stringify(sessionID))
				})
				.catch((err) => {
					this.setState((prev) => ({ ...prev, guestSessionValid: 'rejected', error: err }))
				})
		else sessionID = parsed
		this.updateRatedMovies()
		this.setState((prev) => ({
			...prev,
			sessionID: sessionID,
			guestSessionValid: 'fulfilled',
		}))
	}

	getGenres() {
		movieService
			.getGenres()
			.then((response) => {
				this.setState((prev) => ({
					...prev,
					genres: response.genres,
				}))
			})
			.catch(this.errorCatcher)
	}

	updateRatedMovies = () => {
		this.setState((prev) => ({ ...prev, ratedLoading: true, ratedMovies: [] }))
		// setTimeout(() => {
		movieService
			.getRatedMovies()
			.then((res) => {
				this.setState((prev) => ({ ...prev, ratedLoading: false, ratedMovies: res.results }))
			})
			.catch((err) => {
				this.setState((prev) => ({
					...prev,
					ratedLoading: false,
					guestSessionValid: 'rejected',
					error: err,
				}))
				this.errorCatcher(err)
			})
		// }, 1000) // Из-за внутренних задержек, севрер отправляет неизмененные данные.

		// Только если total_pages = 1
	}

	componentDidMount() {
		this.getSessionID()
		this.getGenres()
	}

	componentDidCatch() {}

	render() {
		const tabs = [
			{
				key: '1',
				label: 'Search',
				children: (
					<SearchPage
						guestSessionValid={this.state.guestSessionValid}
						getMoviesByQuery={this.getMoviesByQuery}
						getMoviesByPage={this.getMoviesByPage}
						error={this.state.error}
						results={this.state.results}
						ratedMovies={this.state.ratedMovies}
						loading={this.state.loading}
						ratedLoading={this.state.ratedLoading}
						totalMovies={this.state.totalMovies}
						changeRate={this.changeRateByID}
						deleteRate={this.deleteRateByID}
					/>
				),
			},
			{
				key: '2',
				label: 'Rated',
				children: (
					<RatedPage
						changeRate={this.changeRateByID}
						deleteRate={this.deleteRateByID}
						ratedMovies={this.state.ratedMovies}
						ratedLoading={this.state.ratedLoading}
					/>
				),
			},
		]
		return (
			<GenresProvider value={this.state.genres}>
				<Tabs
					tabBarStyle={{ width: 'fit-content', margin: '0 auto 16px' }}
					centered
					style={{ width: '100%', height: '100%', minHeight: 'inherit' }}
					defaultActiveKey="1"
					items={tabs}
					onChange={() => {
						this.updateRatedMovies()
					}}
					// destroyInactiveTabPane
				/>
			</GenresProvider>
		)
	}
}

export default App
