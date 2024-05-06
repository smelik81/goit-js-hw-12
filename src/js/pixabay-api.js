import axios from 'axios';

export async function searchPhoto(searchImages, page) {

   try {
     const BASE_URL = 'https://pixabay.com/api/';
     const API_KEY = '43587882-3fd012595c4df59010c013d1f';

     const { data } = await axios.get(BASE_URL, {
       params: {
         key: API_KEY,
         q: searchImages,
         image_type: 'photo',
         orientation: 'horizontal',
         safesearch: 'true',
         per_page: 15,
         page,
       },
     });
       
     return data;
   } catch (error) {
    console.error('Error fetching data, please try again:', error);
      throw new Error(error.response.status);
   }


};

