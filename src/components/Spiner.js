import { Spin } from 'antd'
import React from 'react'

const Spiner = ({ size = 'large', ...rest }) => {
	return (
		<Spin tip="Loading" size={size} {...rest}>
			<div className="content" />
		</Spin>
	)
}

export default Spiner
