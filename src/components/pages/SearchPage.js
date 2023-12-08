/* eslint-disable indent */
import React from 'react'
import { debounce } from 'lodash'
import { Alert, Pagination } from 'antd'
import Spiner from '../Spiner'
import SearchInput from './../SearchInput'
import MovieList from './../MovieList'

class SearchPage extends React.Component {
	render() {
		const guestSessionError = this.props.guestSessionValid === 'rejected'
		const guestSessionFulfilled = this.props.guestSessionValid === 'fulfilled'
		const guestSessionPending = this.props.guestSessionValid === 'pending'
		const getRatedMovies = (data, ratedMovies) => {
			return data.map((movie) => {
				const ratedMovie = ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id)
				if (!ratedMovie) return movie
				else return ratedMovie
			})
		}
		return (
			<section className="search__page">
				<SearchInput
					disabled={guestSessionFulfilled}
					getMoviesByQuery={debounce(this.props.getMoviesByQuery, 700)}
				/>
				{guestSessionError && (
					<Alert
						message="Network Error"
						description="Try to use VPN or change DNS settings to get access"
						type="error"
					/>
				)}
				{this.props.error && <Alert message={this.props.error.message} type="error" />}
				{guestSessionFulfilled && this.props.results && !this.props.loading && (
					<MovieList
						data={getRatedMovies(this.props.results, this.props.ratedMovies)}
						ratedLoading={this.props.ratedLoading}
						changeRate={this.props.changeRate}
						deleteRate={this.props.deleteRate}
					/>
				)}
				{(guestSessionPending || this.props.loading || this.props.ratedLoading) && <Spiner />}
				{guestSessionFulfilled &&
					!this.props.loading &&
					!this.props.ratedLoading &&
					!this.props.results?.length &&
					!this.props.error && (
						<Alert
							message="Type to search."
							description="Type to search a movie in the input-field below."
							type="info"
						/>
					)}
				<Pagination
					onChange={this.props.getMoviesByPage}
					defaultCurrent={1}
					pageSize={20}
					showSizeChanger={false}
					total={this.props.totalMovies}
					style={{ textAlign: 'center', padding: 15 }}
				/>
			</section>
		)
	}
}

export default SearchPage
