// import axios from "axios";


// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// const axiosClient = axios.create({
//     baseURL: 'http://localhost:1337/api/',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//         }
// })

// const CreateNewResume =(data)=>axiosClient.post('/user-resumes',data);
// const GetUserResumes = (userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);


// const UpdateResumeDetail = (id,data)=>axiosClient.put(`/user-resumes/${id}`, data);
// const GetResumeById = (id)=>axiosClient.get('/user-resumes/'+id+"?populate=*");
// const DeleteResume = (id)=>axiosClient.delete('/user-resumes/'+id);

// export default{
//     CreateNewResume,
//     GetUserResumes,
//     UpdateResumeDetail,
//     GetResumeById,
//     DeleteResume

// }
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/resume"; // Adjust the URL as needed

// const GlobalApi = {
//   createResume: (data) => axios.post(`${BASE_URL}/create`, data, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       "Content-Type": "application/json",
//     },
//   }),
//   getUserResumes: () =>
//     axios.get('http://localhost:5000/api/resume/user', {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//             "Content-Type": "application/json",
//         },
//     }),

//   getResumeById: (resumeId) =>
//     axios.get(`http://localhost:5000/api/resume/${resumeId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         "Content-Type": "application/json",
//       },
//     }),
    
// };


// export default GlobalApi;

import axios from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to handle auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Resume API endpoints
const ResumeApi = {
    createResume: (data) => 
        axiosInstance.post("/resume/create", data),

    getUserResumes: () => 
        axiosInstance.get("/resume/getResume"),

    getResumeById: (resumeId) => 
        axiosInstance.get(`/resume/${resumeId}`),
        
    updateResume: (resumeId, data) => 
        axiosInstance.put(`/resume/${resumeId}`, data),
        
    deleteResume: (resumeId) => 
        axiosInstance.delete(`/resume/${resumeId}`),
};

export default ResumeApi;