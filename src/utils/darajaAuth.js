import axios from 'axios';

const getOAuthToken = async () => {
  try {
    const response = await axios.get('https://75uox1kdig.execute-api.us-east-1.amazonaws.com/tefc')

    return response.data.access_token
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export default getOAuthToken;
