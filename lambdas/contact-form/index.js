const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// Initialize AWS SES client
const sesClient = new SESClient({ 
  region: process.env.AWS_REGION || "us-east-1" 
});

// Initialize Secrets Manager client
const secretsClient = new SecretsManagerClient({ 
  region: process.env.AWS_REGION || "us-east-1" 
});

// Helper function to get secrets
async function getSecret(secretName) {
  try {
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });
    const data = await secretsClient.send(command);
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error("Error retrieving secret:", error);
    throw error;
  }
}

// CORS headers - allow all origins for development, restrict in production
const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins - configure for production
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  "Access-Control-Allow-Credentials": "false",
  "Content-Type": "application/json"
};

// For production, use specific origins:
// const allowedOrigins = ["https://locsafe.vercel.app", "http://localhost:5173", "http://localhost:3000"];
// const origin = event.headers.origin || event.headers.Origin;
// const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

// Email template for HTML format
const getHtmlTemplate = (data) => {
  const departmentInfo = {
    sales: { email: "support@locsafe.org", team: "Sales Team" },
    support: { email: "support@locsafe.org", team: "Support Team" },
    billing: { email: "support@locsafe.org", team: "Billing Team" },
    general: { email: "support@locsafe.org", team: "General Inquiries" }
  };

  const dept = departmentInfo[data.department] || departmentInfo.general;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #14b8a6; margin-right: 10px; }
          .message-box { background: white; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #14b8a6; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Locsafe™ Contact Request</p>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">From:</span>
              <span>${data.from_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span><a href="mailto:${data.from_email}" style="color: #3b82f6;">${data.from_email}</a></span>
            </div>
            <div class="info-row">
              <span class="label">Department:</span>
              <span>${dept.team}</span>
            </div>
            <div class="info-row">
              <span class="label">Date:</span>
              <span>${new Date().toLocaleString()}</span>
            </div>
            <div class="message-box">
              <h3 style="color: #14b8a6; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
            <div class="footer">
              <p>This email was sent from the Locsafe™ contact form.</p>
              <p style="font-size: 12px;">Please respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Plain text template
const getTextTemplate = (data) => {
  const departmentInfo = {
    sales: { team: "Sales Team" },
    support: { team: "Support Team" },
    billing: { team: "Billing Team" },
    general: { team: "General Inquiries" }
  };

  const dept = departmentInfo[data.department] || departmentInfo.general;

  return `
New Contact Form Submission - Locsafe™

From: ${data.from_name}
Email: ${data.from_email}
Department: ${dept.team}
Date: ${new Date().toLocaleString()}

Message:
${data.message}

---
This email was sent from the Locsafe™ contact form.
Please respond within 24 hours.
  `;
};

// Auto-reply template for the sender
const getAutoReplyTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #14b8a6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Thank You for Contacting Us!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Locsafe™. We've successfully received your message and our team will review it shortly.</p>
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>Our team will review your inquiry within the next 24 hours</li>
              <li>You'll receive a personalized response from one of our specialists</li>
              <li>For urgent matters, please call us at +254 701 746 774</li>
            </ul>
            <p>In the meantime, feel free to explore our resources:</p>
            <div style="text-align: center;">
              <a href="https://locsafe.org" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p><strong>Locsafe™</strong> - Intelligent Asset Tracking & Management</p>
              <p>This is an automated response. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Locsafe. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Main Lambda handler
exports.handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ["from_name", "from_email", "message"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: `Missing required field: ${field}` 
          })
        };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.from_email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: "Invalid email format" 
        })
      };
    }

    // Get email configuration from environment or secrets
    let emailConfig;
    if (process.env.USE_SECRETS_MANAGER === "true") {
      emailConfig = await getSecret(process.env.SECRET_NAME || "locsafe/contact-form");
    } else {
      emailConfig = {
        fromEmail: process.env.FROM_EMAIL || "noreply@locsafe.org",
        toEmail: process.env.TO_EMAIL || "support@locsafe.org",
        replyTo: process.env.REPLY_TO_EMAIL || "support@locsafe.org"
      };
    }

    // Determine recipient based on department
    const departmentEmails = {
      sales: process.env.SALES_EMAIL || "sales@locsafe.org",
      support: process.env.SUPPORT_EMAIL || "support@locsafe.org",
      billing: process.env.BILLING_EMAIL || "billing@locsafe.org",
      general: process.env.GENERAL_EMAIL || emailConfig.toEmail
    };

    const recipientEmail = departmentEmails[body.department] || departmentEmails.general;

    // Prepare email parameters for the main notification
    const emailParams = {
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [recipientEmail],
        CcAddresses: body.cc_emails ? body.cc_emails.split(",").map(e => e.trim()) : []
      },
      Message: {
        Subject: {
          Data: `[Contact Form] New inquiry from ${body.from_name}${body.department ? ` - ${body.department.charAt(0).toUpperCase() + body.department.slice(1)} Department` : ''}`,
          Charset: "UTF-8"
        },
        Body: {
          Html: {
            Data: getHtmlTemplate(body),
            Charset: "UTF-8"
          },
          Text: {
            Data: getTextTemplate(body),
            Charset: "UTF-8"
          }
        }
      },
      ReplyToAddresses: [body.from_email]
    };

    // Send the main notification email
    const sendCommand = new SendEmailCommand(emailParams);
    const result = await sesClient.send(sendCommand);

    // Send auto-reply to the sender if enabled
    let autoReplyStatus = "disabled";
    let autoReplyError = null;
    
    // Log auto-reply configuration for debugging
    console.log("Auto-reply configuration:", {
      enabled: process.env.SEND_AUTO_REPLY,
      fromEmail: emailConfig.fromEmail,
      toEmail: body.from_email,
      replyTo: emailConfig.replyTo
    });

    if (process.env.SEND_AUTO_REPLY === "true" || process.env.SEND_AUTO_REPLY === true) {
      const autoReplyParams = {
        Source: emailConfig.fromEmail,
        Destination: {
          ToAddresses: [body.from_email]
        },
        Message: {
          Subject: {
            Data: "Thank you for contacting Locsafe™",
            Charset: "UTF-8"
          },
          Body: {
            Html: {
              Data: getAutoReplyTemplate(body.from_name),
              Charset: "UTF-8"
            },
            Text: {
              Data: `Dear ${body.from_name},\n\nThank you for contacting Locsafe™. We've received your message and will respond within 24 hours.\n\nBest regards,\nThe Locsafe Team`,
              Charset: "UTF-8"
            }
          }
        },
        ReplyToAddresses: [emailConfig.replyTo || emailConfig.fromEmail]
      };

      try {
        console.log("Attempting to send auto-reply to:", body.from_email);
        const autoReplyCommand = new SendEmailCommand(autoReplyParams);
        const autoReplyResult = await sesClient.send(autoReplyCommand);
        console.log("Auto-reply sent successfully:", {
          messageId: autoReplyResult.MessageId,
          to: body.from_email
        });
        autoReplyStatus = "sent";
      } catch (autoReplyErr) {
        console.error("Auto-reply failed with error:", {
          error: autoReplyErr.name,
          message: autoReplyErr.message,
          code: autoReplyErr.code,
          statusCode: autoReplyErr.$metadata?.httpStatusCode,
          requestId: autoReplyErr.$metadata?.requestId
        });
        autoReplyStatus = "failed";
        autoReplyError = autoReplyErr.message;
        // Don't fail the main request if auto-reply fails
      }
    } else {
      console.log("Auto-reply is disabled. Set SEND_AUTO_REPLY=true to enable.");
    }

    // Log the successful submission (for CloudWatch)
    console.log("Contact form submission successful:", {
      messageId: result.MessageId,
      from: body.from_email,
      department: body.department || "general",
      timestamp: new Date().toISOString(),
      autoReply: {
        status: autoReplyStatus,
        error: autoReplyError
      }
    });

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
        messageId: result.MessageId,
        autoReply: autoReplyStatus // Include auto-reply status in response for debugging
      })
    };

  } catch (error) {
    console.error("Lambda execution error:", error);
    
    // Determine error type and message
    let errorMessage = "Failed to send message. Please try again later.";
    let statusCode = 500;

    if (error.name === "MessageRejected") {
      errorMessage = "Email address not verified. Please check your email address.";
      statusCode = 400;
    } else if (error.name === "MailFromDomainNotVerified") {
      errorMessage = "Sender domain not verified. Please contact support.";
      statusCode = 500;
    } else if (error.name === "ConfigurationSetDoesNotExist") {
      errorMessage = "Email service configuration error. Please contact support.";
      statusCode = 500;
    }

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      })
    };
  }
};