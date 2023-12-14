const getClipedDescription = (str = '', n = 34) => {
	return str.split(' ').slice(0, n).join(' ') + ' ...'
}

export default getClipedDescription
