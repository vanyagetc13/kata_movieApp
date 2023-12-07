import React from 'react'

class AverageRate extends React.Component {
	render() {
		const rate = this.props.average ? Math.ceil(this.props.average * 10) / 10 : '?'
		const colorClass = rate > 3 ? (rate > 5 ? (rate > 7 ? 'best' : 'good') : 'bad') : 'worst'
		return <div className={['average-rate', colorClass].join(' ')}>{rate}</div>
	}
}

export default AverageRate
