import { format, parseISO } from 'date-fns'

const getFormatedDate = (dateString) => {
	try {
		return format(parseISO(dateString), 'MMMM d, yyyy')
	} catch (err) {
		if (!dateString) return 'N/A'
		return dateString
	}
}

export default getFormatedDate
