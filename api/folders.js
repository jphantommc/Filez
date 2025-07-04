import express from "express";
const router = express.Router();
export default router;

import { createFile } from "../db/queries/files"; 
import { getFoldersByIdIncludingFlies, getFolders } from "../db/queries/folders";

router.route("/").get(async (req, res) => {
    const folders = await getFolders();
    res.send(folders);
});

router.param("id", async (req, res, next, id) => {
    const folder = await getFoldersByIdIncludingFlies(id);
    if (!folder) return res.status(404).send("Folder not found");
    req.folder = folder;
    next();
});

router.route("/:id").get((req, res) => {
    res.send(req.folder);
});

router.route("/:id/files").post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required");
    const { name,size } = req.body;
    if (!name || !size) return res.status(400).send("File name is required");

    const file = await createFile(name, req.folder.id);
    res.status(201).send(file);
});


import { getFilesIncludingFolderName } from "../db/queries/files";

router.route("/").get(async (req, res) => {
    const files = await getFilesIncludingFolderName();
    res.send(files);
})