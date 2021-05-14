/**
 * Tests if dotenv configuration is functioning.
 * 
 * @author Zablon Dawit
 */

describe('dotenv config', () => {
    it('is working and loading configuration', () => {
        expect(process.env.MONGODB_HOST) .toStrictEqual('mongodb://localhost:27017/users');
    })
})