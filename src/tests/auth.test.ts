import AuthMiddleware from "../middleware/auth.middleware";
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

describe('JWT token validation', () => {
    it('validate access token', () => {
        const email: string = "test@test.si";

        const secret = process.env.ACCESS_TOKEN_SECRET as string;

        const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN as string;    //value = 15m, if change, change also the test

        const token = AuthMiddleware.generateAccessToken(email);

        jwt.verify(token, secret, async (err: any, decoded: any) => {
            expect(err).toBeNull();

            expect(decoded.email).toBe(email);

            const decodedExp = new Date(decoded.exp * 1000); // exp is in seconds
            const currentTime = new Date();
            const expectedExp = new Date(currentTime.getTime() + 900 * 1000); // Adding 15 more minutes in milliseconds
            expect(decodedExp.getTime()).toBeCloseTo(expectedExp.getTime(), -1000); // Close enough to 1 hour
        });
    });

    it('validate refresh token', () => {
        const email: string = "test@test.si";

        const secret = process.env.REFRESH_TOKEN_SECRET as string;

        const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN as string;    //value = 15m, if change, change also the test

        const token = AuthMiddleware.generateRefreshToken(email);

        jwt.verify(token, secret, async (err: VerifyErrors | null, decoded: any) => {
            expect(err).toBeNull();

            expect(decoded.email).toBe(email);

            const decodedExp = new Date(decoded.exp * 1000); // exp is in seconds
            const currentTime = new Date();
            const expectedExp = new Date(currentTime.getTime() + 900 * 1000); // Adding 15 more minutes in milliseconds
            expect(decodedExp.getTime()).toBeCloseTo(expectedExp.getTime(), -1000); // Close enough to 1 hour
        });
    });
});