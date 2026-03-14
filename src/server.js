require('dotenv').config();
const express = require('express');

// Import Users
const users = require('./api/users/routes');
const UsersHandler = require('./api/users/handler');
const UsersService = require('./services/database/UsersService');
const UsersValidator = require('./validator/users');
const authentications = require('./api/authentications/routes');
const AuthenticationsHandler = require('./api/authentications/handler');
const AuthenticationsService = require('./services/database/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');
const TokenManager = require('./utils/TokenManager');

// Import Jobs
const jobs = require('./api/jobs/routes');
const JobsHandler = require('./api/jobs/handler');
const JobsService = require('./services/database/JobsService');

// Import Companies
const companies = require('./api/companies/routes');
const CompaniesHandler = require('./api/companies/handler');
const CompaniesService = require('./services/database/CompaniesService');

// Import Documents
const documents = require('./api/documents/routes');
const DocumentsHandler = require('./api/documents/handler');
const DocumentsService = require('./services/database/DocumentsService');

// Import Categories
const categories = require('./api/categories/routes');
const CategoriesHandler = require('./api/categories/handler');
const CategoriesService = require('./services/database/CategoriesService');

// Import Applications
const applications = require('./api/applications/routes');
const ApplicationsHandler = require('./api/applications/handler');
const ApplicationsService = require('./services/database/ApplicationsService');

// Import Bookmarks
const bookmarks = require('./api/bookmarks/routes');
const BookmarksHandler = require('./api/bookmarks/handler');
const BookmarksService = require('./services/database/BookmarksService');

// Import Error Middleware
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());

// Inisialisasi Service & Handler
const usersService = new UsersService();
const usersHandler = new UsersHandler(usersService, UsersValidator);
const authenticationsService = new AuthenticationsService();
const authenticationsHandler = new AuthenticationsHandler(
  authenticationsService,
  usersService,
  TokenManager,
  AuthenticationsValidator
);
const jobsService = new JobsService();
const jobsHandler = new JobsHandler(jobsService);

const companiesService = new CompaniesService();
const companiesHandler = new CompaniesHandler(companiesService);

const documentsService = new DocumentsService();
const documentsHandler = new DocumentsHandler(documentsService);

const categoriesService = new CategoriesService();
const categoriesHandler = new CategoriesHandler(categoriesService);

const applicationsService = new ApplicationsService();
const applicationsHandler = new ApplicationsHandler(applicationsService);

const bookmarksService = new BookmarksService();
const bookmarksHandler = new BookmarksHandler(bookmarksService);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Gunakan Routes
app.use('/users', users(usersHandler));
app.use('/authentications', authentications(authenticationsHandler));
app.use('/jobs', jobs(jobsHandler));
app.use('/companies', companies(companiesHandler));
app.use('/documents', documents(documentsHandler));
app.use('/categories', categories(categoriesHandler));
app.use('/applications', applications(applicationsHandler));
app.use('/', bookmarks(bookmarksHandler));

// Protected Profile Endpoints (Kriteria Skilled)
app.get('/profile', authMiddleware, (req, res) => {
  res.json({
    status: 'success',
    data: {
      userId: req.user.id,
      message: 'Anda berhasil mengakses rute terproteksi!',
    },
  });
});

app.get('/profile/applications', authMiddleware, async (req, res, next) => {
  try {
    const applications = await applicationsService.getApplicationsByUserId(req.user.id);
    res.json({
      status: 'success',
      data: { applications },
    });
  } catch (error) { next(error); }
});

app.get('/profile/bookmarks', authMiddleware, async (req, res, next) => {
  try {
    const bookmarks = await bookmarksService.getBookmarksByUserId(req.user.id);
    res.json({
      status: 'success',
      data: { bookmarks },
    });
  } catch (error) { next(error); }
});

// Error Middleware (Harus di paling bawah)
app.use(errorMiddleware);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server jalan di port ${port}`);
});