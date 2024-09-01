import { db } from "@/models/name";
import createAnswerCollection from "@/models/server/answer.collection";
import createCommentCollection from "@/models/server/comment.collection";
import createQuestionCollection from "@/models/server/question.collection";
import createVoteCollection from "@/models/server/vote.collection";

import { databases } from "@/models/server/config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database Connected");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database Create");
      // Create Collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collection create");
      console.log("Database Connect");
    } catch (error) {
      console.error("Error creating database or collection: ", error);
    }
  }
  return databases;
}
