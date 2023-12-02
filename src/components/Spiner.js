import { Spin } from 'antd'
import React from 'react'

const Spiner = () => {
	return (
		<Spin tip="Loading" size="large">
			<div className="content" />
		</Spin>
	)
}

export default Spiner
