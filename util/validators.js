module.exports.validateRegisterInput= (username, password, email, confirmPassword) => {
    const errors={}
    if(username.trim()==="") {
        errors.username="Username field should not be empty"
    }
    if(password.trim()==="") {
        errors.password="Password field cannot be empty"
    }
    if(password.trim()==="") {
        errors.password="Password field cannot be empty"
    }    
    if(password!=confirmPassword) {
        errors.confirmPassword="ConfirmPassword do not match with password"
    }
    if(email.trim()==="") {
        errors.email="Email field should not be empty"
    } else {        
        if(!email.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)) {
            errors.email="Email is not valid"
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length<1
    }
    
}

module.exports.validateLoginInput= (username, password) => {
    const errors={}
    if(username.trim()==="") {
        errors.username="Username field should not be empty"
    }
    if(password.trim()==="") {
        errors.password="Password field cannot be empty"
    }
    
    return {
        errors,
        valid: Object.keys(errors).length<1
    }
    
}