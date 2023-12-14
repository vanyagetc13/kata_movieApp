const getPaginatedList = (list, pageSize, currentPage) => {
	return [...list].splice((currentPage - 1) * pageSize, pageSize)
}

export default getPaginatedList
