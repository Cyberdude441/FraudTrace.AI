/**
 * FraudTrace AI - ML Controller
 */

import { checkMLServiceHealth, analyzeEventCluster } from '../services/mlService.js';

export async function getMLHealth(req, res, next) {
  try {
    const health = await checkMLServiceHealth();
    res.json(health);
  } catch (err) {
    next(err);
  }
}

export async function postAnalyzeEvent(req, res, next) {
  try {
    const { evidence_items, incident_id, options } = req.body;
    
    if (!evidence_items || !Array.isArray(evidence_items) || evidence_items.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'evidence_items array is required and must contain at least 1 item'
      });
    }

    const result = await analyzeEventCluster(evidence_items, {
      incidentId: incident_id,
      ...options
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
