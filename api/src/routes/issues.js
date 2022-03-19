const Sequelize = require('sequelize');
const { models } = require('../model');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const issues = await models.issue.findAll();
	res.status(200).json(issues);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const issue = await models.issue.findByPk(id, { include: { all: true }});
	if (issue) {
		res.status(200).json(issue);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		try {
			const persistedObj = await models.issue.create(req.body);
			await models.issue.update({ issueNumber: 'ISSUE-'+persistedObj.id }, {
				where: {
					id: persistedObj.id
				}
			});
			const issue = await models.issue.findByPk(persistedObj.id, { include: { all: true }});
			res.status(201).json(issue.dataValues);            
        } catch(e) {
            if (e instanceof Sequelize.ValidationError) {
				return res.status(422).send(e.errors);
			} else {
				return res.status(400).send({
					message: e.message
				});
			}
        };
	}
};
async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.issue.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.issue.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
