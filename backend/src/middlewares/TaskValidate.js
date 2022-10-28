const TaskModel = require ('../model/taskModel');
const { isPast } = require('date-fns');

const TaskValidate = async (req, res, next) => {

    const {macaddress, type, title, description, when} = req.body;

    if (!macaddress)
        return res.status(400).json({ error: 'macaddress require'});
    else if (!type)
        return res.status(400).json({ error: 'type require'});
    else if (!title)
        return res.status(400).json({ error: 'title require'});
    else if (!description)
        return res.status(400).json({ error: 'description require'});
    else if (!when)
        return res.status(400).json({ error: 'when require'});
    else if (isPast(new Date(when)) )
        return res.status(400).json({ error: 'when isPast'});
    else {
        let exists;

        if(req.params.id){
            exists = await TaskModel.findOne({ 
                '_id': {'$ne': req.params.id},
                'when': {'$eq': new Date(when)},
                'macaddress': {'$in': macaddress}
            })
        } else {
            exists = await TaskModel.findOne({ 
                'when': {'$eq': new Date(when)},
                'macaddress': {'$in': macaddress}
            })
        }

        if (exists)
            return res.status(400).json({ error: 'when already exists'});

        next();
    }
}

module.exports = TaskValidate;