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
    const { name, email, phone, message, type } = req.body;

    // Validate based on type
    if (type === 'contact') {
      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Missing required fields for contact: name, email, phone, message',
        });
      }
      console.log('Contact message received:', req.body);
    } else if (type === 'newsletter') {
      if (!name || !email) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Missing required fields for newsletter: name, email',
        });
      }
      console.log('Newsletter subscription received:', req.body);
    } else {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Type must be "contact" or "newsletter"',
      });
    }

    // In production, you would save this to a database or send an email
    res.status(200).json({
      success: true,
      message: type === 'newsletter' 
        ? 'Thank you for subscribing to our newsletter!' 
        : 'Thank you for contacting us!',
      data: {
        name,
        email,
        type,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
}
