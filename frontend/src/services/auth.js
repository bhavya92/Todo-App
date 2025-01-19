export const login = async (formValues) => {
    const url = "http://localhost:3000/user/login"
    try {
        const response = await fetch (url, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            credentials : 'include',
            body : JSON.stringify({
                email : formValues[0].value,
                password : formValues[1].value
            })
        });
        const data = await response.json();
        console.log(data.token);
        return data;
        
    } catch(err) {
        console.log("In catch of login")
        console.log(err.message);
    }
    return {};
}

export const signup = async (formValues) => {
   const url = "http://localhost:3000/user/signup";
   try {
    const response = await fetch(url, {
        method : "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials : 'include',
        body : JSON.stringify({
            email : formValues[2].value,
            password : formValues[3].value,
            firstName : formValues[0].value,
            lastName : formValues[1].value,
        })
    });
    const json = await response.json();
    return json;

  } catch (error) {
    console.error(error.message);
  }
}

export const logout = async () => {
    const url = "http://localhost:3000/user/logout";
    try {
        const response = await fetch(url, {
          method:'POST',
          credentials : 'include',
        });
        const data = await response.json();
        return data;
      } catch(error) {
          console.error('Error during token validation:', error);
      }
    };
