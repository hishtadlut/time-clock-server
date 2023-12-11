const request = require('supertest');
const app = require('../index'); // Ensure that app is exported from index.js                                                                            

let server;

beforeAll((done) => {
    server = app.listen(3001, done); // Start the server on a test-specific port                                                                           
});

describe('RFID Endpoint Tests', () => {
    it('should create a new RFID entry', async () => {
        const res = await request(server) // Use the server instance for requests                                                                            
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
    // Assuming `server` is the instance of your app's server                                                                                              
    if (server && server.listening) {
        server.close(() => {
            done(); // Call done() after the server is closed                                                                                                  
        });
    } else {
        done(); // Call done() if the server is not listening or doesn't need to be closed                                                                   
    }
});     