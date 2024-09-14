const [error, setError] = useState('');

    const handleOnChange = (text, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: text })
    }

    const isValidObject = (obj) => {
        return Object.values(obj).every((value) => value.trim());
    }

    const isValidEmail = (val) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(val);
    }

    const updateError = (error, setUpdater) => {
        setUpdater(error);
        setTimeout(() => {
            setUpdater('');
        }, 2500)
    }

    const isValidForm = () => {
        if (!isValidObject(userInfo)) return updateError('All Fields are Required', setError);
        if (!userInfo['username'].trim() || userInfo['username'].length < 3) return updateError('Invalid Username!', setError);
        if (!isValidEmail(userInfo['email'])) return updateError('Invalid Email!', setError);
        if (!userInfo['password'].trim() || userInfo['password'].length < 8) return updateError('Password must be 8 characters or more!', setError);
        if (userInfo['password'] !== userInfo['confirm']) return updateError('Confirm Password must be same as Password!', setError);
        else return true
    }

    const submitForm = () => {
        if (isValidForm()) {
            console.warn("Good");
        }
    }