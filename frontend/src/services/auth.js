export const login = async (formValues) => {
    const url = "http://localhost:3000/user/login"
    try {
        const response = await fetch (url, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body : JSON.stringify({
                email : formValues[0].value,
                password : formValues[1].value
            })
        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`); 
        } else {
            console.log(data.token);
        }
    } catch(err) {
        console.error(err.message)
    }
 
}

export const signup = async (formValues) => {
   const url = "http://localhost:3000/user/signup";
   console.log("Email " + formValues[2].value);
   try {
    const response = await fetch(url, {
        method : "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body : JSON.stringify({
            email : formValues[2].value,
            password : formValues[3].value,
            firstName : formValues[0].value,
            lastName : formValues[1].value,
        })
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}