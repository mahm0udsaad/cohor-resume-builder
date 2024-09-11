Task:

You are given an image of a resume. Your task is to extract the content (text) and create a detailed JSON representation of the resume. The JSON should include not only the text but also the styling information (such as font size, colors, borders, text alignment, background colors, etc.). The JSON will be used to dynamically generate the resume in a resume builder app, so it needs to be as detailed as possible in terms of structure and styling.

Instructions:
Extract Content:

Parse all the text from the resume image, including the name, contact information, summary, work experience, education, skills, and any other sections.
Group the text into the correct sections (e.g., header, contact information, work experience, education, skills).
Define Style Information:

For each section, capture the relevant style information, including:
Font Size: Specify the font size used for each section.
Font Weight: Indicate whether the text is bold, italic, or regular.
Color: Capture the text color for each section. If different colors are used within the same section (e.g., red for headings and black for body text), make sure to specify this.
Borders: Include any border styles (e.g., solid, dashed), border width, and border color around sections, boxes, or text elements.
Background Colors: If sections have a background color (e.g., a colored header or sidebar), capture the color.
Text Alignment: Include text alignment (left, right, center, justified).
Margins & Padding: Specify any space between elements (e.g., margin between sections or padding inside boxes).
Structure of the JSON:

Each section of the resume (e.g., header, contact information, summary, experience, education) should be represented as a separate object in the JSON.
Inside each section, include both:
Content: The actual text content of the section.
Style: A style object that captures all relevant styling properties (font size, color, border, etc.).
Use of Theme (for colors):

If the resume uses a consistent color theme (e.g., red for headers and black for body text), create a theme object at the top of the JSON.
Reference the theme object throughout the resume where applicable to ensure consistency and allow for dynamic color changes in the future.
Handling Layout:

If the resume uses multiple columns (e.g., a left sidebar for contact information and a right column for the main content), ensure that the layout structure is represented in the JSON.
Specify column widths, spacing, and how sections are aligned relative to each other.
Example JSON Output Structure:
json
Copy code
{
  "template": {
    "theme": {
      "primaryColor": "#FF0000",
      "secondaryColor": "#666666",
      "textColor": "#000000"
    },
    "sections": [
      {
        "type": "header",
        "content": {
          "name": "John Doe",
          "position": "Software Engineer"
        },
        "style": {
          "fontSize": "24px",
          "fontWeight": "bold",
          "color": "{theme.primaryColor}",
          "backgroundColor": "#2E3B4E",
          "textAlign": "center",
          "border": {
            "color": "#FF0000",
            "width": "2px",
            "style": "solid"
          },
          "padding": "20px"
        }
      },
      {
        "type": "contact_info",
        "content": {
          "email": "john.doe@example.com",
          "phone": "123-456-7890",
          "address": "123 Main St, Anytown, USA"
        },
        "style": {
          "fontSize": "14px",
          "color": "{theme.secondaryColor}",
          "layout": "vertical",
          "spacing": "10px",
          "border": {
            "color": "#000000",
            "width": "1px",
            "style": "solid"
          }
        }
      },
      {
        "type": "experience",
        "content": [
          {
            "company": "Tech Solutions",
            "position": "Software Engineer",
            "start_date": "July 2020",
            "end_date": "Present",
            "description": "Developing and maintaining web applications using React and Node.js.",
            "style": {
              "companyStyle": {
                "fontSize": "16px",
                "color": "{theme.primaryColor}",
                "fontWeight": "bold"
              },
              "positionStyle": {
                "fontSize": "14px",
                "color": "{theme.textColor}"
              },
              "descriptionStyle": {
                "fontSize": "12px",
                "color": "{theme.secondaryColor}"
              }
            }
          }
        ],
        "style": {
          "sectionTitleStyle": {
            "fontSize": "18px",
            "color": "{theme.primaryColor}",
            "textDecoration": "underline"
          },
          "itemSpacing": "10px"
        }
      },
      {
        "type": "education",
        "content": [
          {
            "degree": "Bachelor of Science in Computer Science",
            "institution": "University of Example",
            "start_date": "2016",
            "end_date": "2020"
          }
        ],
        "style": {
          "fontSize": "14px",
          "color": "{theme.textColor}",
          "marginBottom": "15px"
        }
      }
    ]
  }
}