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
    const { amount, firstName, lastName, phone, email, country, state, address, city, postcode } = req.body;

    // Basic validation
    if (!amount || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Missing required fields: amount, firstName, lastName, email, phone',
      });
    }

    // In production, you would save this to a database or send an email
    console.log('Donation received:', req.body);

    res.status(200).json({
      success: true,
      message: 'Thank you for your donation!',
      data: {
        amount,
        donor: `${firstName} ${lastName}`,
        email,
        phone,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
}
