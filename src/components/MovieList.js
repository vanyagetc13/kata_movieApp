import { Flex } from 'antd'
import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ data, changeRate, ratedLoading }) => {
	return (
		<Flex wrap="wrap" justify="space-between" gap={36}>
			{data.map((movie) => (
				<MovieCard key={movie.id} movie={movie} changeRate={changeRate} ratedLoading={ratedLoading} />
			))}
		</Flex>
	)
}

export default MovieList
