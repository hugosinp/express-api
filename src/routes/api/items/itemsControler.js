import Item from './itemsModel'


/* GET /api/item ==> Retrieves all item */
export const getAllItems = async (req, res) => {
    try{
        // Query 
        const allItems = await Item.find({}, ['_id', 'title', 'description', 'price']);

        //Response
        res.status(200).json({ 
            itemList: allItems,
            statusCode: 200
        });

    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}


/* GET /api/item/:slug ==> Retrieves specified item */
export const getOneItem = async (req, res) => {
    try{
        // Query 
        const item = await Item.findOne({ slug: req.params.slug });

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

        const newSlug = req.body.title.replace(/\s+/g, '-').toLowerCase();

        // Query
        const newItem = await Item.create({
            ...req.body,
            slug: newSlug
        });

        res.status(201).json({ 
            message: "Item created ! ",
            object: newItem,
            statusCode: 201
        });

    } catch(error) {
        res.status(400).json({ message : error.message });
    }

}


/* PUT /api/item/:_id ==> Modifies an existing item */
export const updateOneItem = async (req, res) => {
    
    try{
        // Query
        const modifiedItem = await Item.updateOne(
            { _id: req.params._id },
            { 
                ...req.body, 
            },
            { runValidators: true, context: 'query' },
        );

        if (modifiedItem.matchedCount != 0) {
            if (modifiedItem.modifiedCount != 0) {
                res.status(200).json({ 
                    message: "Item modified !",
                    object: modifiedItem,
                    statusCode: 200
                });
            } else {
                res.status(200).json({ 
                    message: "No changes to apply",
                    object: modifiedItem,
                    statusCode: 200
                });
            }
            
        } else {
            res.status(404).json({ 
                message: "Item not found",
                object: modifiedItem,
                statusCode: 404
            });
        }

    } catch(error) {
        res.status(400).json({ message : error.message });
    }
}


/* DELETE /api/item/:_id ==> Deletes an existing item */
export const deleteOneItem = async (req, res) => {
    try{
        // Query
        const deletedItem = await Item.deleteOne(
            { _id: req.params._id },
        );

        res.status(200).json({ 
            message: "Item deleted !",
            object: deletedItem,
            statusCode: 200
        });

    } catch(error) {
        res.status(404).json({ message : error.message });
        console.error(error);
    }

}