const request = require('supertest');
const app = require('../app');

describe('Email Endpoints', () => {
  // Create a nonprofit before we run our bulk send test, 
  // so we have something to send emails to.
  beforeAll(async () => {
    await request(app)
      .post('/nonprofits')
      .send({
        name: 'Nonprofit A',
        address: '1 Example St',
        email: 'NonprofitA@gmail.com'
      });
  });

  it('should bulk send emails to the specified nonprofits', async () => {
    const response = await request(app)
      .post('/emails/bulk')
      .send({
        nonprofitEmails: ['NonprofitA@gmail.com'],
        template: 'Hello {name}, we see you at {address} on {date}'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('sent');
    expect(response.body.sent.length).toBe(1);

    const sentRecord = response.body.sent[0];
    expect(sentRecord).toHaveProperty('to', 'NonprofitA@gmail.com');

    // Check the body for the replaced fields
    expect(sentRecord.body).toContain('Nonprofit A');
    expect(sentRecord.body).toContain('1 Example St');
    
    // The date is dynamic, let's just check it has today's date format (YYYY-MM-DD)
    const dateRegex = /\d{4}-\d{2}-\d{2}/; 
    expect(sentRecord.body).toMatch(dateRegex);
  });
});
