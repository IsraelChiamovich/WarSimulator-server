// src/models/launchModel.ts

import { model, Schema, Document, Model } from "mongoose";

export interface IAttack extends Document {
  name: string;
  timeToHit: number;
  regionAttacked: string;
  id_attacker: string;
  id_intercepted?: string;
}

const AttackSchema = new Schema<IAttack>({
  name: { type: String, required: true },
  timeToHit: { type: Number, required: true },
  regionAttacked: { type: String, required: true },
  id_attacker: { type: String, required: true },
  id_intercepted: { type: String },
});

const Attack : Model<IAttack> = model<IAttack>("Attack", AttackSchema);
export default Attack;
