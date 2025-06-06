import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { Credential } from "../models/credential.js";

const CredentialSchema = new Schema<Credential>(
  {
    username: { type: String, required: true, trim: true },
    hashedPassword: { type: String, required: true }
  },
  { collection: "user_credentials" }
);

const CredentialModel = mongoose.model<Credential>("Credential", CredentialSchema);

async function create(username: string, password: string): Promise<Credential> {
  const existing = await CredentialModel.findOne({ username }).exec();
  if (existing) {
    throw new Error(`Username exists: ${username}`);
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newCredential = new CredentialModel({ username, hashedPassword });
  return newCredential.save();
}

async function verify(username: string, password: string): Promise<string> {
  const found = await CredentialModel.findOne({ username }).exec();
  if (!found) {
    throw new Error("Invalid username or password");
  }

  const match = await bcrypt.compare(password, found.hashedPassword);
  if (match) {
    return found.username;
  }
  
  throw new Error("Invalid username or password");
}

export default { create, verify };
