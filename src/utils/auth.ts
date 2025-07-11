import jwt from "jsonwebtoken"
import { IStudent } from "../models/student.model";
import { ITeacher } from "../models/teacher.model";

export interface IToken {
    id: string;
}

const generateToken = (user: IStudent | ITeacher): string => {
    return jwt.sign(
        { id: user._id, isAdmin: (user as ITeacher).isAdmin, email: user.email, role: (user as ITeacher).role ? (user as ITeacher).role : "" },
        process.env.JWT_SECRET as jwt.Secret,
        {
            expiresIn: (user as ITeacher).role ? "100d" : process.env.EXPIRES_IN
        }
    )
}

// const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(
//             token,
//             process.env.JWT_SECRET as jwt.Secret,
//             (err: any, payload: any) => {
//                 if (err) return reject(err)
//                 resolve(payload as IToken)
//             }
//         )
//     })
// }

export { generateToken }