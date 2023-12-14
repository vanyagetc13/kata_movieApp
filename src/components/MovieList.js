import { Flex } from 'antd'
import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ data, changeRate, ratedLoading, deleteRate }) => {
	const { innerWidth } = window
	return (
		<Flex wrap="wrap" justify="space-between" vertical={innerWidth < 1024} gap={innerWidth < 1090 ? 18 : 36}>
			{data.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					changeRate={changeRate}
					ratedLoading={ratedLoading}
					deleteRate={deleteRate}
				/>
			))}
		</Flex>
	)
}

export default MovieList
