import Stuff from './stuffModel'

/* GET /api/stuff ==> Retrieves all stuff */
export const getAllStuff = async (req, res) => {

    try{
        // Query 
        const allStuff = await Stuff.find();

        //Response
        res.status(200).json({ 
            stuff: allStuff,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* GET /api/stuff/:id ==> Retrieves specified stuff */
export const getOneStuff = async (req, res) => {

    try{
        // Query 
        const stuff = await Stuff.findOne({ _id: req.params.id });

        //Response
        res.status(200).json({ 
            stuff: stuff,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* POST /api/stuff ==> Adds a new stuff */
export const createStuff = async (req, res) => {

    try{
        // Object construction
        const stuff = new Stuff({
            ...req.body
        });

        // Object saving promise
        const newStuff = await stuff.save();

        res.status(201).json({ 
            message: "Stuff created ! ",
            object: newStuff,
            statusCode: 201
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* PUT /api/stuff/:id ==> Modifies an existing stuff */
export const updateOneStuff = async (req, res) => {

    try{
        // Object updating promise
        const modifiedStuff = await Stuff.updateOne(
            { _id: req.params.id }, 
            { ...req.body, _id: req.params.id }
        );

        res.status(200).json({ 
            message: "Stuff modified ! ",
            object: modifiedStuff,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* DELETE /api/stuff/:id ==> Deletes an existing stuff */
export const deleteOneStuff = async (req, res) => {

    try{
        // Object delete promise
        const deletedStuff = await Stuff.deleteOne(
            { _id: req.params.id },
        );

        res.status(200).json({ 
            message: "Stuff deleted !",
            object: deletedStuff,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}