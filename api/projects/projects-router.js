const express = require("express")
const router = express.Router()

const Projects = require("./projects-model")

const {validateProjectId} = require("./projects-middleware")



router.get("/", (req,res, next)=>{
    Projects.get()
        .then(projects =>{
            res.json(projects)
          })
          .catch(err =>{
            next(err)
          })
})

router.get("/:id", validateProjectId, (req,res)=>{
    Projects.get(req.params.id)
        .then(project =>{
            res.json(project)
        })
        .catch(err =>{
        next(err)
        })
})

router.post("/", (req,res)=>{
    console.log(req.body)
    const {name, description} = req.body
    if(!name || !description){
        res.status(400).json({
            message: "please provide title and contents for the post"
        })
    }
    else{
        Projects.insert(req.body)
            .then(project =>{
                res.json(project)
            })
            .catch(err =>{
            next(err)
            })
    }
})
router.put("/:id", validateProjectId, (req, res, next)=>{
    console.log(req)
    const {name, description, completed} = req.body
    const completedBool = typeof completed
    if(!name || !description || completedBool != "boolean"){   //TODO NOT recieveing WHAT IT WANTS
        res.status(400).json({
            message: "please provide name, description, and completed for the post"
        })
    }
    else{
        Projects.update(req.params.id, req.body)
            .then(project =>{
                res.json(project)
            })
            .catch(err =>{
            next(err)
            })
    }
})
router.delete("/:id", validateProjectId, (req,res)=>{
    Projects.remove(req.params.id)
        .then(project =>{
            res.json(project)
        })
        .catch(err =>{
        next(err)
        })
})
router.get("/:id/actions", validateProjectId, (req,res)=>{
    Projects.getProjectActions(req.params.id)
        .then(project =>{
            res.json(project)
          })
          .catch(err =>{
            next(err)
          })
})



router.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
      message: err.message
    })
  })

module.exports= router
