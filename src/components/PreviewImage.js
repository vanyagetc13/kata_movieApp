import { Image } from 'antd'
import React from 'react'

const previewImageUrl = 'https://image.tmdb.org/t/p/w500/'
const fallbackImageUrl = 'https://deichman.no/api/images/resize/800/cover-images/1677149663144745634a459dee9182d.jpg'

const PreviewImage = ({ url: path, width = 180, preview = false }) => {
	if (!path) return <Image preview={preview} src={fallbackImageUrl} alt="poster" style={{ width: width }}></Image>
	return (
		<Image
			preview={preview}
			src={previewImageUrl + path}
			fallback={fallbackImageUrl}
			alt="poster"
			style={{ width: width }}
		/>
	)
}

export default PreviewImage
