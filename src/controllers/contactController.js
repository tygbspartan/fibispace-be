const contactService = require("../services/contactService");

exports.contactUs = async (req, res) => {
  try {
    const { name, orgName, phone, email, service, message } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        error: "Name, phone, and email are required",
      });
    }

    const contactData = {
      name,
      orgName,
      phone,
      email,
      service,
      message,
    };

    const contact = await contactService.contactUsService(contactData);
    res.status(201).json({
      message: "Contact sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact us error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
