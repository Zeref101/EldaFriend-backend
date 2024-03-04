import Community from "../database/community.model";
import User from "../database/user.model";
import { connectToDatabase } from "../lib/mongoose";
import { CreateCommunityProp, GetPropsForCommunity } from "../types";

export async function createCommunity({
  adminUserid,
  name,
  description,
  picture,
  banner,
}: GetPropsForCommunity): Promise<CreateCommunityProp> {
  try {
    connectToDatabase();

    const newCommunity = await Community.create({
      admin: adminUserid,
      name: name,
      description: description,
      picture: picture,
      ...(banner ? { banner: banner } : {}),
    });

    const user = await User.findById(adminUserid);
    if (!user) {
      return {
        error: true,
        status: 404,
        message: "User not found",
      };
    }
    user.communities.push({
      communityId: newCommunity._id,
      isAdmin: true,
    });
    await user.save();

    return {
      error: false,
      status: 201,
      message: `Community created and Admin status is updated`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: `Internal Server Error`,
    };
  }
}
