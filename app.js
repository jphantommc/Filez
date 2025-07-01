import express from "express";
const app = express();
export default app;

import folderRouter from "./api/folders";
import filesRouter from "./api/files";

app.use(express.json());
app.use("/files", filesRouter);
app.use("/folders", folderRouter);

app.use((err, req, res, next) => {
    if (err.code === "23585") {
        return res.status(400).send("err.detail");
    }

    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});