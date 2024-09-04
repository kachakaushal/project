import bcrypt from 'bcrypt'

export const hashPassword = async (paasword) => {
    try {
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(paasword,saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparepassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}