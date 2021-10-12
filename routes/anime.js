const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const animeController = require("../controllers/animeController");



const auth = require("../middlewares/auth");

router.get("/", auth, catchErrors(animeController.getAllAnime)); // can be seen by any user
router.post("/", auth, catchErrors(animeController.createAnime)); // only admin can add new anime
router.get("/:name", auth, catchErrors(animeController.getAnime)); //get anime by title by any user
router.put("/:name", auth, catchErrors(animeController.updateAnime)); // update by admin
router.delete("/:name", auth, catchErrors(animeController.deleteAnime)) // delete by admin
router.get("/filter/:id", auth, catchErrors(animeController.getByFilter)); // can be seen by any user, filter by title or genre



router.post("/rating/:id",auth,catchErrors(animeController.addRating));//add comment and rate by user,list id by params
router.delete("/rating/:id",auth,catchErrors(animeController.deleteRating))// params = rat id


module.exports = router;
