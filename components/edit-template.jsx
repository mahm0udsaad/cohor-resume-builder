import React, { useState } from 'react';
import { Input, Textarea, Button } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const EditableResume = ({ initialData }) => {
  const [resumeData, setResumeData] = useState(initialData);

  const handleChange = (sectionIndex, field, value) => {
    const newData = { ...resumeData };
    newData.template.sections[sectionIndex].content[field] = value;
    setResumeData(newData);
  };

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const newData = { ...resumeData };
    newData.template.sections[sectionIndex].content.items[itemIndex][field] = value;
    setResumeData(newData);
  };

  const handleArrayItemChange = (sectionIndex, itemIndex, value) => {
    const newData = { ...resumeData };
    newData.template.sections[sectionIndex].content.items[itemIndex] = value;
    setResumeData(newData);
  };

  const addArrayItem = (sectionIndex) => {
    const newData = { ...resumeData };
    newData.template.sections[sectionIndex].content.items.push('');
    setResumeData(newData);
  };

  const renderSection = (section, sectionIndex) => {
    switch (section.type) {
      case 'header':
        return (
          <div key={sectionIndex} style={section.style.nameStyle}>
            <Input
              value={section.content.name}
              onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
              style={{ textAlign: 'center', fontWeight: 'bold' }}
            />
            <div style={section.style.contactStyle}>
              <Input
                value={section.content.contact.email}
                onChange={(e) => handleChange(sectionIndex, 'email', e.target.value)}
                style={{ textAlign: 'center' }}
              />
              <Input
                value={section.content.contact.phone}
                onChange={(e) => handleChange(sectionIndex, 'phone', e.target.value)}
                style={{ textAlign: 'center' }}
              />
            </div>
          </div>
        );
      case 'summary':
      case 'experience':
      case 'skills':
      case 'education':
      case 'additional_info':
      case 'certifications':
        return (
          <Card key={sectionIndex}>
            <CardContent>
              <h2 style={section.style.titleStyle}>{section.content.title}</h2>
              {Array.isArray(section.content.items) ? (
                <>
                  {section.content.items.map((item, itemIndex) => (
                    <div key={itemIndex} style={section.style.itemStyle}>
                      {typeof item === 'string' ? (
                        <Input
                          value={item}
                          onChange={(e) => handleArrayItemChange(sectionIndex, itemIndex, e.target.value)}
                        />
                      ) : (
                        Object.keys(item).map((field) => (
                          <Input
                            key={field}
                            value={item[field]}
                            onChange={(e) => handleItemChange(sectionIndex, itemIndex, field, e.target.value)}
                          />
                        ))
                      )}
                    </div>
                  ))}
                  <Button onClick={() => addArrayItem(sectionIndex)}>Add Item</Button>
                </>
              ) : (
                <Textarea
                  value={section.content.text}
                  onChange={(e) => handleChange(sectionIndex, 'text', e.target.value)}
                  style={section.style.textStyle}
                />
              )}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      {resumeData.template.sections.map((section, index) => renderSection(section, index))}
    </div>
  );
};

export default EditableResume;