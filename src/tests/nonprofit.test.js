const request = require('supertest');
const app = require('../app');

describe('Email Endpoints', () => {
  beforeAll(async () => {
    // Create multiple nonprofits
    await request(app)
      .post('/nonprofits')
      .send({
        name: 'Nonprofit A',
        address: '1 Example St',
        email: 'NonprofitA@gmail.com'
      });

    await request(app)
      .post('/nonprofits')
      .send({
        name: 'Nonprofit B',
        address: '2 Example St',
        email: 'NonprofitB@gmail.com'
      });

    await request(app)
      .post('/nonprofits')
      .send({
        name: 'Nonprofit C',
        address: '3 Example St',
        email: 'NonprofitC@gmail.com'
      });
  });
  
  it('should bulk send emails to a single nonprofit', async () => {
    const response = await request(app)
      .post('/emails/bulk')
      .send({
        nonprofitEmails: ['NonprofitA@gmail.com'],
        template: 'Hello {name}, address = {address}, date = {date}'
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.sent).toHaveLength(1);
  
    const sentRecord = response.body.sent[0];
    expect(sentRecord.to).toBe('NonprofitA@gmail.com');
    expect(sentRecord.body).toContain('Nonprofit A');
    expect(sentRecord.body).toContain('1 Example St');
  });

  it('should bulk send emails to multiple nonprofits', async () => {
    const response = await request(app)
      .post('/emails/bulk')
      .send({
        nonprofitEmails: [
          'NonprofitA@gmail.com',
          'NonprofitB@gmail.com',
          'NonprofitC@gmail.com'
        ],
        template: 'Hello {name}, we see you at {address} on {date}'
      });
    
    // Expect a successful response
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('sent');
    expect(response.body.sent.length).toBe(3); // we sent to 3 nonprofits

    // Let's check that each "to" address and body is correct:
    const sentA = response.body.sent.find(e => e.to === 'NonprofitA@gmail.com');
    expect(sentA).toBeDefined();
    expect(sentA.body).toContain('Nonprofit A');
    expect(sentA.body).toContain('1 Example St');

    const sentB = response.body.sent.find(e => e.to === 'NonprofitB@gmail.com');
    expect(sentB).toBeDefined();
    expect(sentB.body).toContain('Nonprofit B');
    expect(sentB.body).toContain('2 Example St');

    const sentC = response.body.sent.find(e => e.to === 'NonprofitC@gmail.com');
    expect(sentC).toBeDefined();
    expect(sentC.body).toContain('Nonprofit C');
    expect(sentC.body).toContain('3 Example St');
  });
});
