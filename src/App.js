import React from 'react'
import { Alert, Pagination } from 'antd'
import { debounce } from 'lodash'
import './App.css'
import movieService from './services/MovieService'
import MovieList from './components/MovieList'
import SearchInput from './components/SearchInput'
import Spiner from './components/Spiner'

class App extends React.Component {
	state = {
		results: null,
		loading: false,
		totalMovies: 1,
		currentPage: 1,
		guestSessionValid: 'fulfilled',
		lastQuery: null,
		error: null,
	}

	errorCatcher = (err, str) => {
		this.setState({
			...this.state,
			error: err,
			loading: false,
			results: null,
			lastQuery: str ? str : this.state.lastQuery,
		})
	}

	getMoviesByQuery = (str) => {
		this.setState({
			...this.state,
			loading: true,
			error: null,
		})
		movieService
			.getMoviesByQuery(str)
			.then((res) => {
				console.log(res)
				if (!res.total_results) {
					throw new Error('Nothing found by this Query.')
				}
				this.setState({
					...this.state,
					results: res.results,
					totalMovies: res.total_results,
					lastQuery: str,
					currentPage: 1,
					loading: false,
				})
			})
			.catch((err) => {
				this.errorCatcher(err, str)
			})
	}

	getMoviesByPage = (page) => {
		this.setState({
			...this.state,
			loading: true,
			error: null,
		})
		movieService
			.getMoviesByQuery(this.state.lastQuery, page)
			.then((res) => {
				this.setState({
					...this.state,
					currentPage: page,
					results: res.results,
					loading: false,
				})
			})
			.catch((err) => {
				this.errorCatcher(err)
			})
	}

	render() {
		const guestSessionError = this.state.guestSessionValid === 'rejected'
		const guestSessionFulfilled = this.state.guestSessionValid === 'fulfilled'
		const guestSessionPending = this.state.guestSessionValid === 'pending'
		return (
			<>
				<SearchInput disabled={guestSessionFulfilled} getMoviesByQuery={debounce(this.getMoviesByQuery, 500)} />
				{guestSessionError && (
					<Alert
						message="Network Error"
						description="Try to use VPN or change DNS settings to get access"
						type="error"
					/>
				)}
				{this.state.error && <Alert message={this.state.error.message} type="error" />}
				{guestSessionFulfilled && this.state.results && !this.state.loading && (
					<MovieList data={this.state.results} />
				)}
				{(guestSessionPending || this.state.loading) && <Spiner />}
				{guestSessionFulfilled && !this.state.loading && !this.state.results && !this.state.error && (
					<Alert
						message="Type to search."
						description="Type to search a movie in the input-field below."
						type="info"
					/>
				)}
				<Pagination
					onChange={this.getMoviesByPage}
					defaultCurrent={1}
					pageSize={20}
					showSizeChanger={false}
					total={this.state.totalMovies}
					style={{ textAlign: 'center', padding: 15 }}
				/>
			</>
		)
	}
}

export default App
