export const BASE_URL = "http://localhost:7000";

export const API_ENDPOINTS = {
    LOGIN: ` ${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/registerUser`,
    GET_USER: `${BASE_URL}/getUser`,
    GET_ALL_USER: `${BASE_URL}/getAllUser`,
    GET_SEARCH_USER:`${BASE_URL}/SearchUser`,
    CREATE_PROJECT:`${BASE_URL}/creatProject`,
    GET_USER_PROJECT:`${BASE_URL}/getUserProject`,
    CREAT_TASK:`${BASE_URL}/createTask`,
    GET_YOUR_TASK:`${BASE_URL}/getAllTaskByProject`,
    EDIT_STATUS:`${BASE_URL}/updateTaskStatus`,
    PROJECT_MEMBERS:`${BASE_URL}/ProjectMember`,
    CHANGE_PASSWORD:`${BASE_URL}/change-password`,
    PROJECT_STATUS:`${BASE_URL}/project-status`,
    COMPELET_PROJECT:`${BASE_URL}/compeleted-project`,
    GET_OTP:`${BASE_URL}/get-otp`,
    CREATE_PASSWORD:`${BASE_URL}/create-password`,
    ADD_MEMBER_TO_PROJECT:`${BASE_URL}/add-member`,
    DELETE_MEMBER_FROM_PROJECT:`${BASE_URL}/delete-member`,

};




export const APP_URLS = {
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    REGISTER:"/register",
    PROJECT :'/project',
    CREAT_PROJECT :'/create-project',
    CHANGE_PASSWORD :'/change-password',
    TEAM :'/team',
    SETTING:'/setting',
    FORGET_PASSWORD:'/forgotPassword',
};