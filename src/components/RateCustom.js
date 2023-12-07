import { Rate } from 'antd'
import React from 'react'
import Spiner from './Spiner'

const RateCustom = ({ movie, changeRate, ratedLoading }) => {
	if (ratedLoading) return <Spiner />
	return (
		<Rate
			count={10}
			allowHalf
			value={movie.rating}
			onChange={(newRate) => {
				changeRate(movie.id, newRate)
			}}
		/>
	)
}

export default RateCustom
