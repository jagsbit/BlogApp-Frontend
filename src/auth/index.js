// doLogin-> save data in localstorage

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}


// isLoggedin-> check local storage contins token or not

export const isLoggedin=()=>{
     let data=localStorage.getItem("data");
     return data!=null?true:false;
}

// doLogout-> remove user data from localstorage

export const doLogout=()=>{
    localStorage.removeItem("data");
}

// getUser-> fetch user data from localstorage

export const getUser = () => {
  if (isLoggedin()) {
    return JSON.parse(localStorage.getItem("data")).user;
  }
  return undefined;
};

// getToken-- fetch token from localstorage

export const getToken=()=>{
   if (isLoggedin()) {
    return JSON.parse(localStorage.getItem("data")).token;
  }
  return undefined;
}
