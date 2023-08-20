import axios from 'axios'

export let Axios = axios.create({
    baseURL : 'http://localhost:5000/api',
    withCredentials : true
})
export let Upload = async (url) => {
    try {
        let form = new FormData()
        form.append('file',url)
        form.append('upload_preset','Blog-App ')
        form.append('cloud_name','du9pkirsy')
        let res = await axios.post('https://api.cloudinary.com/v1_1/du9pkirsy/image/upload',form)
        return res.data.secure_url;
    } catch (error) {
        console.error(error)
    }
}
//https://res.cloudinary.com/du9pkirsy
//https://api.cloudinary.com/v1_1/du9pkirsy