function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailregex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (email && password) {
        if (!emailregex.test(email)) {
            alert('Please enter valid email')
            return;
        }
        const getusersData = JSON.parse(localStorage.getItem("user-list"));
        const userData = getusersData?.filter((el) => el.email === email)[0];
        if (userData) {
            if (userData.password === password) {
                localStorage.setItem("loggedinUser", JSON.stringify(userData));
                location.href = "./home.html";
            } else {
                alert('Please Enter valid Password')
            }

        } else {
            alert('User Not found. Please SignUp')
            location.href = "./register.html";
        }



    }
};

function handleSignUp(e) {
    e.preventDefault();
    const passwordRegex = /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,18}$/;
    const emailregex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPass').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!emailregex.test(email)) {
        alert('Please enter valid email')
        return;
    }
    if (!passwordRegex.test(password)) {
        alert('Password should contain 8 characters, number and one Uppercase letter')
        return;
    }
    if (password === confirmPass) {
        let getuserList = JSON.parse(localStorage.getItem("user-list")) || [];
        if (getuserList?.length && getuserList.filter((el) => el.email === email).length > 0) {
            alert("Email already Registered");
            return;
        }
        const signUpData = {
            name: firstName + lastName,
            email,
            password,
        }
        const userList = [...getuserList, signUpData]
        localStorage.setItem('user-list', JSON.stringify(userList))
        alert('User registered!!');
        location.href = "./login.html";
    } else {
        alert('Passwords do not match. Please verify')
        return;
    }
};