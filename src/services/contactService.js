const prisma = require("../config/prisma");
const sendMail = require("../utils/sendMail");

class ContactService {
  async contactUsService(data) {
    await sendMail({
      to: process.env.SMTP_TO,
      subject: "Enquiry",
      html: `
        <h1>Enquiry Alert</h1>
        <p>${data.name} </p>
        <p>${data.orgName} </p>
        <p>${data.phone} </p>
        <p>${data.email} </p>
        <p>${data.service} </p>
        <p>${data.message} </p>
      
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
