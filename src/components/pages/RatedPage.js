import React from 'react'
import { Pagination } from 'antd'
import Spiner from '../Spiner'
import MovieList from '../MovieList'
import getPaginatedList from './../../utils/getPaginatedLits'

class RatedPage extends React.Component {
	state = {
		pageSize: window.innerWidth < 1024 ? 10 : 20,
		page: 1,
	}
	render() {
		const { ratedLoading, ratedMovies, changeRate, deleteRate } = this.props
		return (
			<section className="page">
				{ratedLoading ? (
					<Spiner />
				) : (
					<MovieList
						data={getPaginatedList(ratedMovies, this.state.pageSize, this.state.page)}
						changeRate={changeRate}
						deleteRate={deleteRate}
					/>
				)}
				<Pagination
					current={this.state.page}
					pageSize={this.state.pageSize}
					total={ratedMovies.length}
					onChange={(page) => {
						this.setState((prev) => ({ ...prev, page: page }))
					}}
				/>
			</section>
		)
	}
}

export default RatedPage
