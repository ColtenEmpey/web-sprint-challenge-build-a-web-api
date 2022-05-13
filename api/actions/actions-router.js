const express = require("express")
const router = express.Router()

const Actions = require("./actions-model")

const {validateActionId} = require("./actions-middlware")



router.get("/", (req,res, next)=>{
    Actions.get()
        .then(projects =>{
            res.json(projects)
          })
          .catch(err =>{
            next(err)
          })
})

router.get("/:id", validateActionId, (req,res, next)=>{
    Actions.get(req.params.id)
        .then(project =>{
            res.json(project)
        })
        .catch(err =>{
        next(err)
        })
})

router.post("/", (req,res, next)=>{
    console.log(req.body)
    const {notes, description, project_id} = req.body
    if(!notes || !description || !project_id){
        res.status(400).json({
            message: "please provide title and contents for the post"
        })
    }
    else{
        Actions.insert(req.body)
            .then(project =>{
                res.json(project)
            })
            .catch(err =>{
            next(err)
            })
    }
})
router.put("/:id", validateActionId, (req,res, next)=>{
    const {notes, description, completed, project_id} = req.body
    if(!notes || !description || !completed || !project_id){
        res.status(400).json({
            message: "please provide name, description, and completed for the post"
        })
    }
    else{
        Actions.update(req.params.id, req.body)
            .then(project =>{
                res.json(project)
            })
            .catch(err =>{
            next(err)
            })
    }
})
router.delete("/:id", validateActionId, (req,res)=>{
    Actions.remove(req.params.id)
        .then(project =>{
            res.json(project)
        })
        .catch(err =>{
        next(err)
        })
})
router.get("/:id/actions", validateActionId, (req,res)=>{
    Actions.getProjectActions(req.params.id)
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