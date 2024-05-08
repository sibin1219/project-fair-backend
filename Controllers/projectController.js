const projects = require('../Models/projectSchema')
//add project logic
exports.addProject = async (req, res) => {
    console.log("inside the addProject method");
    const { title, language, github, livelink, overview } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title, language, github, livelink, overview, projectImage);
    console.log(userId);

    try {
        //check if email and password in db
        const existingProject = await projects.findOne({ github })

        if (existingProject) {

            res.status(404).json("project already existed")
        } else {
            const newProject = new projects({ title, language, github, livelink, overview, projectImage, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (err) {
        res.status(401).json({ error: err.message });
    }


}

//1 Get a particular user projects details
exports.getAProject = async (req, res) => {
    console.log("inside getaproject");

    const userId = req.payload

    try {
        const AProject = await projects.find({ userId })
        if (AProject) {
            res.status(200).json(AProject)
        } else {
            res.status(401).json("Can't find project");
        }


    } catch (err) {
        res.status(401).json({ error: err.message });
    }

}




//2 Get first  3 projects details
exports.getHomeProjects = async (req, res) => {
    try {
        const HomeProject = await projects.find().limit(3)
        if (HomeProject) {
            res.status(200).json(HomeProject)
        } else {
            res.status(401).json("Can't find project");
        }


    } catch (err) {
        res.status(404).json({ error: err.message });
    }

}



//Get all project details
exports.allProjects = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey);
    //case sensitive & searching projects
    let query = {}
    if(searchKey){
        query.title =  { $regex: searchKey, $options: "i" }
    }
        
    


    try {
        const allProject = await projects.find(query)
        if (allProject) {
            res.status(200).json(allProject)
        } else {
            res.status(401).json("Can't find project");
        }


    } catch (err) {
        res.status(401).json({ error: err.message });
    }

}


//4 delete user project
exports.deleteUserProject = async (req, res) => {
    const { pid } = req.params //get project id 
    try {
        const deleteUserProject = await projects.findOneAndDelete({ _id: pid })
        //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion
        res.status(200).json(deleteUserProject)


    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}

//5 update user project
exports.updateUserProject = async (req,res) => {
    const {title, language, github,livelink,overview,projectImage} = req.body
    userId = req.payload
    const {pid} = req.params
    const uploadImage = req.file?req.file.filename:projectImage
try{
    //find particular project , upate the data and save the changes
    const updateProject =await projects.findByIdAndUpdate({_id:pid},{title, language, github,livelink,overview,projectImage:uploadImage,userId})
    await updateProject.save()
    res.status(200).json(updateProject)
}catch(err){
    res.status(401).json({message:err.message})
}


}
