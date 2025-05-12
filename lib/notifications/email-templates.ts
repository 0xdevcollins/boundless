import type { NotificationType } from "../notifications";

interface EmailTemplateProps {
	title: string;
	description: string;
	type?: NotificationType;
	actionUrl?: string;
	actionText?: string;
	additionalContent?: string;
}

// Using the project's color scheme from globals.css
const COLORS = {
	// Primary colors from the project
	primary: "hsl(187, 47%, 19%)", // --primary
	primaryLight: "hsl(187, 47%, 25%)",
	primaryDark: "hsl(187, 47%, 15%)",

	// Secondary colors
	secondary: "hsl(96, 96%, 89%)", // --secondary
	secondaryLight: "hsl(96, 96%, 95%)",
	secondaryDark: "hsl(96, 96%, 85%)",

	// Status colors
	success: "hsl(173, 58%, 39%)", // --chart-2
	warning: "hsl(43, 74%, 66%)", // --chart-4
	error: "hsl(12, 76%, 61%)", // --chart-1

	// Neutral colors
	text: "hsl(0, 0%, 3.9%)", // --foreground
	textLight: "hsl(0, 0%, 45.1%)", // --muted-foreground
	border: "hsl(0, 0%, 89.8%)", // --border
	background: "hsl(0, 0%, 100%)", // --background
	backgroundAlt: "hsl(0, 0%, 96.1%)", // --accent
};

const getTypeColor = (type: NotificationType = "INFO") => {
	switch (type) {
		case "SUCCESS":
			return COLORS.success;
		case "WARNING":
			return COLORS.warning;
		case "ERROR":
			return COLORS.error;
		default:
			return COLORS.primary;
	}
};

export function generateEmailTemplate({
	title,
	description,
	type = "INFO",
	actionUrl,
	actionText,
	additionalContent,
}: EmailTemplateProps): string {
	const typeColor = getTypeColor(type);

	return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          /* Reset styles */
          body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
          }
          
          /* Base styles */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background-color: ${COLORS.backgroundAlt};
            color: ${COLORS.text};
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Layout */
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .email-wrapper {
            background-color: ${COLORS.background};
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          
          /* Header */
          .header {
            background-color: ${typeColor};
            padding: 32px 24px;
            text-align: center;
            position: relative;
          }
          
          .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, ${typeColor}, ${COLORS.primaryLight});
          }
          
          .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          
          /* Content */
          .content {
            padding: 40px 32px;
            color: ${COLORS.text};
          }
          
          .description {
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 32px;
          }
          
          .description p {
            margin-bottom: 16px;
          }
          
          .description p:last-child {
            margin-bottom: 0;
          }
          
          /* Action Button */
          .action-button {
            display: inline-block;
            background-color: ${typeColor};
            color: white;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 15px;
            margin: 24px 0;
            transition: background-color 0.2s ease;
          }
          
          .action-button:hover {
            background-color: ${typeColor === COLORS.primary ? COLORS.primaryLight : typeColor};
          }
          
          /* Additional Content */
          .additional-content {
            margin-top: 32px;
            padding-top: 32px;
            border-top: 1px solid ${COLORS.border};
            color: ${COLORS.textLight};
            font-size: 14px;
            line-height: 1.6;
          }
          
          /* Footer */
          .footer {
            text-align: center;
            padding: 32px 24px;
            background-color: ${COLORS.backgroundAlt};
            color: ${COLORS.textLight};
            font-size: 14px;
            line-height: 1.6;
          }
          
          .logo {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
          }
          
          .footer p {
            margin-bottom: 8px;
          }
          
          .footer p:last-child {
            margin-bottom: 0;
          }
          
          /* Lists */
          ul {
            list-style-type: none;
            padding: 0;
            margin: 16px 0;
          }
          
          li {
            padding: 8px 0;
            border-bottom: 1px solid ${COLORS.border};
          }
          
          li:last-child {
            border-bottom: none;
          }
          
          /* Responsive Design */
          @media only screen and (max-width: 600px) {
            .container {
              padding: 12px;
            }
            
            .content {
              padding: 32px 24px;
            }
            
            .header {
              padding: 24px 16px;
            }
            
            .header h1 {
              font-size: 20px;
            }
            
            .action-button {
              display: block;
              text-align: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-wrapper">
            <div class="header">
              <h1>${title}</h1>
            </div>
            <div class="content">
              <div class="description">
                ${description}
              </div>
              ${
								actionUrl && actionText
									? `
                <div style="text-align: center;">
                  <a href="${actionUrl}" class="action-button">
                    ${actionText}
                  </a>
                </div>
              `
									: ""
							}
              ${
								additionalContent
									? `
                <div class="additional-content">
                  ${additionalContent}
                </div>
              `
									: ""
							}
            </div>
            <div class="footer">
              <img src="https://i.imgur.com/3QVJrdu.png" alt="Boundless" class="logo">
              <p>© ${new Date().getFullYear()} Boundless. All rights reserved.</p>
              <p>This is an automated message, please do not reply directly to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Helper function to generate project-related email templates
export function generateProjectEmailTemplate({
	title,
	description,
	type = "INFO",
	projectId,
	projectTitle,
	actionText = "View Project",
	additionalContent,
}: EmailTemplateProps & {
	projectId: string;
	projectTitle: string;
}): string {
	const actionUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${projectId}`;

	return generateEmailTemplate({
		title,
		description,
		type,
		actionUrl,
		actionText,
		additionalContent: `
      ${additionalContent || ""}
      <div style="margin-top: 24px; padding: 16px; background-color: ${COLORS.backgroundAlt}; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
          Project: <strong style="color: ${COLORS.text};">${projectTitle}</strong>
        </p>
      </div>
    `,
	});
}

// Helper function to generate milestone-related email templates
export function generateMilestoneEmailTemplate({
	title,
	description,
	type = "INFO",
	projectId,
	projectTitle,
	milestoneTitle,
	actionText = "View Milestone",
	additionalContent,
}: EmailTemplateProps & {
	projectId: string;
	projectTitle: string;
	milestoneTitle: string;
}): string {
	const actionUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${projectId}`;

	return generateEmailTemplate({
		title,
		description,
		type,
		actionUrl,
		actionText,
		additionalContent: `
      ${additionalContent || ""}
      <div style="margin-top: 24px; padding: 16px; background-color: ${COLORS.backgroundAlt}; border-radius: 8px;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: ${COLORS.textLight};">
          Project: <strong style="color: ${COLORS.text};">${projectTitle}</strong>
        </p>
        <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
          Milestone: <strong style="color: ${COLORS.text};">${milestoneTitle}</strong>
        </p>
      </div>
    `,
	});
}
