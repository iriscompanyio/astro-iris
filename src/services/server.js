import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const urlMongo = process.env.MONGO_ACCESS;

const uri = urlMongo;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db("iris");
    const projectsCollection = db.collection("irisprojects");

    app.get("/api/projects", async (req, res) => {
      const projects = await projectsCollection.find({}).toArray();
      res.json(projects);
    });

    app.post("/api/projects", async (req, res) => {
      const newProjects = req.body;
      const result = await projectsCollection.insertOne(newProjects);
      res.json(result);
    });

    app.put("/api/projects/:id", async (req, res) => {
      const projectId = req.params.id;
      const updatedProjectData = req.body;

      try {
        const result = await projectsCollection.updateOne(
          { _id: ObjectId.createFromHexString(projectId) },
          { $set: updatedProjectData }
        );
        res.json({ message: "Project updated successfully" });
      } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Failed to update project" });
      }
    });

    app.delete("/api/projects/:id", async (req, res) => {
      const projectId = req.params.id;

      try {
        const result = await projectsCollection.deleteOne({ _id: projectId });
        res.json({ message: "Project deleted successfully" });
      } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Failed to delete project" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
