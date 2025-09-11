import postmark from 'postmark';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, orderDetails } = req.body;
    
    if (!email || !orderDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.POSTMARK_API_KEY) {
      return res.status(500).json({ 
        error: 'Postmark API key not configured',
        message: 'Please check your environment variables'
      });
    }

    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
    const fromEmail = process.env.POSTMARK_FROM_EMAIL || 'noreply@spyro.com';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SPYRÓ Order Confirmation</title>
 <style>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f5f5f5;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .header {
    background-color: #136356;
    color: white;
    padding: 40px 20px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-top: 20px;
  }
  .logo {
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;   /* Added extra spacing */
    font-weight: bold;
    font-size: 32px;
    color: #136356;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .content {
    padding: 30px;
  }
  .thank-you {
    font-size: 18px;
    margin-bottom: 30px;
    color: #333;
  }
  .order-details {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
  }
  .order-details h2 {
    margin-top: 0;
    color: #136356;
    font-size: 20px;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  .order-item {
    display: flex;
    justify-content: space-between;  /* Item left, price right */
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .order-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .item-details {
    flex: 1;
    overflow: hidden;
  }
  .item-name {
    font-weight: 500;
    color: #333;
    font-size: 16px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-quantity {
    color: #666;
    font-size: 14px;
  }
  .item-price-container {
    text-align: right;
    min-width: 80px;
  }
  .item-price {
    font-weight: 600;
    color: #136356;
    font-size: 16px;
    white-space: nowrap;
  }
  .order-total {
    display: flex;
    justify-content: space-between;  /* Total aligned same way */
    margin-top: 30px;
    padding-top: 20px;
    border-top: 2px solid #136356;
    font-size: 20px;
    font-weight: 700;
  }
  .total-label {
    color: #333;
  }
  .total-price {
    color: #136356;
    font-weight: 700;
    font-size: 20px;
    text-align: right;
    white-space: nowrap;
  }
  .footer {
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
    color: #777;
    font-size: 14px;
  }
</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SPYRÓ</div>
            <h1>Order Confirmation</h1>
          </div>
          
          <div class="content">
            <p class="thank-you">Thank you for your order! Here are the details:</p>
            
            <div class="order-details">
              <h2>Order Summary</h2>
              
              ${orderDetails.items.map(item => `
                <div class="order-item">
                  <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">${item.quantity} × $${item.price.toFixed(2)}</div>
                  </div>
                  <div class="item-price-container">
                    <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              `).join('')}
              
              <div class="order-total">
                <span class="total-label">Total Amount</span>
                <span class="total-price">$${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
            
            <p>Thank you for choosing SPYRÓ! Your order is being prepared and will be ready soon.</p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>© ${new Date().getFullYear()} SPYRÓ. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    try {
      const response = await client.sendEmail({
        From: fromEmail,
        To: email,
        Subject: 'SPYRÓ Order Confirmation',
        HtmlBody: htmlContent,
        MessageStream: 'outbound'
      });
      
      console.log('Email sent successfully:', response.MessageID);
      
      res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully via Postmark',
        messageId: response.MessageID 
      });
    } catch (error) {
      if (error.code === 412 && error.message.includes('pending approval')) {
        console.log('Account pending approval. Logging email details instead.');
        console.log('Email would be sent to:', email);
        console.log('Email content:', htmlContent);
        
        res.status(200).json({ 
          success: true, 
          message: 'Email details logged (account pending approval)',
          logged: true
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error sending email via Postmark:', error);
    
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}
