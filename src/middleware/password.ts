import bcrypt from 'bcrypt';


const validatePassword = (password: string): boolean => {
    if (!password) {
        return false;
    }

    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{9,}$/;

    return passwordRegex.test(password);
};

const encodePassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

const generatePasswordSalt = async (): Promise<string> => {
    return await bcrypt.genSalt(10);
};

const comparePassword = async (dataPassword: string, dbPassword: string): Promise<boolean> => {
    return await bcrypt.compare(dataPassword, dbPassword);
}

const concatPasswordAndSalt = (password: string, salt: string): string => {
    return password + salt;
}

export {
    validatePassword,
    encodePassword,
    generatePasswordSalt,
    comparePassword,
    concatPasswordAndSalt,
    
};