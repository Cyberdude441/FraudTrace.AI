import mongoose from 'mongoose';
import { store } from '../services/store.js';
import Case from '../models/Case.js';
import Evidence from '../models/Evidence.js';
import Entity from '../models/Entity.js';
import Relationship from '../models/Relationship.js';
import TimelineEvent from '../models/TimelineEvent.js';
import Inconsistency from '../models/Inconsistency.js';
import AuditLog from '../models/AuditLog.js';
import {
  SEED_CASE,
  SEED_EVIDENCE,
  SEED_ENTITIES,
  SEED_TIMELINE_EVENTS,
  SEED_RELATIONSHIPS,
  SEED_INCONSISTENCIES,
  SEED_AUDIT_LOGS
} from '../services/mockDataSeed.js';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fraudtrace';
  
  try {
    mongoose.set('strictQuery', false);
    // Timeout quickly (1500ms) if local mongod is not running, so server boot is instantaneous!
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500
    });
    console.log(`[Database] Successfully connected to MongoDB at ${uri}`);
    store.setMongooseActive(true);

    // Seed database if empty
    const caseCount = await Case.countDocuments();
    if (caseCount === 0) {
      console.log('[Database] Seeding initial synthetic investigation case data into MongoDB...');
      await Case.create(SEED_CASE);
      await Evidence.insertMany(SEED_EVIDENCE);
      await Entity.insertMany(SEED_ENTITIES);
      await Relationship.insertMany(SEED_RELATIONSHIPS);
      await TimelineEvent.insertMany(SEED_TIMELINE_EVENTS);
      await Inconsistency.insertMany(SEED_INCONSISTENCIES);
      await AuditLog.insertMany(SEED_AUDIT_LOGS);
      console.log('[Database] Seeding completed.');
    }
  } catch (err) {
    console.warn(`[Database] MongoDB not reachable (${err.message}). Defaulting to High-Performance Memory/Mock Store.`);
    store.setMongooseActive(false);
  }
}
