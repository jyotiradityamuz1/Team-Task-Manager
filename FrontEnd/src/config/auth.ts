import { APP_URLS } from "./url";

export function requireAuth() {
  const token = window.localStorage.getItem('token');
    if (!token) {
        window.location.href =  APP_URLS.LOGIN;
    } 
}

export function requireNoAuth() {
    const token = window.localStorage.getItem('token');
    if (token) {
        window.location.href = "/";
    }
}



export function checkLogin()
{
    const token = window.localStorage.getItem('token');
    return !!token;

    
}



export function logOut()
{
    window.localStorage.removeItem("token");
    window.location.reload();
}
