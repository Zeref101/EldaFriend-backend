import { Router, Response, Request } from "express";
import { getSimilarUsers } from "../services/user.services";

const router = Router();

router.get(
  "/get-similar-users/:medicine_name",
  async (req: Request, res: Response) => {
    try {
      const name = req.params.medicine_name;

      if (!name) {
        return res.status(400).json({
          message: "Please enter medicine name",
        });
      }
      const users = await getSimilarUsers(name);

      if ("error" in users) {
        res.status(users.status).json({ message: users.message });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
