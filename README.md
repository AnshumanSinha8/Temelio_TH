This is a quick repo to house my solution for Temelio's initial take home test.

This is a Node/Express server capable of sending a few specific API requests to a server.
These requests are capable of the following:
• Create and store nonProfits in-memory along with limited metadata
• Bulk send templeted emails to all nonProfits
• Retrieve all emails sent to nonprofits

## Installation
After cloning the github url locally, you must run `npm install` prior to spinning up the application.
If node/npm are not downloaded locally to your machine, then I recommend you download the Node LTS to get started:
- https://nodejs.org/en/download


## Usage and Testing:
The following commands asssume you are executing in a terminal open to this directory.
To run the server locally at PORT 8000, simply execute `npm start`
To run test scripts, simply execute `npm test`

## API Requests
Here are some Curl commands to play around with to test the routes:
- To create a nonProfit:
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Nonprofit A",
       "address": "1 Example St",
       "email": "NonprofitA@gmail.com"
     }' \
     http://localhost:8080/nonprofits

- To Bulk send emails:
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
       "nonprofitEmails": ["NonprofitA@gmail.com"],
       "template": "Hello {name}, we see you at {address} on {date}"
     }' \
     http://localhost:8080/emails/bulk

- To retrieve all emails sent:
curl http://localhost:8080/emails