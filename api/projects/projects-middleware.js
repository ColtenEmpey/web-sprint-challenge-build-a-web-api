// add middlewares here related to projects
const Project = require("./projects-model")

async function validateProjectId(req, res, next) {
    try{
      const projectId = await Project.get(req.params.id)
      if(!projectId){
        res.status(404).json({
          message: "no such id"
        })
      }else{
        req.projectId= projectId
        next()
      }
    }
    catch (err){
      res.status(500).json({
        message: "problem finding project"
      })
    }
  }


  module.exports = {
      validateProjectId,

  }