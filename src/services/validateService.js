module.exports = {
    validateName: (name) => {
        if(name) {
            if (typeof name != 'string') return { success: false, reason: 'Name must be a string type'};
            else if (name.length < 3) return { success: false, reason: 'Name must be at least 3 characters'};
            else if (name.length > 20) return { success: false, reason: 'Name exceeded length limit of 20 characters'};
            else return { success: true};
        } else return { success: false, reason: 'Name is required field'};
    },
    validateEmail: (email) => {
        if(email) {
           const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (pattern.test(email)) return { success: true }
            else return { success: false, reason: 'Invalid email format' }
        } else return { success: false, reason: 'Email is required field'};
    },
    validatePassword: (password) => {
        if(password) {
            if (password.length < 8) return { success: false, reason: "Password must be at least 8 characters"}
            else if (password.length > 20) return { success: false, reason: "Password exceeded length limit of 20 characters"}
            else return { success: true }
        } else return { success: false, reason: 'Password is required field'};
    },
    validateContactNo: (name) => {
        if(name) {
            if (typeof name != 'string') return { success: false, reason: 'Name must be a string type'};
            else if (name.length < 3) return { success: false, reason: 'Name must be at least 3 characters'};
            else if (name.length > 20) return { success: false, reason: 'Name exceeded length limit of 20 characters'};
            else return { success: true};
        } else return { success: false, reason: 'Name is required field'};
    },
    validateDate: (name) => {
        if(name) {
            if (typeof name != 'string') return { success: false, reason: 'Name must be a string type'};
            else if (name.length < 3) return { success: false, reason: 'Name must be at least 3 characters'};
            else if (name.length > 20) return { success: false, reason: 'Name exceeded length limit of 20 characters'};
            else return { success: true};
        } else return { success: false, reason: 'Name is required field'};
    },
    validateAge: (name) => {
        if(name) {
            if (typeof name != 'string') return { success: false, reason: 'Name must be a string type'};
            else if (name.length < 3) return { success: false, reason: 'Name must be at least 3 characters'};
            else if (name.length > 20) return { success: false, reason: 'Name exceeded length limit of 20 characters'};
            else return { success: true};
        } else return { success: false, reason: 'Name is required field'};
    }
}