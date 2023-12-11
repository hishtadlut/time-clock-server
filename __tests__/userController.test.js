const request = require('supertest');
const app = require('../index');
beforeAll((done) => {
    server = app.listen(3001, done); // Start the server on a test-specific port                                                                           
});
describe('RFID Endpoint Tests', () => {
    it('should create a new RFID entry', async () => {
        const res = await request(app)
            .post('/rfid')
            .send({
                rfid_tag: '1234567890'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'RFID data inserted');
    });

    // Add more tests as needed for other endpoints and scenarios                                                                                          
});

afterAll((done) => {
    if (server && server.listening) {
        server.close(done);
    } else {
        done();
    }
});  