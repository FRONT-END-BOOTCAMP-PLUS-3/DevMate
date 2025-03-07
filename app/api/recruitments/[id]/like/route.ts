import { PsLikeRepository } from "@/infrastructure/repositories/PsLikeRepository";

import type { NextApiRequest, NextApiResponse } from "next";

import { ToggleLikeUsecase } from "@/application/usecases/ToggleLikeUsecase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, projectId } = req.body;
  if (!userId || !projectId) {
    return res.status(400).json({ message: "userId and projectId are required" });
  }

  const likeRepository = new PsLikeRepository();
  const toggleLikeUsecase = new ToggleLikeUsecase(likeRepository);

  const result = await toggleLikeUsecase.execute(userId, Number(projectId));

  return res.status(200).json(result);
}
