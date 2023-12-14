import React from 'react'
import { Alert, Flex } from 'antd'
import { GenresConsumer } from '../contexts/GenresContext'

const Genres = ({ movie }) => {
	return (
		<Flex gap="0 5px" wrap="wrap">
			<GenresConsumer>
				{(genres) => {
					if (genres)
						return (
							<>
								{movie.genre_ids?.length ? (
									movie.genre_ids.map((genreID) => {
										const genre = genres.find((genre) => genre.id === genreID)
										if (genre)
											return (
												<div className="genre" key={genreID}>
													{genre.name}
												</div>
											)
									})
								) : (
									<div className="genre">No genres</div>
								)}
							</>
						)
					return <Alert message="Genres not loaded" type="error" banner style={{ padding: '4px 6px' }} />
				}}
			</GenresConsumer>
		</Flex>
	)
}

export default Genres
