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

#############################
Create a modern, user-friendly Resume Builder web application with the following specifications:

1. Design and Layout:

- Primary color: #000000 (black)
- Secondary color: #FFFFFF (white)
- Accent color: #0070F3 (blue)
- Background color: #FAFAFA (light gray)

1. Implement a responsive layout that works well on both desktop and mobile devices
1. Use a sans-serif font family for better readability (e.g., Inter, Roboto, or Open Sans)

1. Navigation and Structure:

1. Create a top navigation bar with the app logo and a "Sign In" button
1. Implement a multi-step form using tabs or a stepper component
1. Divide the resume creation process into sections: Personal Info, Experience, Education, Skills, and Review

1. Functionality:
   a. Personal Information:

1. Fields for full name, email, phone number, and professional summary
1. Add an AI-powered suggestion button for the professional summary

b. Work Experience:

1. Allow users to add multiple work experiences
2. Include fields for job title, company name, start date, end date, and responsibilities
3. Implement an AI-powered suggestion feature for job responsibilities

c. Education:

1. Enable users to add multiple educational qualifications
2. Include fields for degree, institution name, and graduation date

d. Skills:

1. Allow users to add multiple skills with proficiency levels
2. Implement a searchable dropdown for common skills
3. Use a star rating or slider for skill proficiency

e. Additional Sections:

1. Provide options to add Languages, Certifications, and Custom Sections
2. Allow users to toggle the visibility of these sections

f. Review and Customization:

1. Offer a live preview of the resume as users input information
2. Provide multiple resume templates or themes to choose from
3. Allow users to customize colors and fonts

g. Export and Share:

1. Implement a feature to export the resume as a PDF
2. Add options to share the resume via link or email

3. User Experience Enhancements:

4. Implement form validation to ensure all required fields are filled
5. Add tooltips and helper text to guide users through the resume creation process
6. Use smooth transitions and animations for a polished feel
7. Implement auto-save functionality to prevent data loss

8. Additional Features:

9. Integrate an AI-powered resume analyzer that provides suggestions for improvement
10. Implement a feature to import data from LinkedIn or upload an existing resume
11. Add a section for users to see industry-specific resume tips

12. Technical Requirements:

13. Build the frontend using React with TypeScript
14. Accessibility and Performance:

Remember to create a visually appealing and intuitive user interface that guides users through the resume creation process seamlessly. The color scheme should be consistently applied throughout the application, with the accent color (#0070F3) used for primary actions and important elements to draw user attention.

1 - create a render engine that transform the resume json schema
to react components
