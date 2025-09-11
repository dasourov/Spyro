// ES Module syntax
import { config } from 'dotenv';
import postmark from 'postmark';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testEmail() {
  // Check if API key is available
  if (!process.env.POSTMARK_API_KEY) {
    console.error('POSTMARK_API_KEY is not set in your environment variables');
    return;
  }

  if (!process.env.POSTMARK_FROM_EMAIL) {
    console.error('POSTMARK_FROM_EMAIL is not set in your environment variables');
    return;
  }

  console.log('Testing Postmark email sending...');
  console.log(`From: ${process.env.POSTMARK_FROM_EMAIL}`);
  console.log(`To: ${process.env.POSTMARK_FROM_EMAIL}`); // Send to yourself for testing

  try {
    // Create a new client with your API key
    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
    
    // Send the email
    const response = await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL,
      To: process.env.POSTMARK_FROM_EMAIL, // Send to yourself for testing
      Subject: 'Test Email from SPYRÓ',
      HtmlBody: `
        <h1>Test Email</h1>
        <p>This is a test email from SPYRÓ.</p>
        <p>If you receive this email, your Postmark integration is working correctly!</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
      MessageStream: 'outbound'
    });
    
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${response.MessageID}`);
    console.log(`Submitted at: ${response.SubmittedAt}`);
    console.log(`To: ${response.To}`);
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error);
  }
}

// Run the test
testEmail().catch(console.error);