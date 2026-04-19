import bcrypt from "bcrypt";

// hasher un mot de passe avant de le stocker en base
export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

// comparer un mot de passe en clair avec son hash pour vérifier qu'ils correspondent
export const comparePasswords = async (password, passwordHash) => {
    const isPwdValid = await bcrypt.compare (password, passwordHash)
    return isPwdValid
}
