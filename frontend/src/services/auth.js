export const login = async (formValues) => {
  const url = "http://localhost:3000/user/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        email: formValues[0].value,
        password: formValues[1].value,
      }),
    });
    const data = await response.json();
    console.log(data.token);
    localStorage.setItem("email",data.email);
    localStorage.setItem("firstName",data.firstName);
    localStorage.setItem("lastName",data.lastName);
    return data;
  } catch (err) {
    console.log("In catch of login");
    console.log(err.message);
  }
  return {};
};

export const send_email = async (email) => {
  const url = "http://localhost:3000/user/verify-email";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers : {
        "Content-Type":"application/json; charset=UTF-8",
      },
      credentials:'include',
      body: JSON.stringify({
        email,
      })
    });

    const json = await response.json();
    if(json.status === '200') {
      console.log("Here boy");
      return '1';
    } else if(json.status === '409') {
      return '2';
    } else {
      return '0';
    }
  } catch(err) {
    console.log({err});
    return 0;
  }
}

export const send_otp = async (email, otp) => {
  const url = "http://localhost:3000/user/verify-otp";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json; charset=UTF-8",
      },
      credentials:'include',
      body: JSON.stringify({
        email,
        otp,
      }),
    });
    const json = await response.json();
    if(json.status === '200') {
      console.log("status 200");
      return '1';
    } else if(json.status === '400') {
      console.log("hey",json.status);
      return '2';
    } else {
      return '0';
    }
  } catch(err) {
    console.log('Error fetching');
    console.log({err});
    return '0';
  }
}

export const signup = async (email, password, firstName, lastName) => {
  const url = "http://localhost:3000/user/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials:'include',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });
    const json = await response.json();
    localStorage.setItem("email",json.email);
    localStorage.setItem("firstName",json.firstName);
    localStorage.setItem("lastName",json.lastName);
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

export const logout = async () => {
  const url = "http://localhost:3000/user/logout";
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    localStorage.clear();
    return data;
  } catch (error) {
    console.error("Error during token validation:", error);
  }
};
