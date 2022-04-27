import Item from './itemsModel'

/* GET /api/item ==> Retrieves all item */
export const getAllItems = async (req, res) => {
    try{
        // Query 
        const allItems = await Item.find();

        //Response
        res.status(200).json({ 
            item: allItems,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* GET /api/item/:id ==> Retrieves specified item */
export const getOneItem = async (req, res) => {
    try{
        // Query 
        const item = await Item.findOne({ _id: req.params.id });

        //Response
        res.status(200).json({ 
            item: item,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* POST /api/item ==> Creates a new item */
export const createItem = async (req, res) => {
    try{
        // Object construction
        const item = new Item({
            ...req.body
        });

        // Object saving promise
        const newItem = await item.save();

        res.status(201).json({ 
            message: "Item created ! ",
            object: newItem,
            statusCode: 201
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* PUT /api/item/:id ==> Modifies an existing item */
export const updateOneItem = async (req, res) => {
    try{
        // Object updating promise
        const modifiedItem = await Item.updateOne(
            { _id: req.params.id }, 
            { ...req.body, _id: req.params.id }
        );

        res.status(200).json({ 
            message: "Item modified ! ",
            object: modifiedItem,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}

/* DELETE /api/item/:id ==> Deletes an existing item */
export const deleteOneItem = async (req, res) => {
    try{
        // Object delete promise
        const deletedItem = await Item.deleteOne(
            { _id: req.params.id },
        );

        res.status(200).json({ 
            message: "Item deleted !",
            object: deletedItem,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}