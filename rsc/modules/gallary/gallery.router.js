import express from "express";
import { galleryController } from "./gallery.controller.js";

const router = express.Router();

router.post("/create", galleryController.createGallery);
router.get("/", galleryController.getGallery);
router.get("/:id", galleryController.getSingleGallery);
router.patch("/:id", galleryController.updateGallery);
router.delete("/:id", galleryController.deleteSingleGallery);

export const galleryRoute = router;
