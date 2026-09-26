import { store } from '../services/store.js';

export async function login(req, res, next) {
  try {
    const { email, password, demoMode } = req.body;

    const user = {
      id: 'USR-001',
      name: 'Agent Alex Vance',
      email: email || 'analyst@fraudtrace.ai',
      role: 'Lead Digital Evidence Analyst',
      badgeNumber: 'FT-9942',
      isDemo: Boolean(demoMode),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    // Log audit event
    await store.addAuditLog({
      caseId: 'CASE-2026-001',
      actor: user.name,
      action: 'LOGIN',
      target: 'AUTHENTICATION_GATEWAY',
      details: demoMode ? 'Authenticated via Demo Mode' : `Authenticated via Email (${user.email})`
    });

    return res.json({
      success: true,
      token: 'jwt-token-demo-session-valid-2026',
      user
    });
  } catch (err) {
    next(err);
  }
}
