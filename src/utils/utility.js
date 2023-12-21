const mongoose = require('mongoose');

const globalDataSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    semester: {
        type: [Number],
        required: true,
    },
    section: {
        type: [Number],
        required: true,
    },
});

// Create the GlobalData model
const GlobalDataModel = mongoose.model('GlobalData', globalDataSchema);

const allStream = async (req, res) => {
    // Access the body of the API request
    const { id, semester, section } = req.body;

    // Create a new global data document using the id, semester, and section data
    const newGlobalData = {
        id,
        semester,
        section,
    };

    try {
        // Save the new global data document to the database
        const createdGlobalData = await GlobalDataModel.create(newGlobalData);

        // Send a response indicating the global data document was created
        res.status(200).json({ message: 'Global data created successfully', globalData: createdGlobalData });
    } catch (error) {
        // Handle errors, e.g., send a 500 Internal Server Error response
        console.error('Error creating global data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to edit and change the sections
const editStream = async (req, res) => {
    // Access the body of the API request
    const { id, semester, section } = req.body;

    try {
        // Update the existing global data document in the database
        const updatedGlobalData = await GlobalDataModel.findOneAndUpdate(
            { id },
            { semester, section },
            { new: true, upsert: true } // Create a new document if it doesn't exist
        );

        // Send a response indicating the global data document was edited successfully
        res.status(200).json({ message: 'Global data edited successfully', globalData: updatedGlobalData });
    } catch (error) {
        // Handle errors, e.g., send a 500 Internal Server Error response
        console.error('Error editing global data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchAllStreams = async (req, res) => {
    try {
        // Fetch all global data documents from the database
        const allGlobalData = await GlobalDataModel.find({});

        // Send a response with the fetched global data documents
        res.status(200).json({ message: 'Global data fetched successfully', globalData: allGlobalData });
    } catch (error) {
        // Handle errors, e.g., send a 500 Internal Server Error response
        console.error('Error fetching global data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add the new functions to the exports
module.exports = {
    allStream,
    editStream,
    fetchAllStreams,
};
