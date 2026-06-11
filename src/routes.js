import express from 'express';

import { showHomePage } from './controllers/index.js';
import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm,
    organizationValidation, 
    processNewOrganizationForm, 
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { 
    showProjectsPage, 
    showProjectDetailsPage,
    showNewProjectForm,
    projectValidation, 
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm, 
    categoryValidation
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUsersPage
} from './controllers/users.js';


const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

//route to handle new organization form submission 
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm
);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', requireRole('admin'), showNewProjectForm);

router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);

router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);

router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

router.post('/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);

router.get('/register', showUserRegistrationForm );

router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);

router.post('/login', processLoginForm);

router.get('/logout', processLogout);

router.get('/dashboard',
    requireLogin,
    showDashboard
);

router.get(
    '/users',
    requireRole('admin'),
    showUsersPage
);

// Error test route
router.get('/test-error', testErrorPage);

export default router;