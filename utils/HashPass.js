import bcrypt from 'bcryptjs'

export default (pass) => {
    return bcrypt.hashSync(pass, 10);
}