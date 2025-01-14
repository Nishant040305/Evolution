
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const User = require("../models/User");
const Project = require('../models/Project');
const lighthouse = require('../utils/lighthouse.js');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const getHTML = (name, description, keywords, htmlContent, styles, scripts) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name}</title>
        <meta name="description" content="${description}">
        ${keywords.map(keyword => `<meta name="keywords" content="${keyword}">`).join('')}
        <meta name="robots" content="index, follow">
        ${styles.map(style => `<link rel="stylesheet" href="${style}">`).join('')}
    </head>
    <body>
        ${htmlContent}
        ${scripts.map(script => `<script src="${script}"></script>`).join('')}
    </body>
    </html>`;
}

const saveFile = (projectDir, file, content) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(projectDir, file.name);
        const dirPath = path.dirname(filePath);

        // Ensure the directory exists
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating directories:", err);
                return reject(err);
            }

            // Write the file
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error("Error saving file:", err);
                    return reject(err);
                } else {
                    console.log("File saved successfully");
                    resolve();
                }
            });
        });
    });
};

const publishProject = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID is required.' });

    const project = await Project.findById(id);
    const { name, description, keywords } = project;
    const projectDir = path.join(__dirname, `../public/${id}`);

    try {
        // Save all files
        for (const file of project.files) {
            let content = file.content;
            if (file.name.endsWith(".html")) {
                content = getHTML(name, description, keywords, file.content, file.styles, file.scripts);
            }
            await saveFile(projectDir, file, content); // Await the saveFile operation
        }

        // Increment the project version and save it
        project.publishVersion += 1;
        await project.save();
        res.status(200).json({ message: 'Files saved successfully.', data: project });
    } catch (err) {
        console.error("Error saving files:", err);
        res.status(500).json({ error: 'Error saving files.' });
    }
};

const openProject = async (req, res) => {
    const { domain } = req.params;
    console.log("Opening project", domain);
    try {
        const project = await Project.findOne({ domain });

        if (project) {
            await Project.updateOne(
                { _id: project._id },
                { $push: { 'analytics.views': Date.now() } }
            );
            console.log(`Project ${project._id} opened | Views: ${1 + project.analytics.views.length}`);
            const filePath = path.join(__dirname, `../public/${project._id}/index.html`);
            return res.sendFile(filePath);
        } else {
            return res.status(404).send('404 Page not found');
        }
    } catch (error) {
        console.error("Error fetching project:", error);
        return res.status(500).send('Server error');
    }
}

const downloadProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const { publishVersion } = project;
    if (publishVersion === 0) {
        return res.status(400).json({ message: 'Project not published' });
    }

    const folderPath = path.join(__dirname, `../public/${id}`);
    const zipFilePath = path.join(__dirname, `${id}_${publishVersion}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();

    output.on('close', () => {
        res.sendFile(zipFilePath, (err) => {
            if (err) res.status(500).send('Error downloading the file');
            fs.unlinkSync(zipFilePath);
        });
    });

    archive.on('error', () => res.status(500).send('Error zipping the folder'));
};

const auditProject = async (req, res) => {
    const { domain } = req.params;
    const project = await Project.findOne({ domain });
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    const url = `${process.env.SERVER}/${domain}`;
    const filePath = path.join(__dirname, `../public/${project._id}/report.html`);
    await lighthouse(url, filePath);
    return res.sendFile(filePath);
};

module.exports = {
    publishProject,
    openProject,
    downloadProject,
    auditProject,
};