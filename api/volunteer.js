export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Missing required fields: name, email, phone, message',
      });
    }

    // In production, you would save this to a database or send an email
    console.log('Volunteer application received:', req.body);

    res.status(200).json({
      success: true,
      message: 'Thank you for your interest in volunteering!',
      data: {
        name,
        email,
        phone,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Volunteer error:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
}
