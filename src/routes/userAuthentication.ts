import { Request, Response, Router } from "express";
import { createUser, verifyOtp } from "../services/authentication.services";

import parsePhoneNumberFromString from "libphonenumber-js";
import { userSchema } from "../validations/user.validation";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from /api/auth" });
});

router.post("/sign-up/getOtp", async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, password } = req.body;
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues.map((issue) => issue.message).join(","),
      });
    }
    const phoneNumber = parsePhoneNumberFromString(phone);

    if (!phoneNumber?.isValid()) {
      return res.status(400).json({
        message: "Phone number is not valid.",
      });
    }

    const newUser = await createUser({ fullname, email, phone, password });
    if ("error" in newUser) {
      console.log("There was an error:", newUser.message);
      res.status(newUser.status).send(newUser.message);
    } else {
      res.status(200).send(newUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/sign-up/verify-otp", async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;

    const result = await verifyOtp({ userId, otp });
    if ("error" in result) {
      console.log("There was an error:", result.message);
      res.status(result.status).send(result.message);
    } else {
      res.status(200).json({ message: `User verified!` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
