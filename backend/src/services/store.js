import mongoose from 'mongoose';
import Case from '../models/Case.js';
import Evidence from '../models/Evidence.js';
import Entity from '../models/Entity.js';
import Relationship from '../models/Relationship.js';
import TimelineEvent from '../models/TimelineEvent.js';
import Inconsistency from '../models/Inconsistency.js';
import Report from '../models/Report.js';
import AuditLog from '../models/AuditLog.js';
import {
  SEED_CASE,
  SEED_EVIDENCE,
  SEED_ENTITIES,
  SEED_TIMELINE_EVENTS,
  SEED_RELATIONSHIPS,
  SEED_INCONSISTENCIES,
  SEED_AUDIT_LOGS
} from './mockDataSeed.js';

class DataStore {
  constructor() {
    this.useMongoose = false;
    // In-memory fallback / cache store
    this.memory = {
      cases: [ { ...SEED_CASE } ],
      evidence: JSON.parse(JSON.stringify(SEED_EVIDENCE)),
      entities: JSON.parse(JSON.stringify(SEED_ENTITIES)),
      timelineEvents: JSON.parse(JSON.stringify(SEED_TIMELINE_EVENTS)),
      relationships: JSON.parse(JSON.stringify(SEED_RELATIONSHIPS)),
      inconsistencies: JSON.parse(JSON.stringify(SEED_INCONSISTENCIES)),
      reports: [],
      auditLogs: JSON.parse(JSON.stringify(SEED_AUDIT_LOGS))
    };
  }

  setMongooseActive(active) {
    this.useMongoose = active;
  }

  isMongoAvailable() {
    return this.useMongoose && mongoose.connection.readyState === 1;
  }

  // --- CASES ---
  async getCases() {
    if (this.isMongoAvailable()) {
      return await Case.find().lean();
    }
    return this.memory.cases;
  }

  async getCaseById(caseId) {
    if (this.isMongoAvailable()) {
      return await Case.findOne({ caseId }).lean();
    }
    return this.memory.cases.find(c => c.caseId === caseId) || null;
  }

  async createCase(data) {
    if (this.isMongoAvailable()) {
      const doc = new Case(data);
      return await doc.save();
    }
    this.memory.cases.push(data);
    return data;
  }

  async updateCase(caseId, updates) {
    if (this.isMongoAvailable()) {
      return await Case.findOneAndUpdate({ caseId }, updates, { new: true }).lean();
    }
    const idx = this.memory.cases.findIndex(c => c.caseId === caseId);
    if (idx !== -1) {
      this.memory.cases[idx] = { ...this.memory.cases[idx], ...updates, updatedAt: new Date() };
      return this.memory.cases[idx];
    }
    return null;
  }

  // --- EVIDENCE ---
  async getEvidence(caseId) {
    if (this.isMongoAvailable()) {
      return await Evidence.find(caseId ? { caseId } : {}).lean();
    }
    if (!caseId) return this.memory.evidence;
    return this.memory.evidence.filter(e => e.caseId === caseId);
  }

  async getEvidenceById(evidenceId) {
    if (this.isMongoAvailable()) {
      return await Evidence.findOne({ evidenceId }).lean();
    }
    return this.memory.evidence.find(e => e.evidenceId === evidenceId) || null;
  }

  async addEvidence(data) {
    if (this.isMongoAvailable()) {
      const doc = new Evidence(data);
      return await doc.save();
    }
    this.memory.evidence.unshift(data);
    return data;
  }

  async updateEvidence(evidenceId, updates) {
    if (this.isMongoAvailable()) {
      return await Evidence.findOneAndUpdate({ evidenceId }, updates, { new: true }).lean();
    }
    const idx = this.memory.evidence.findIndex(e => e.evidenceId === evidenceId);
    if (idx !== -1) {
      this.memory.evidence[idx] = { ...this.memory.evidence[idx], ...updates };
      return this.memory.evidence[idx];
    }
    return null;
  }

  // --- ENTITIES ---
  async getEntities(caseId) {
    if (this.isMongoAvailable()) {
      return await Entity.find(caseId ? { caseId } : {}).lean();
    }
    if (!caseId) return this.memory.entities;
    return this.memory.entities.filter(e => e.caseId === caseId);
  }

  async getEntityById(entityId) {
    if (this.isMongoAvailable()) {
      return await Entity.findOne({ entityId }).lean();
    }
    return this.memory.entities.find(e => e.entityId === entityId) || null;
  }

  async addEntity(data) {
    if (this.isMongoAvailable()) {
      const doc = new Entity(data);
      return await doc.save();
    }
    this.memory.entities.push(data);
    return data;
  }

  async updateEntity(entityId, updates) {
    if (this.isMongoAvailable()) {
      return await Entity.findOneAndUpdate({ entityId }, updates, { new: true }).lean();
    }
    const idx = this.memory.entities.findIndex(e => e.entityId === entityId);
    if (idx !== -1) {
      this.memory.entities[idx] = { ...this.memory.entities[idx], ...updates };
      return this.memory.entities[idx];
    }
    return null;
  }

  // --- RELATIONSHIPS ---
  async getRelationships(caseId) {
    if (this.isMongoAvailable()) {
      return await Relationship.find(caseId ? { caseId } : {}).lean();
    }
    if (!caseId) return this.memory.relationships;
    return this.memory.relationships.filter(r => r.caseId === caseId);
  }

  async addRelationship(data) {
    if (this.isMongoAvailable()) {
      const doc = new Relationship(data);
      return await doc.save();
    }
    this.memory.relationships.push(data);
    return data;
  }

  // --- TIMELINE EVENTS ---
  async getTimelineEvents(caseId) {
    if (this.isMongoAvailable()) {
      return await TimelineEvent.find(caseId ? { caseId } : {}).sort({ timestamp: 1 }).lean();
    }
    const list = caseId ? this.memory.timelineEvents.filter(t => t.caseId === caseId) : this.memory.timelineEvents;
    return list.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  async addTimelineEvent(data) {
    if (this.isMongoAvailable()) {
      const doc = new TimelineEvent(data);
      return await doc.save();
    }
    this.memory.timelineEvents.push(data);
    return data;
  }

  // --- INCONSISTENCIES ---
  async getInconsistencies(caseId) {
    if (this.isMongoAvailable()) {
      return await Inconsistency.find(caseId ? { caseId } : {}).lean();
    }
    if (!caseId) return this.memory.inconsistencies;
    return this.memory.inconsistencies.filter(i => i.caseId === caseId);
  }

  async addInconsistency(data) {
    if (this.isMongoAvailable()) {
      const doc = new Inconsistency(data);
      return await doc.save();
    }
    this.memory.inconsistencies.push(data);
    return data;
  }

  async updateInconsistency(inconsistencyId, updates) {
    if (this.isMongoAvailable()) {
      return await Inconsistency.findOneAndUpdate({ inconsistencyId }, updates, { new: true }).lean();
    }
    const idx = this.memory.inconsistencies.findIndex(i => i.inconsistencyId === inconsistencyId);
    if (idx !== -1) {
      this.memory.inconsistencies[idx] = { ...this.memory.inconsistencies[idx], ...updates };
      return this.memory.inconsistencies[idx];
    }
    return null;
  }

  // --- REPORTS ---
  async getReports(caseId) {
    if (this.isMongoAvailable()) {
      return await Report.find(caseId ? { caseId } : {}).sort({ generatedAt: -1 }).lean();
    }
    if (!caseId) return this.memory.reports;
    return this.memory.reports.filter(r => r.caseId === caseId);
  }

  async getReportById(reportId) {
    if (this.isMongoAvailable()) {
      return await Report.findOne({ reportId }).lean();
    }
    return this.memory.reports.find(r => r.reportId === reportId) || null;
  }

  async addReport(data) {
    if (this.isMongoAvailable()) {
      const doc = new Report(data);
      return await doc.save();
    }
    this.memory.reports.unshift(data);
    return data;
  }

  // --- AUDIT LOGS ---
  async getAuditLogs(caseId) {
    if (this.isMongoAvailable()) {
      return await AuditLog.find(caseId ? { caseId } : {}).sort({ timestamp: -1 }).limit(100).lean();
    }
    const list = caseId ? this.memory.auditLogs.filter(a => a.caseId === caseId) : this.memory.auditLogs;
    return list.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async addAuditLog(data) {
    const entry = {
      ...data,
      timestamp: data.timestamp || new Date()
    };
    if (this.isMongoAvailable()) {
      const doc = new AuditLog(entry);
      return await doc.save();
    }
    this.memory.auditLogs.unshift(entry);
    return entry;
  }

  // --- GLOBAL SEARCH ---
  async searchAll(caseId, query) {
    if (!query || query.trim() === '') return { evidence: [], entities: [], timeline: [], inconsistencies: [] };
    const q = query.toLowerCase();

    const allEv = await this.getEvidence(caseId);
    const allEnt = await this.getEntities(caseId);
    const allTl = await this.getTimelineEvents(caseId);
    const allInc = await this.getInconsistencies(caseId);

    return {
      evidence: allEv.filter(e => 
        e.filename.toLowerCase().includes(q) || 
        e.evidenceId.toLowerCase().includes(q) ||
        (e.extractedText && e.extractedText.toLowerCase().includes(q))
      ).slice(0, 10),
      entities: allEnt.filter(e => 
        e.value.toLowerCase().includes(q) || 
        e.type.toLowerCase().includes(q) || 
        e.normalizedValue.toLowerCase().includes(q)
      ).slice(0, 10),
      timeline: allTl.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      ).slice(0, 10),
      inconsistencies: allInc.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q)
      ).slice(0, 10)
    };
  }
}

export const store = new DataStore();
