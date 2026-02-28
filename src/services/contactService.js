const prisma = require("../config/prisma");
const sendMail = require("../utils/sendMail");

class ContactService {
  async contactUsService(data) {
    console.log(process.env.SMTP_TO)
    await sendMail({
      to: process.env.SMTP_TO,
      subject: "Enquiry",
      html: `
        <h1>Enquiry Alert</h1>
        <p>Name: ${data.name} </p>
        <p>Organization Name: ${data.orgName} </p>
        <p>Phone: ${data.phone} </p>
        <p>Email: ${data.email} </p>
        <p>Service: ${data.service} </p>
        <p>Message: ${data.message} </p>
      
      `,
    });

    return await prisma.contactInfos.create({
      data: {
        name: data.name,
        orgName: data.orgName,
        phone: data.phone,
        email: data.email,
        service: data.service,
        message: data.message,
      },
    });
  }
}

module.exports = new ContactService();
