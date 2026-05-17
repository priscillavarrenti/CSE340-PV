import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';
import { getAllProjects } from './src/models/projects.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Recreate __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Configure Express middleware
 */

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find views
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes
 */

// Home page
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

// Organizations page
app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations()
    const title = 'Our Partner Organizations'
    
    res.render('organizations', { title, organizations });
});

// Projects page
app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Projects';
    res.render('projects', { title, projects });
});

// Categories page
app.get('/categories', async (req, res) => {
    const categories = await getAllCategories()
    const title = 'Service Categories';
    res.render('categories', { title, categories });
});

// Start server
app.listen(PORT, async () => {

    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit with failure code if database connection fails
    }
});
