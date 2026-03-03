const clientService = require("../services/clientService");

exports.addClient = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Validate required fields
    if (!name || !image) {
      return res.status(400).json({
        error: "Name and Image are required",
      });
    }

    // Validate URLs (basic check)
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(image)) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    const clientData = {
      name,
      image,
    };

    const client = await clientService.createClient(clientData);
    res.status(201).json({
      message: "Client added successfully",
      client,
    });
  } catch (error) {
    console.error("Add client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientService.findAllClients();

    res.json({
      clients,
      count: clients.length,
    });
  } catch (error) {
    console.error("Get clients error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.findClientById(id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ client });
  } catch (error) {
    console.error("Get client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const client = await clientService.findClientById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const updateData = {};

    if (name) updateData.name = name;

    if (image) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(image)) {
        return res.status(400).json({ error: "Invalid image URL" });
      }
      updateData.image = image;
    }

    const updatedMember = await clientService.updateClient(id, updateData);
    res.json({
      message: "Client data updated successfully",
      client: updatedMember,
    });
  } catch (error) {
    console.error("Update client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await clientService.findClientById(id);

    if (!member) {
      return res.status(404).json({ error: "Client not found" });
    }

    await clientService.deleteClient(id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Delete client error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
