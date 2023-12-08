import { Spin } from 'antd'
import React from 'react'

const Spiner = ({ size = 'large' }) => {
	return (
		<Spin tip="Loading" size={size}>
			<div className="content" />
		</Spin>
	)
}

export default Spiner
