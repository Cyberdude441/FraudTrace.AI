import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Lock, Mail, ArrowRight, Sparkles, 
  CheckCircle2, ShieldCheck, Database, KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginDemo } = useAuth();

  const [email, setEmail] = useState('analyst@fraudtrace.ai');
  const [password, setPassword] = useState('demo-password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    setLoading(false);
    if (res?.success) {
      navigate('/dashboard');
    } else {
      setError(res?.message || 'Invalid credentials.');
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await loginDemo();
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md rounded-2xl bg-dark-surface/90 border border-cyan-500/30 shadow-2xl p-8 glass-panel-elevated z-10"
      >
        {/* Brand Banner */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3.5 rounded-2xl bg-cyber-cyan/15 border border-cyan-400/40 text-cyber-cyan shadow-glow-cyan mb-3">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white font-mono tracking-wider">
            FraudTrace<span className="text-cyber-cyan">.AI</span>
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mt-1">
            Evidence Reconstruction & Incident Intelligence
          </p>
          <p className="text-xs text-dark-muted mt-2 max-w-xs">
            From scattered digital evidence to a traceable incident story.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-dark-muted uppercase block mb-1.5">
              Analyst Work ID / Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@fraudtrace.ai"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-dark-card border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-dark-muted uppercase block mb-1.5">
              Security Access Passcode
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-dark-card border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-dark-surface text-[11px] font-mono text-dark-muted uppercase">
            OR INSTANT ACCESS
          </span>
        </div>

        {/* Demo Mode Button */}
        <button
          onClick={handleDemoSignIn}
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/40 text-cyber-cyan font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-glow-cyan"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Launch Demo Mode (Instant Evaluation)</span>
        </button>

        {/* Disclaimer Notice */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] text-dark-muted font-mono leading-tight">
            Prototype system using synthetic evidence data. Strictly reconstructive, non-adjudicative forensic assistance.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
