class ApplicationsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postApplicationHandler = this.postApplicationHandler.bind(this);
        this.getApplicationsHandler = this.getApplicationsHandler.bind(this);
        this.getApplicationByIdHandler = this.getApplicationByIdHandler.bind(this);
        this.getApplicationsByUserIdHandler = this.getApplicationsByUserIdHandler.bind(this);
        this.getApplicationsByJobIdHandler = this.getApplicationsByJobIdHandler.bind(this);
        this.putApplicationStatusHandler = this.putApplicationStatusHandler.bind(this);
        this.deleteApplicationByIdHandler = this.deleteApplicationByIdHandler.bind(this);
    }

    async postApplicationHandler(req, res, next) {
        try {
            this._validator.validateApplicationPayload(req.body);
            const userId = req.user.id;
            const applicationId = await this._service.addApplication(userId, req.body);
            res.status(201).json({ status: 'success', data: { id: applicationId } });
        } catch (error) { next(error); }
    }

    async getApplicationsHandler(req, res, next) {
        try {
            const applications = await this._service.getApplications();
            res.status(200).json({ status: 'success', data: { applications } });
        } catch (error) { next(error); }
    }

    async getApplicationByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            const application = await this._service.getApplicationById(id);
            res.status(200).json({ status: 'success', data: application });
        } catch (error) { next(error); }
    }

    async getApplicationsByUserIdHandler(req, res, next) {
        try {
            const { userId } = req.params;
            const applications = await this._service.getApplicationsByUserId(userId);
            res.status(200).json({ status: 'success', data: { applications } });
        } catch (error) { next(error); }
    }

    async getApplicationsByJobIdHandler(req, res, next) {
        try {
            const { jobId } = req.params;
            const applications = await this._service.getApplicationsByJobId(jobId);
            res.status(200).json({ status: 'success', data: { applications } });
        } catch (error) { next(error); }
    }

    async putApplicationStatusHandler(req, res, next) {
        try {
            this._validator.validateApplicationUpdatePayload(req.body);
            const { id } = req.params;
            await this._service.editApplicationStatus(id, req.body);
            res.status(200).json({ status: 'success', message: 'Status application diperbarui' });
        } catch (error) { next(error); }
    }

    async deleteApplicationByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            await this._service.deleteApplicationById(id);
            res.status(200).json({ status: 'success', message: 'Application dihapus' });
        } catch (error) { next(error); }
    }
}

module.exports = ApplicationsHandler;