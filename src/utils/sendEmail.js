const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require("../config/env");

const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

const request = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "danishkaleem595@gmail.com",
        Name: "Consultants",
      },
      To: [ 
        {
          Email: "danishkaleem595@gmail.com",
          Name: "Consultants",
        },
      ],
      Subject: "Welcome to AAMAX",
      TextPart: `Asslamu alaikum`,
      HTMLPart: `<strong>Asslamu alaikum</strong> <p>Welcome to AAMAX</p><h3><a href="/contact">Contact Us</a></h3>`,
    },
  ],
});

request
  .then((response) => {
    console.log("Email sent successfully!");
    console.log(response.body); // Log response body if needed
  })
  .catch((err) => {
    console.error("Error sending email:", err.statusCode, err.message);
  });
