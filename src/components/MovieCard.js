import React from 'react'
import { Card, ConfigProvider, Flex } from 'antd'
import { getClipedDescription, getFormatedDate } from '../utils'
import AverageRate from './AverageRate'
import RateCustom from './RateCustom'
import Genres from './Genres'
import PreviewImage from './PreviewImage'

export default class MovieCard extends React.Component {
	render() {
		const { innerWidth } = window
		const isMobile = innerWidth < 1024
		const { movie } = this.props
		return (
			<Flex className="card">
				<PreviewImage url={movie.poster_path} width={isMobile ? 108 : 180} />
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
							justifySelf: 'center',
						}}
						extra={<AverageRate average={movie.vote_average} />}
						style={{
							width: 280,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							boxShadow: 'none',
						}}
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
						<Genres movie={movie} />
						<p>{getClipedDescription(movie.overview)}</p>
					</Card>
				</ConfigProvider>
			</Flex>
		)
	}
}
