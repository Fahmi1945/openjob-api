class JobsHandler {
    constructor(service) {
        this._service = service;

        this.postJobHandler = this.postJobHandler.bind(this);
        this.getJobsHandler = this.getJobsHandler.bind(this);
        this.getJobByIdHandler = this.getJobByIdHandler.bind(this);
        this.getJobsByCompanyHandler = this.getJobsByCompanyHandler.bind(this);
        this.getJobsByCategoryHandler = this.getJobsByCategoryHandler.bind(this);
        this.putJobByIdHandler = this.putJobByIdHandler.bind(this);
        this.deleteJobByIdHandler = this.deleteJobByIdHandler.bind(this);
    }

    async postJobHandler(req, res, next) {
        try {
            const jobId = await this._service.addJob(req.body);
            res.status(201).json({ status: 'success', data: { jobId } });
        } catch (error) { next(error); }
    }

    async getJobsHandler(req, res, next) {
        try {
            const { title, 'company-name': companyName } = req.query;
            const jobs = await this._service.getJobs(title, companyName);
            res.status(200).json({ status: 'success', data: { jobs } });
        } catch (error) { next(error); }
    }

    async getJobByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            const job = await this._service.getJobById(id);
            res.status(200).json({ status: 'success', data: { job } });
        } catch (error) { next(error); }
    }

    async getJobsByCompanyHandler(req, res, next) {
        try {
            const { companyId } = req.params;
            const jobs = await this._service.getJobsByCompanyId(companyId);
            res.status(200).json({ status: 'success', data: { jobs } });
        } catch (error) { next(error); }
    }

    async getJobsByCategoryHandler(req, res, next) {
        try {
            const { categoryId } = req.params;
            const jobs = await this._service.getJobsByCategoryId(categoryId);
            res.status(200).json({ status: 'success', data: { jobs } });
        } catch (error) { next(error); }
    }

    async putJobByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            await this._service.editJobById(id, req.body);
            res.status(200).json({ status: 'success', message: 'Job diperbarui' });
        } catch (error) { next(error); }
    }

    async deleteJobByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            await this._service.deleteJobById(id);
            res.status(200).json({ status: 'success', message: 'Job dihapus' });
        } catch (error) { next(error); }
    }
}

module.exports = JobsHandler;