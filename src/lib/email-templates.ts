interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function generateContactEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הודעה חדשה מאתר Crystal View</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6DBFF2 0%, #0D0D0D 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                Crystal View אלומיניום
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">
                הודעה חדשה מטופס יצירת קשר
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Name -->
              <table role="presentation" style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-right: 4px solid #6DBFF2; border-radius: 4px;">
                    <p style="margin: 0 0 5px; color: #6DBFF2; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                      שם מלא
                    </p>
                    <p style="margin: 0; color: #0D0D0D; font-size: 18px; font-weight: 600;">
                      ${data.name}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Phone & Email -->
              <table role="presentation" style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td style="width: 50%; padding-left: 10px;">
                    <div style="padding: 15px; background-color: #f8f9fa; border-right: 4px solid #6DBFF2; border-radius: 4px; height: 100%;">
                      <p style="margin: 0 0 5px; color: #6DBFF2; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        טלפון
                      </p>
                      <p style="margin: 0; color: #0D0D0D; font-size: 16px; font-weight: 600;">
                        <a href="tel:${data.phone}" style="color: #0D0D0D; text-decoration: none;">
                          ${data.phone}
                        </a>
                      </p>
                    </div>
                  </td>
                  <td style="width: 50%; padding-right: 10px;">
                    <div style="padding: 15px; background-color: #f8f9fa; border-right: 4px solid #6DBFF2; border-radius: 4px; height: 100%;">
                      <p style="margin: 0 0 5px; color: #6DBFF2; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        אימייל
                      </p>
                      <p style="margin: 0; color: #0D0D0D; font-size: 16px; font-weight: 600; word-break: break-all;">
                        <a href="mailto:${data.email}" style="color: #0D0D0D; text-decoration: none;">
                          ${data.email}
                        </a>
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              ${data.message ? `
              <table role="presentation" style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px; background-color: #f8f9fa; border-right: 4px solid #6DBFF2; border-radius: 4px;">
                    <p style="margin: 0 0 10px; color: #6DBFF2; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                      הודעה
                    </p>
                    <p style="margin: 0; color: #0D0D0D; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
                      ${data.message}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Quick Action Buttons -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center">
                    <table role="presentation" style="display: inline-block;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="tel:${data.phone}" style="display: inline-block; padding: 12px 30px; background-color: #6DBFF2; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                            📞 התקשר עכשיו
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 30px; background-color: #0D0D0D; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                            ✉️ שלח מייל
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #6c757d; font-size: 14px;">
                הודעה זו נשלחה מטופס יצירת קשר באתר Crystal View
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                © ${new Date().getFullYear()} Crystal View אלומיניום | כל הזכויות שמורות
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateContactEmailText(data: ContactFormData): string {
  return `
הודעה חדשה מטופס יצירת קשר - Crystal View

שם מלא: ${data.name}
טלפון: ${data.phone}
אימייל: ${data.email}

${data.message ? `הודעה:\n${data.message}` : 'לא נשלחה הודעה'}

---
הודעה זו נשלחה מאתר Crystal View
  `.trim();
}

