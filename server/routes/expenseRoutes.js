import { Router } from "express";

const router = Router();

import {
  postData,
  getData,
  deleteData,
  updateData,
} from "../controllers/expenseController";

router.post("/", postData);

router.get("/", getData);

router.delete("/:id", deleteData);

router.put("/:id", updateData);

export default router;
