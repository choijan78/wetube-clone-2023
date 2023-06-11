//백엔드가 템플릿을 렌더링 하지 않을 때 프론트와 백엔드가 통신하는 방법
import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/:id([0-9a-f]{24})/delete",
  deleteComment
);

export default apiRouter;
