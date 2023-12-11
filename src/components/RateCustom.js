import { Rate } from 'antd'
import React from 'react'
import Spiner from './Spiner'

const RateCustom = ({ movie, changeRate, ratedLoading, deleteRate }) => {
	if (ratedLoading) return <Spiner size="small" />
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
