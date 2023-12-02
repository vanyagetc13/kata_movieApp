import { Input } from 'antd'
import React from 'react'

export default class SearchInput extends React.Component {
	state = {
		queryValue: '',
	}

	onChangeHandler = (e) => {
		const value = e.target.value
		this.setState({ queryValue: value }, () => {
			const value = this.state.queryValue.trimStart()
			if (value !== '') this.props.getMoviesByQuery(value)
		})
	}

	render() {
		return <Input placeholder="Search your movie" value={this.queryValue} onChange={this.onChangeHandler} />
	}
}
