const fs = require('fs');
const path = require('path');
const User = require("../models/User");
const Project = require('../models/Project');
const { ImageUpload } = require('../utils/ImageUpload');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('user', '_id displayname email');
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving projects', error });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('user', '_id displayname email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving project', error });
    }
};

const createProject = async (req, res) => {
    try {
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newProject = new Project({
            name: req.body.name,
            description: req.body.description,
            user: req.body.user,
            components:{}
        });
        const savedProject = await newProject.save();
        user.projects.push(savedProject._id);
        await user.save();
        return res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

const updateComponents = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: { components: req.body } },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating project', error });
    }
};

const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating project', error });
    }
};

const updateImageProject = async (req,res)=>{
    try{
        const valid = Project.findById(req.body.params);
        if(!valid) return res.status(404).json({message:"Project Not Found"})
        const url = await ImageUpload(req.file);
        if(url.message!="OK"){
            console.log(url)
            return res.status(400).json({message:url.message});
        }
        const updateProjectMedia = await Project.findByIdAndUpdate(
            req.params.id,
            {$push :{ media: url.url}},
            {new :true}
        )
        if(!updateProjectMedia) {
            return res.status(404).json({message:"Project not found"})
        }
        return res.status(200).json({message:"success",url:url.url});
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
         // Update the user by removing the projectId from the projects array
         await User.updateOne(
            { _id: deletedProject.user }, 
            { $pull: { projects: req.params.id } } 
        );
        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting project', error });
    }
};

const publishProject = async (req, res) => {
    const { id, htmlContent, style_css, script_js } = req.body;

    const project = await Project.findById(id);
    const { name, description } = project;
    
    if (!id || !htmlContent) {
        return res.status(400).json({ error: 'ID and HTML content are required.' });
    }

    const projectDir = path.join(__dirname, `../public/${id}`);
    const htmlPath = path.join(projectDir, 'index.html');
    const cssPath = path.join(projectDir, 'style.css');
    const jsPath = path.join(projectDir, 'script.js');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }

    // Full HTML content with head and body structure
    const index_html = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name}</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${htmlContent}
        <script src="script.js"></script>
    </body>
    </html>`;

    // Write HTML file
    fs.writeFile(htmlPath, index_html, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving HTML file.' });
        }

        // Write CSS file if provided
        if (style_css) {
            fs.writeFile(cssPath, style_css, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving CSS file.' });
                }
            });
        }

        // Write JS file if provided
        if (script_js) {
            fs.writeFile(jsPath, script_js, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving JS file.' });
                }
            });
        }

        // Increment the project version and save it
        project.version += 1;
        await project.save();

        res.status(200).json({ message: 'Files saved successfully.', data: project });
    });
};

const openProject = async (req, res) => {
    const { domain } = req.params;
    try {
        const project = await Project.findOne({ domain });

        if (project) {
            project.analytics.views += 1;
            const filePath = path.join(__dirname, `../public/${project._id}/index.html`);
            project.save();
            return res.sendFile(filePath);
        } else {
            return res.status(404).send('404 Page not found');
        }
    } catch (error) {
        console.error("Error fetching project:", error);
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    updateComponents,
    deleteProject,
    publishProject,
    openProject,
    updateImageProject,
};
