const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const [projects] = await tables.projects.getAll();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await tables.projects.read(id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, team_id, user_id, is_archived = 0 } = req.body; // Default value for is_archived
    console.log('Creating project with data:', { name, team_id, user_id, is_archived });

    if (!name || !team_id || !user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const projectId = await tables.projects.create(name, team_id, user_id, is_archived);
    const newProject = await tables.projects.read(projectId);
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    next(err);
  }
};

module.exports = { browse, read, create };
