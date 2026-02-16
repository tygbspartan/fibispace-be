const teamService = require("../services/teamService");

exports.addMember = async (req, res) => {
  try {
    const { name, designation, image, aboutMe } = req.body;

    // Validate required fields
    if (!name || !designation || !image || !aboutMe) {
      return res.status(400).json({
        error: "Name, Designation, Image, and AboutMe are required",
      });
    }

    // Validate URLs (basic check)
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(image)) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    const teamData = {
      name,
      designation,
      image,
      aboutMe,
    };

    const team = await teamService.createMember(teamData);
    res.status(201).json({
      message: "Member added successfully",
      team,
    });
  } catch (error) {
    console.error("Add member error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await teamService.findAllMembers();

    res.json({
      members,
      count: members.length,
    });
  } catch (error) {
    console.error("Get team members error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await teamService.findMemberById(id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ member });
  } catch (error) {
    console.error("Get team member error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, aboutMe, designation, image } = req.body;

    const member = await teamService.findMemberById(id);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (aboutMe) updateData.aboutMe = aboutMe;
    if (designation) updateData.designation = designation;

    if (image) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(image)) {
        return res.status(400).json({ error: "Invalid image URL" });
      }
      updateData.image = image;
    }

    const updatedMember = await teamService.updateMember(id, updateData);
    res.json({
      message: "Member data updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Update member error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await teamService.findMemberById(id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    await teamService.deleteMember(id);
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Delete member error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
