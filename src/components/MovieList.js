import { Flex } from 'antd'
import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ data }) => {
	return (
		<Flex wrap="wrap" justify="space-between" gap={36}>
			{data.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</Flex>
	)
}

export default MovieList
