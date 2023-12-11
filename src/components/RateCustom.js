import React from 'react'
import { Rate, Spin } from 'antd'

const RateCustom = ({ movie, changeRate, ratedLoading, deleteRate }) => {
	if (ratedLoading | movie.loading) return <Spin size="small" wrapperClassName="rate-spiner" />
	return (
		<Rate
			count={10}
			allowHalf
			value={movie.rating}
			onChange={(newRate) => {
				if (newRate !== 0) changeRate(movie.id, newRate)
				else deleteRate(movie.id)
			}}
		/>
	)
}

export default RateCustom
