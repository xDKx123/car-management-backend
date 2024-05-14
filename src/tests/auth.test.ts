import AuthMiddleware from "../middleware/auth.middleware";
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

describe('JWT token validation', () => {
    it('validate token', () => {
        const email: string = "test@test.si";

        const secret = 'd502f16b9a3e3fd43d8c5de0940c5a377cb4b045b48e6b88e0a51ef8b9d5a9f6';

        const expiresIn = 900000;    //value = 15m, if change

        const token = AuthMiddleware.generateToken(email, secret, expiresIn);

        jwt.verify(token, secret, async (err: VerifyErrors | null, decoded: any) => {
            expect(err).toBeNull();

            expect(decoded.email).toBe(email);

            const decodedExp = new Date(decoded.exp * 1000); // exp is in seconds
            const currentTime = new Date();
            const expectedExp = new Date(currentTime.getTime() + expiresIn); // Adding 15 more minutes in milliseconds
            expect(decodedExp.getTime()).toBeCloseTo(expectedExp.getTime(), -1000); // Close enough to 1 second
        });
    });
});