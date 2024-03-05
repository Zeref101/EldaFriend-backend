import { Router, Request, Response } from "express";
import { createCommunitySchema } from "../validations/community.validation";
import { createCommunity } from "../services/community.services";
import Community from "../database/community.model";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const result = createCommunitySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues.map((issue) => issue.message).join(","),
      });
    }
    const { adminUserId, name, description, picture, banner } = result.data;

    const newCommunity = await createCommunity({
      adminUserid: adminUserId,
      name,
      description,
      picture,
      banner,
    });

    if (!newCommunity) {
      return res.status(400).json({
        message: "Failed to create community. Please check your input data.",
      });
    }

    return res.status(201).json({
      message: "Community created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error while creating community",
    });
  }
});

router.get("/get-community", async (req: Request, res: Response) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error while fetching communities",
    });
  }
});

module.exports = router;
