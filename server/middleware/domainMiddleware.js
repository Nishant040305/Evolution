const Project = require('../models/Project'); // Adjust the path to your Project model as necessary

const domainMiddleware = async (req, res, next) => {
  const urlParts = req.path.split('/');
  const projectId = urlParts[1];

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    if (project) {
      // Log view in analytics
      await Project.updateOne(
        { _id: projectId },
        { $push: { 'analytics.views': Date.now() } }
      );
      console.log(
        `Project ${projectId} accessed directly | Total Views: ${1 + project.analytics.views.length}`
      );
    } else {
      console.warn(`Project ${projectId} not found for analytics logging.`);
    }
  } catch (error) {
    console.error(`Error logging analytics for project ${projectId}:`, error);
  }

  // Proceed to the next middleware or route handler
  next();
};

module.exports = domainMiddleware;
