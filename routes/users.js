const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/auth')

const router = express.Router();


// Get all registered users
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, is_admin, has_access, joined_at FROM users ORDER BY joined_at DESC'
    );
    
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// Revoke a user's access
router.patch('/:userId/revoke', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      'UPDATE users SET has_access = false WHERE id = $1 RETURNING id, name, email, has_access',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: 'Access revoked successfully',
      user: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error revoking access:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Restore a user's access
router.patch('/:userId/restore', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      'UPDATE users SET has_access = true WHERE id = $1 RETURNING id, name, email, has_access',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: 'Access restored successfully',
      user: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error restoring access:', error);
    res.status(500).json({ error: 'Server error' });
  }
});