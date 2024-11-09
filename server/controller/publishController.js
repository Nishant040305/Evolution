
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const User = require("../models/User");
const Project = require('../models/Project');
const lighthouse = require('../utils/lighthouse.js');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const publishProject = async (req, res) => {
    const { id, htmlContent, style_css, script_js } = req.body;

    const project = await Project.findById(id);
    const { name, description, keywords } = project;
    
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
        <meta name="description" content="${description}">
        ${keywords.map(keyword => `<meta name="keywords" content="${keyword}">`).join('')}
        <meta name="robots" content="index, follow">
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
        project.publishVersion += 1;
        await project.save();

        res.status(200).json({ message: 'Files saved successfully.', data: project });
    });
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

const downloadProject = (req, res) => {
    const { id } = req.params;
    const folderPath = path.join(__dirname, `../public/${id}`);
    const zipFilePath = path.join(__dirname, `${id}.zip`);
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