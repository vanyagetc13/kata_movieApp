import React from 'react'
import Spiner from '../Spiner'
import MovieList from '../MovieList'

class RatedPage extends React.Component {
	render() {
		const { ratedLoading, ratedMovies, changeRate } = this.props
		if (!ratedLoading) return <MovieList data={ratedMovies} changeRate={changeRate} />
		return <Spiner />
	}
}

export default RatedPage
