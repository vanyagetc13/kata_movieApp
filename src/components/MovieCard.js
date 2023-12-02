import { Card, Flex, Image } from 'antd'
import { format, parseISO } from 'date-fns'
import React from 'react'
// import Spiner from './Spiner'

const previewImageUrl = 'https://image.tmdb.org/t/p/w500/'

const PreviewImage = ({ url, preview = false }) => {
	return (
		<Image
			preview={preview}
			src={previewImageUrl + url}
			fallback="https://deichman.no/api/images/resize/800/cover-images/1677149663144745634a459dee9182d.jpg"
			alt="preview"
			style={{ width: '180px' }}
		/>
	)
}

const getClipedDescription = (str = '', n = 34) => {
	return str.split(' ').slice(0, n).join(' ') + ' ...'
}
const getFormatedDate = (dateString) => {
	return format(parseISO(dateString), 'MMMM d, yyyy')
}

export default class MovieCard extends React.Component {
	render() {
		const { movie } = this.props
		return (
			<Flex className="card">
				<PreviewImage url={movie.poster_path} />
				<Card
					title={movie.title}
					bordered={false}
					bodyStyle={{
						padding: '20px',
						marginTop: '-30px',
						display: 'flex',
						gap: '5px',
						flexDirection: 'column',
					}}
					// extra={<Spiner />}
					headStyle={{ border: 0 }}
					style={{ width: 280 }}
				>
					<div className="date">{getFormatedDate(movie.release_date)}</div>
					<Flex gap="0 5px" wrap="wrap">
						<div className="genre">Action</div>
						<div className="genre">Drama</div>
					</Flex>
					<p>{getClipedDescription(movie.overview)}</p>
				</Card>
			</Flex>
		)
	}
}
