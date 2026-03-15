class CompaniesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postCompanyHandler = this.postCompanyHandler.bind(this);
        this.getCompaniesHandler = this.getCompaniesHandler.bind(this);
        this.getCompanyByIdHandler = this.getCompanyByIdHandler.bind(this);
        this.putCompanyByIdHandler = this.putCompanyByIdHandler.bind(this);
        this.deleteCompanyByIdHandler = this.deleteCompanyByIdHandler.bind(this);
    }

    async postCompanyHandler(req, res, next) {
        try {
            this._validator.validateCompanyPayload(req.body);
            const ownerId = req.user.id;
            const companyId = await this._service.addCompany({ ...req.body, owner_id: ownerId });
            res.status(201).json({ status: 'success', data: { id: companyId } });
        } catch (error) { next(error); }
    }

    async getCompaniesHandler(req, res, next) {
        try {
            const companies = await this._service.getCompanies();
            res.status(200).json({ status: 'success', data: { companies } });
        } catch (error) { next(error); }
    }

    async getCompanyByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            const company = await this._service.getCompanyById(id);
            res.status(200).json({ status: 'success', data: company });
        } catch (error) { next(error); }
    }

    async putCompanyByIdHandler(req, res, next) {
        try {
            this._validator.validateCompanyUpdatePayload(req.body);
            const { id } = req.params;
            await this._service.editCompanyById(id, req.body);
            res.status(200).json({ status: 'success', message: 'Company diperbarui' });
        } catch (error) { next(error); }
    }

    async deleteCompanyByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            await this._service.deleteCompanyById(id);
            res.status(200).json({ status: 'success', message: 'Company dihapus' });
        } catch (error) { next(error); }
    }
}

module.exports = CompaniesHandler;