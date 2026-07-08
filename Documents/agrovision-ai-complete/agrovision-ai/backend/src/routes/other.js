const express = require('express');
const supabase = require('../config/supabase');
const { authenticate } = require('../middleware/auth');

// ─── Report Router ─────────────────────────────────────
const reportRouter = express.Router();
reportRouter.get('/disease/:id', authenticate, async (req, res) => {
  const { data } = await supabase.from('disease_predictions').select('*').eq('id', req.params.id).single();
  if (!data) return res.status(404).json({ error: 'Report not found' });
  res.json({ report: data });
});
module.exports.reportRouter = reportRouter;

// ─── Users Router ──────────────────────────────────────
const usersRouter = express.Router();
usersRouter.get('/profile', authenticate, async (req, res) => {
  const { data } = await supabase.from('users').select('id, name, email, phone, state, role, created_at').eq('id', req.user.id).single();
  res.json({ user: data });
});
usersRouter.put('/profile', authenticate, async (req, res) => {
  const { name, phone, state } = req.body;
  const { data, error } = await supabase.from('users').update({ name, phone, state }).eq('id', req.user.id).select('id, name, email, phone, state').single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data });
});
module.exports.usersRouter = usersRouter;

// ─── Marketplace Router ────────────────────────────────
const marketplaceRouter = express.Router();
marketplaceRouter.get('/', async (req, res) => {
  const { category, search, limit = 20, offset = 0 } = req.query;
  let query = supabase.from('marketplace_products').select('*').range(Number(offset), Number(offset) + Number(limit) - 1);
  if (category) query = query.eq('category', category);
  if (search) query = query.ilike('name', `%${search}%`);
  const { data, error } = await query;
  res.json({ products: data || [], error: error?.message });
});
marketplaceRouter.post('/', authenticate, async (req, res) => {
  const { name, price, unit, category, description, stock } = req.body;
  const { data, error } = await supabase.from('marketplace_products').insert({ seller_id: req.user.id, name, price, unit, category, description, stock }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ product: data });
});
module.exports.marketplaceRouter = marketplaceRouter;

// ─── Forum Router ──────────────────────────────────────
const forumRouter = express.Router();
forumRouter.get('/', async (req, res) => {
  const { category, limit = 20 } = req.query;
  let query = supabase.from('forum_posts').select('*, users(name, state)').order('created_at', { ascending: false }).limit(Number(limit));
  if (category) query = query.eq('category', category);
  const { data } = await query;
  res.json({ posts: data || [] });
});
forumRouter.post('/', authenticate, async (req, res) => {
  const { title, content, category, tags } = req.body;
  const { data, error } = await supabase.from('forum_posts').insert({ user_id: req.user.id, title, content, category, tags, likes: 0, views: 0 }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ post: data });
});
forumRouter.post('/:id/like', authenticate, async (req, res) => {
  const { data } = await supabase.from('forum_posts').select('likes').eq('id', req.params.id).single();
  if (!data) return res.status(404).json({ error: 'Post not found' });
  await supabase.from('forum_posts').update({ likes: data.likes + 1 }).eq('id', req.params.id);
  res.json({ likes: data.likes + 1 });
});
module.exports.forumRouter = forumRouter;
