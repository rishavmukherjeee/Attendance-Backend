const Department = require('../models/department.model');


exports.createDepartment = async (req, res) => {
    try {
        const id = req?.body?.id?.toUpperCase();
        const name = req?.body?.name?.toUpperCase();

        if(!name || !id){
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required.', 
            });
        }
        
        const department = await Department.findOne({id});

        if(department){
            return res.status(400).json({ 
                success: false,
                message: 'Department already exist', 
            });
        }

        await Department.create({id, name});
        
        return res.status(200).json({ 
            success: true,
            message: 'Department created successfully', 
            department,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' 
        });

    }
};

exports.editDepartment = async (req, res) => {
    // Access the body of the API request
    const { id, semester, section } = req.body;

    try {
        // Update the existing global data document in the database
        const updatedGlobalData = await Department.findOneAndUpdate(
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

exports.getAllDepartment = async (req, res) => {
    try {
        // Fetch all global data documents from the database
        const departments = await Department.find({});

        // Send a response with the fetched global data documents
        return res.status(200).json({ 
            success: true,
            message: 'Departments data fetched successfully', 
            departments,
        });
    } catch (error) {
        // Handle errors, e.g., send a 500 Internal Server Error response
        console.error('Error fetching global data:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' 
        });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const { id } = req?.params;

        if(!id){
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const department = await Department.findOne({id});

        if(!department){
            return res.status(400).json({
                success: false,
                message: 'Department not exist.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Department details fetch successfully',
            department,
        });        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

exports.deleteDepartmentById = async (req, res) => {
    try {
        const { id } = req?.params;
    
        if(!id){
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }
    
        const department = await Department.findById(id);
    
        if(!department){
            return res.status(400).json({
                success: false,
                message: 'Department not exist.'
            });
        }

        await Department.findByIdAndDelete(id);
    
        return res.status(200).json({
            success: true,
            message: 'Department details deleted successfully',
            department,
        });        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }    
}

exports.updateDepartmentById = async (req, res) => {
    try {
        const { departmentId } = req?.params;
        const { semester, section } = req?.body;

        if(!departmentId || !semester || !section){
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }
    
        const department = await Department.findOne({id: departmentId});
        
        if(!department){
            return res.status(400).json({
                success: false,
                message: 'Department not exist.'
            });
        }
    
        department.semester = semester;
        department.section = section;

        await department.save();
    
        return res.status(200).json({
            success: true,
            message: 'Department details deleted successfully',
            department,
        });        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }   
}
