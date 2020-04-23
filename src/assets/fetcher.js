import axios from 'axios'

//axios fetcher function
export const fetcher = async (...args) => {
	try {
		const res = await axios.get(...args)
		// using post response from axios
		const response = await res.data

		return response
	} catch (err) {
		return err
	}
}
