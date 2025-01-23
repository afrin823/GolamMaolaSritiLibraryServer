import express from "express";
import { bookController } from "./book.controller.js";

const router = express.Router();

router.post("/create", bookController.createBook);
router.get("/:id", bookController.getSingleBook);
router.delete("/:id", bookController.deleteSingleBook);

export const bookRoute = router;
