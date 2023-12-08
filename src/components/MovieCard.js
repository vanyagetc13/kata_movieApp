import React from 'react'
import { Alert, Card, ConfigProvider, Flex, Image } from 'antd'
import { format, parseISO } from 'date-fns'
import { GenresConsumer } from '../contexts/GenresContext'
import AverageRate from './AverageRate'
import RateCustom from './RateCustom'

const previewImageUrl = 'https://image.tmdb.org/t/p/w500/'
const fallbackImageUrl = 'https://deichman.no/api/images/resize/800/cover-images/1677149663144745634a459dee9182d.jpg'

const PreviewImage = ({ url: path, preview = false }) => {
	if (!path) return <Image preview={preview} src={fallbackImageUrl} alt="poster" style={{ width: 180 }}></Image>
	return (
		<Image
			preview={preview}
			src={previewImageUrl + path}
			fallback={fallbackImageUrl}
			alt="poster"
			style={{ width: 180 }}
		/>
	)
}

const getClipedDescription = (str = '', n = 34) => {
	return str.split(' ').slice(0, n).join(' ') + ' ...'
}
const getFormatedDate = (dateString) => {
	try {
		return format(parseISO(dateString), 'MMMM d, yyyy')
	} catch (err) {
		if (!dateString) return 'N/A'
		return dateString
	}
}

export default class MovieCard extends React.Component {
	render() {
		const { movie } = this.props
		return (
			<Flex className="card">
				<PreviewImage url={movie.poster_path} />
				<ConfigProvider
					theme={{
						token: {
							lineWidth: 0,
						},
						components: {
							Card: {
								actionsLiMargin: '5px 0',
							},
						},
					}}
				>
					<Card
						title={movie.title}
						bordered={false}
						bodyStyle={{
							padding: '0 20px',
							display: 'flex',
							gap: '5px',
							flexDirection: 'column',
						}}
						extra={<AverageRate average={movie.vote_average} />}
						style={{ width: 280 }}
						actions={[
							<RateCustom
								movie={movie}
								changeRate={this.props.changeRate}
								key="rate"
								ratedLoading={this.props.ratedLoading}
								deleteRate={this.props.deleteRate}
							/>,
						]}
					>
						<div className="date">{getFormatedDate(movie.release_date)}</div>
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
									return (
										<Alert
											message="Genres not loaded"
											type="error"
											banner
											style={{ padding: '4px 6px' }}
										/>
									)
								}}
							</GenresConsumer>
						</Flex>
						<p>{getClipedDescription(movie.overview)}</p>
					</Card>
				</ConfigProvider>
			</Flex>
		)
	}
}
