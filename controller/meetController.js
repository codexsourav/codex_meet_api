import meetDb from '../model/meetMoadels.js'


export const getMeet = async (req, res) => {
    try {
        const meetId = req.params.id;
        var meet = await meetDb.findOne({ meetId });
        return res.json(meet);
    } catch (error) {
        return res.json({ "error": "Error To Fetch Meet", "message": error.toString() });
    }
}

export const createMeet = async (req, res) => {
    try {
        const meetId = req.params.id;
        const user = req.authUser;
        var newMeet = meetDb({ "meetId": meetId, "creatorId": user['_id'], "creatorEmail": user['email'] });
        var meet = await newMeet.save();
        return res.send({ "create": true, "meetId": meetId, "data": meet });
    } catch (error) {
        return res.send({ "error": "Error To Create New Meet", "create": false, "message": error.toString() });
    }
}


export const deleteMeet = async (req, res) => {
    try {
        const meetId = req.params.id;
        var deleteTask = await meetDb.deleteOne({ meetId });
        return res.send({ "delete": true, "data": deleteTask });
    } catch (error) {
        return res.send({ "error": "Error To Delete Meet", "delete": false, "message": error.toString() });
    }
}