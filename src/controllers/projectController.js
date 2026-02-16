const projectService = require('../services/projectService');

exports.createProject = async (req, res) => {
  try {
    const { title, description, category, mainImage, thumbnailImages, keyFindings } = req.body;

    // Validate required fields
    if (!title || !description || !category || !mainImage) {
      return res.status(400).json({ 
        error: 'Title, description, category, and mainImage are required' 
      });
    }

    // Parse arrays if they're strings
    let categoryArray;
    try {
      categoryArray = typeof category === 'string' ? JSON.parse(category) : category;
    } catch (e) {
      return res.status(400).json({ error: 'Invalid category format' });
    }

    // Validate categories
    const validCategories = ['printing', 'website_creation', 'ui_ux', 'digital_marketing'];
    const invalidCategories = categoryArray.filter(cat => !validCategories.includes(cat));
    if (invalidCategories.length > 0) {
      return res.status(400).json({ 
        error: `Invalid categories: ${invalidCategories.join(', ')}` 
      });
    }

    // Parse thumbnail images and key findings
    const thumbnailImagesArray = thumbnailImages
      ? typeof thumbnailImages === 'string' ? JSON.parse(thumbnailImages) : thumbnailImages
      : [];

    const keyFindingsArray = keyFindings
      ? typeof keyFindings === 'string' ? JSON.parse(keyFindings) : keyFindings
      : [];

    // Validate URLs (basic check)
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(mainImage)) {
      return res.status(400).json({ error: 'Invalid main image URL' });
    }

    for (const url of thumbnailImagesArray) {
      if (!urlPattern.test(url)) {
        return res.status(400).json({ error: `Invalid thumbnail URL: ${url}` });
      }
    }

    const projectData = {
      title,
      description,
      category: categoryArray,
      mainImage,
      thumbnailImages: thumbnailImagesArray,
      keyFindings: keyFindingsArray,
    };

    const project = await projectService.createProject(projectData);
    res.status(201).json({ 
      message: 'Project created successfully', 
      project 
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let projects;
    if (search) {
      projects = await projectService.searchProjects(search);
    } else {
      const filters = category ? { category } : {};
      projects = await projectService.findAllProjects(filters);
    }

    res.json({ 
      projects,
      count: projects.length 
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.findProjectById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, mainImage, thumbnailImages, keyFindings } = req.body;

    const project = await projectService.findProjectById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    
    if (category) {
      const categoryArray = typeof category === 'string' ? JSON.parse(category) : category;
      const validCategories = ['printing', 'website_creation', 'ui_ux', 'digital_marketing'];
      const invalidCategories = categoryArray.filter(cat => !validCategories.includes(cat));
      if (invalidCategories.length > 0) {
        return res.status(400).json({ 
          error: `Invalid categories: ${invalidCategories.join(', ')}` 
        });
      }
      updateData.category = categoryArray;
    }

    if (mainImage) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(mainImage)) {
        return res.status(400).json({ error: 'Invalid main image URL' });
      }
      updateData.mainImage = mainImage;
    }

    if (thumbnailImages) {
      const thumbnailImagesArray = typeof thumbnailImages === 'string' 
        ? JSON.parse(thumbnailImages) 
        : thumbnailImages;

      if (thumbnailImagesArray.length > 10) {
        return res.status(400).json({ 
          error: 'Maximum 10 thumbnail images allowed' 
        });
      }

      const urlPattern = /^https?:\/\/.+/;
      for (const url of thumbnailImagesArray) {
        if (!urlPattern.test(url)) {
          return res.status(400).json({ error: `Invalid thumbnail URL: ${url}` });
        }
      }

      updateData.thumbnailImages = thumbnailImagesArray;
    }
    
    if (keyFindings) {
      updateData.keyFindings = typeof keyFindings === 'string' 
        ? JSON.parse(keyFindings) 
        : keyFindings;
    }

    const updatedProject = await projectService.updateProject(id, updateData);
    res.json({ 
      message: 'Project updated successfully', 
      project: updatedProject 
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.findProjectById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Just delete the project record (no file deletion needed)
    await projectService.deleteProject(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProjectStats = async (req, res) => {
  try {
    const totalProjects = await projectService.getProjectCount();
    res.json({ totalProjects });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};